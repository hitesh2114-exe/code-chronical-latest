const Repository = require("../model/repoModel");
const Commit = require("../model/commitModel");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const path = require("path");
const {
  uploadDirectoryToSupabase,
} = require("../utils/uploadDirectoryToSupabase");
const {
  downloadDirectoryFromSupabase,
} = require("../utils/downloadDirectoryFromSupabase");
const { zipDirectory } = require("../utils/zipDirectory");
const { supabase } = require("../config/supabase");

class RepositoryService {
  //create repo
  async createRepository(userId, repositoryData) {
    //check if repo already exists
    const existingRepository = await Repository.findOne({
      owner: userId,
      name: repositoryData.name,
    });

    if (existingRepository) {
      throw new Error("Repository with this name already exists.");
    }

    const repository = new Repository({
      ...repositoryData,
      owner: userId,
    });

    repository.storagePath = `repos/${userId}/${repository._id}`;
    await repository.save();
    return repository;
  }

  //push repo
  async pushRepo({ repositoryId, userId, extractDir, uploadDir }) {
    try {
      const commitPath = path.join(extractDir, "commit.json");
      if (!fs.existsSync(commitPath)) {
        throw new Error("commit.json not found.");
      }

      const commitData = JSON.parse(fs.readFileSync(commitPath, "utf8"));
      const repository = await Repository.findById(repositoryId); //found repository

      if (!repository) {
        throw new Error("Repository not found.");
      }

      // Permission check
      const isOwner = repository.owner.toString() === userId.toString();

      const isCollaborator = repository.collaborators.some(
        (collaborator) => collaborator.toString() === userId.toString()
      );

      if (!isOwner && !isCollaborator) {
        throw new Error(
          "You don't have permission to push to this repository."
        );
      }

      await uploadDirectoryToSupabase(
        extractDir,
        "codechronicle",
        `repos/${repository.owner}/${repositoryId}/commits/${commitData.id}`
      );

      const commit = await Commit.create({
        //create commit document
        commitId: commitData.id,
        message: commitData.message,
        repository: repository._id,
        author: userId,
        storagePath: `repos/${repository.owner}/${repositoryId}/commits/${commitData.id}`,
        parentCommit: repository.latestCommit || null,
        committedAt: new Date(commitData.date),
        branch: commitData.branch || "main",
      });

      repository.latestCommit = commit._id; //update the last commit id in repo document
      await repository.save();

      fs.rmSync(extractDir, {
        recursive: true, //remove files from extract folder
        force: true,
      });

      const files = fs.readdirSync(uploadDir);

      for (const file of files) {
        //remove files from uploads folder
        const filePath = path.join(uploadDir, file);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      }

      return {
        repository,
        commitData,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async pullRepo({ repositoryId, userId }) {
    try {
      console.log("reached service");
      const repository = await Repository.findById(repositoryId); //found repository document

      if (!repository) {
        throw new ApiError(404, "Repository not found.");
      }

      const isOwner = repository.owner.toString() === userId.toString(); //persmission currently only owner of collaborator can send pull request
      const isCollaborator = repository.collaborators.some(
        (collaborator) => collaborator.toString() === userId.toString()
      );
      if (!isOwner && !isCollaborator) {
        throw new Error(
          "You don't have permission to pull to this repository."
        );
      }

      const remotePath = `repos/${userId}/${repositoryId}/commits`;

      //downloading the files from supabse to current downloads folder
      const timestamp = Date.now();
      const downloadDir = path.join(
        __dirname,
        "../temp/downloads",
        `${timestamp}`
      );

      fs.mkdirSync(downloadDir, {
        recursive: true,
      });

      await downloadDirectoryFromSupabase(
        "codechronicle",
        remotePath,
        downloadDir
      );

      //create zip file
      const sourceDir = downloadDir;
      const zipPath = path.join(
        __dirname,
        "../temp/zipped",
        `${timestamp}.zip`
      );
      await zipDirectory(sourceDir, zipPath);
      return { zipPath, downloadDir };
    } catch (error) {
      console.log(error);
    }
  }

  //functions for the frontend
  async currentUserRepos(userId) {
    try {
      console.log(userId);
      const response = await Repository.find({
        owner: userId,
      })
        .populate("owner")
        .populate("latestCommit");
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getRepoDetail(repoId) {
    try {
      const response = await Repository.findById(repoId)
        .populate("owner")
        .populate("latestCommit");
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getRepoFiles(repoId, path) {
    try {
      const repository = await Repository.findById(repoId).populate(
        "latestCommit"
      );
      const pathToFind = path
        ? `${repository.latestCommit.storagePath}/${path}`
        : repository.latestCommit.storagePath;
      // console.log(pathToFind);
      const { data, error } = await supabase.storage
        .from("codechronicle")
        .list(pathToFind);

      if (error) {
        throw error;
      }

      const files = data.map((item) => ({
        name: item.name,
        type: item.id ? "file" : "folder",
        path: path ? `${path}/${item.name}` : item.name,
      }));

      return files;
    } catch (err) {
      console.log(err);
    }
  }

  async readFile(repoId, path) {
    try {
      const repository = await Repository.findById(repoId).populate(
        "latestCommit"
      );

      if (!repository) {
        throw new Error("Repository not found");
      }

      const filePath = `${repository.latestCommit.storagePath}/${path}`;

      const { data, error } = await supabase.storage
        .from("codechronicle")
        .download(filePath);

      if (error) {
        throw error;
      }

      const content = await data.text();

      return content;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new RepositoryService();
