const Repository = require("../model/repoModel");
const Commit = require("../model/commitModel");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const {
  uploadDirectoryToSupabase,
} = require("../utils/uploadDirectoryToSupabase");
const {
  downloadDirectoryFromSupabase,
} = require("../utils/downloadDirectoryFromSupabase");
const { zipDirectory } = require("../utils/zipDirectory");
const { supabase } = require("../config/supabase");
const { randomUUID } = require("crypto");
const { writeFile } = require("../utils/writeFile");
const { createCommitJson } = require("../utils/createCommit");
const { error } = require("console");
const {
  deleteDirectoryInSupabase,
} = require("../utils/deleteDirectoryInSupabase");

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

      // Repository has no commits yet
      if (!repository.latestCommit) {
        return [];
      }

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

  async createRepoFromWeb(content, userId) {
    try {
      //check if repo already exists
      const existingRepository = await Repository.findOne({
        owner: userId,
        name: content.name,
      });

      if (existingRepository) {
        throw new Error("Repository with this name already exists.");
      }

      const repository = new Repository({
        ...content,
        owner: userId,
      });

      repository.storagePath = `repos/${userId}/${repository._id}`;
      await repository.save();
      return repository;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //uploading folder to the repository
  async uploadFolder(req) {
    let uploadPath;
    try {
      const { repoId } = req.params;
      const repository = await Repository.findById(repoId); //get repository

      const parentCommit = repository.latestCommit; //previous commit
      console.log("parent commit : ", parentCommit);

      const uploadId = randomUUID();
      uploadPath = path.join(__dirname, "../temp/uploads", uploadId); //creating folder inside uploads

      await fs.promises.mkdir(uploadPath, {
        recursive: true,
      });

      //download the parent commit folder if present
      if (parentCommit) {
        console.log("parent commit exists");
        const comm = await Commit.findById(parentCommit);
        const remotePath = `repos/${req.user._id}/${repoId}/commits/${comm.commitId}`;
        await downloadDirectoryFromSupabase(
          "codechronicle",
          remotePath,
          uploadPath
        );
        await fsp.rm(path.join(uploadPath, "commit.json"), {
          force: true,
        });
      }

      const paths = Array.isArray(req.body.paths)
        ? req.body.paths
        : [req.body.paths];
      const currentPath = req.body.currentPath || "";
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const relativePath = paths[i];
        const destination = path.join(uploadPath, currentPath, relativePath);

        console.log({
          paths: req.body.paths,
          pathsType: typeof req.body.paths,
          isArray: Array.isArray(req.body.paths),
          relativePath,
          destination,
        });

        // Create all parent folders if they don't exist
        await fsp.mkdir(path.dirname(destination), {
          recursive: true,
        });

        // Write file to disk
        await fs.promises.writeFile(destination, file.buffer);

        // console.log(`${destination} uploaded`);
      }

      // creates commit.json in commits folder
      await createCommitJson(
        uploadPath,
        uploadId,
        req.body.message,
        parentCommit
      );

      //uploading to supabase
      const userId = req.user._id.toString();
      const destinationPath = `repos/${userId}/${repoId}/commits/${uploadId}`;
      const localPath = path.join(__dirname, `../temp/uploads/${uploadId}`);

      await uploadDirectoryToSupabase(
        uploadPath,
        "codechronicle",
        destinationPath
      );

      //creating commit
      const commitPath = path.join(uploadPath, "commit.json");
      const data = await fsp.readFile(commitPath, "utf-8");
      const commitData = JSON.parse(data);

      const commit = await Commit.create({
        commitId: uploadId,
        message: req.body.message,
        repository: repoId,
        author: userId,
        storagePath: `repos/${userId}/${repoId}/commits/${uploadId}`,
        parentCommit: repository.latestCommit?._id || null,
        committedAt: new Date(commitData.date),
        branch: "main",
      });

      //update the latest commit inside repository
      await Repository.findByIdAndUpdate(repoId, {
        $set: { latestCommit: commit._id },
      });

      return {
        success: true,
        commitId: uploadId,
      };
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    } finally {
      //at last delete the temporary folder
      if (uploadPath) {
        try {
          await fsp.rm(uploadPath, {
            recursive: true,
            force: true,
          });

          console.log("Temporary folder deleted.");
        } catch (cleanupError) {
          console.error("Cleanup failed:", cleanupError);
        }
      }
    }
  }

  async uplaodFiles(req) {
    let uploadPath;
    try {
      const { repoId } = req.params;
      const repository = await Repository.findById(repoId); //get repository

      const parentCommit = repository.latestCommit; //previous commit
      // console.log(parentCommit);

      const uploadId = randomUUID();
      uploadPath = path.join(__dirname, "../temp/uploads", uploadId); //creating folder inside uploads

      await fs.promises.mkdir(uploadPath, {
        recursive: true,
      });

      //writing down the files
      const currentPath = req.body.currentPath || "";
      for (const file of req.files) {
        const destination = path.join(
          uploadPath,
          currentPath,
          file.originalname
        );

        await fsp.mkdir(path.dirname(destination), {
          recursive: true,
        });

        await fsp.writeFile(destination, file.buffer);
      }

      //download the parent commit folder if present
      if (parentCommit) {
        const comm = await Commit.findById(parentCommit);
        const remotePath = `repos/${req.user._id}/${repoId}/commits/${comm.commitId}`;
        await downloadDirectoryFromSupabase(
          "codechronicle",
          remotePath,
          uploadPath
        );
        await fsp.rm(path.join(uploadPath, "commit.json"), {
          force: true,
        });
      }

      //creates commit.json in commits folder
      await createCommitJson(
        uploadPath,
        uploadId,
        req.body.message,
        parentCommit
      );

      //uploading to supabase
      const userId = req.user._id.toString();
      const destinationPath = `repos/${userId}/${repoId}/commits/${uploadId}`;
      const localPath = path.join(__dirname, `../temp/uploads/${uploadId}`);
      await uploadDirectoryToSupabase(
        uploadPath,
        "codechronicle",
        destinationPath
      );

      //creating commit
      const commitPath = path.join(uploadPath, "commit.json");
      const data = await fsp.readFile(commitPath, "utf-8");
      const commitData = JSON.parse(data);

      //create commit document
      const commit = await Commit.create({
        commitId: uploadId,
        message: req.body.message,
        repository: repoId,
        author: userId,
        storagePath: `repos/${userId}/${repoId}/commits/${uploadId}`,
        parentCommit: repository.latestCommit?._id || null,
        committedAt: new Date(commitData.date),
        branch: "main",
      });

      //update the latest commit inside repository
      await Repository.findByIdAndUpdate(repoId, {
        $set: { latestCommit: commit._id },
      });

      return {
        success: true,
        commitId: uploadId,
      };
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    } finally {
      //at last delete the temporary folder
      if (uploadPath) {
        try {
          await fsp.rm(uploadPath, {
            recursive: true,
            force: true,
          });

          console.log("Temporary folder deleted.");
        } catch (cleanupError) {
          console.error("Cleanup failed:", cleanupError);
        }
      }
    }
  }

  async deleteRepository(repoId, userId) {
    const repository = await Repository.findById(repoId);

    //check repository exists
    if (!repository) {
      throw new Error("repository doesn't exists");
    }

    //check for the owner
    if (userId !== repository.owner._id.toString()) {
      throw new Error("you don't have permission to delete this repository");
    }

    const repositoryPath = `repos/${userId}/${repoId}`;
    await deleteDirectoryInSupabase("codechronicle", repositoryPath); //calling the helper function

    await Commit.deleteMany({ repository: repoId }); //delete all related commits
    await Repository.findByIdAndDelete(repoId); //delete the repository
    try {
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteFileOrFolder(filePath, repoId, userId) {
    let localPath;
    try {
      const repository = await Repository.findById(repoId);
      const commit = await Commit.findById(repository.latestCommit);
      const uploadId = randomUUID();

      //download latest snapshot
      const remotePath = `repos/${userId}/${repoId}/commits/${commit.commitId}`;
      localPath = path.join(__dirname, `../temp/uploads`, uploadId);
      await downloadDirectoryFromSupabase(
        "codechronicle",
        remotePath,
        localPath
      );
      await fsp.rm(path.join(localPath, "commit.json"), {
        force: true,
      });

      //delete the filePath
      const targetPath = path.resolve(localPath, filePath);
      const rootPath = path.resolve(localPath);

      if (
        targetPath === rootPath ||
        !targetPath.startsWith(rootPath + path.sep)
      ) {
        throw new Error("Invalid file path");
      }

      const exists = await fsp
        .access(targetPath)
        .then(() => true)
        .catch(() => false);

      if (!exists) {
        throw new Error("File or folder not found");
      }

      await fsp.rm(targetPath, {
        recursive: true,
        force: true,
      });

      //creating new commit.json
      const commitMessage = `Deleted: ${filePath}`;
      await createCommitJson(localPath, uploadId, commitMessage, commit._id);

      //upload snapshot to supabase
      const destinationPath = `repos/${userId}/${repoId}/commits/${uploadId}`;
      await uploadDirectoryToSupabase(
        localPath,
        "codechronicle",
        destinationPath
      );

      //create commit document
      const commitPath = path.join(localPath, "commit.json");
      const data = await fsp.readFile(commitPath, "utf-8");
      const commitData = JSON.parse(data);

      const commitDoc = await Commit.create({
        commitId: uploadId,
        message: commitMessage,
        repository: repoId,
        author: userId,
        storagePath: `repos/${userId}/${repoId}/commits/${uploadId}`,
        parentCommit: commit._id || null,
        committedAt: new Date(commitData.date),
        branch: "main",
      });

      //update the latest commit inside repository
      await Repository.findByIdAndUpdate(repoId, {
        $set: { latestCommit: commitDoc._id },
      });

      return {
        success: true,
        commitId: uploadId,
      };
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      //at last delete the temporary folder
      if (localPath) {
        try {
          await fsp.rm(localPath, {
            recursive: true,
            force: true,
          });

          console.log("Temporary folder deleted.");
        } catch (cleanupError) {
          console.error("Cleanup failed:", cleanupError);
        }
      }
    }
  }

  async editFile(repoId, userId, content, filePath) {
    let localPath;
    try {
      const repository = await Repository.findById(repoId);
      const commit = await Commit.findById(repository.latestCommit);
      const uploadId = randomUUID();

      //download latest snapshot
      const remotePath = `repos/${userId}/${repoId}/commits/${commit.commitId}`;
      localPath = path.join(__dirname, `../temp/uploads`, uploadId);
      await downloadDirectoryFromSupabase(
        "codechronicle",
        remotePath,
        localPath
      );
      await fsp.rm(path.join(localPath, "commit.json"), {
        force: true,
      });

      //replacing the file content
      const targetPath = path.join(localPath, filePath);
      const stats = await fsp.stat(targetPath); //checking file exists or not
      if (!stats.isFile()) {
        throw new Error("The specified path is not a file");
      }
      await fsp.writeFile(targetPath, content, "utf8");

      //creating new commit.json
      const commitMessage = `updated: ${filePath}`;
      await createCommitJson(localPath, uploadId, commitMessage, commit._id);

      //upload snapshot to supabase
      const destinationPath = `repos/${userId}/${repoId}/commits/${uploadId}`;
      await uploadDirectoryToSupabase(
        localPath,
        "codechronicle",
        destinationPath
      );

      //create commit document
      const commitPath = path.join(localPath, "commit.json");
      const data = await fsp.readFile(commitPath, "utf-8");
      const commitData = JSON.parse(data);

      const commitDoc = await Commit.create({
        commitId: uploadId,
        message: commitMessage,
        repository: repoId,
        author: userId,
        storagePath: `repos/${userId}/${repoId}/commits/${uploadId}`,
        parentCommit: commit._id || null,
        committedAt: new Date(commitData.date),
        branch: "main",
      });

      //update the latest commit inside repository
      await Repository.findByIdAndUpdate(repoId, {
        $set: { latestCommit: commitDoc._id },
      });

      return {
        success: true,
        commitId: uploadId,
      };
    } catch (err) {
      throw err;
    } finally {
      //at last delete the temporary folder
      if (localPath) {
        try {
          await fsp.rm(localPath, {
            recursive: true,
            force: true,
          });

          console.log("Temporary folder deleted.");
        } catch (cleanupError) {
          console.error("Cleanup failed:", cleanupError);
        }
      }
    }
  }

  async updateRepository(repoId, description) {
    try {
      const repository = await Repository.findByIdAndUpdate(
        repoId,
        {
          description: description.trim(),
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return repository;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new RepositoryService();
