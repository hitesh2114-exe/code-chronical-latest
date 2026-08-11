const Repository = require("../model/repoModel");
const Commit = require("../model/commitModel");
const { supabase } = require("../config/supabase");

class CommitService {
  async getCommits(repoId) {
    try {
      const repository = await Repository.findById(repoId);
      const commits = await Commit.find({ repository: repoId }).sort({
        createdAt: -1,
      });
      return commits;
    } catch (err) {
      throw err;
    }
  }

  async getParticularCommit(commitId, path) {
    try {
      const commit = await Commit.findById(commitId);
      const filepath = path
        ? `${commit.storagePath}/${path}`
        : commit.storagePath;

      const { data, error } = await supabase.storage
        .from("codechronicle")
        .list(filepath);

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
      throw err;
    }
  }

  async readFile(commitId, path) {
    try {
      const commit = await Commit.findById(commitId);
      const filePath = `${commit.storagePath}/${path}`;

      const { data, error } = await supabase.storage
        .from("codechronicle")
        .download(filePath);

      if (error) {
        throw error;
      }

      const content = await data.text();

      return content;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new CommitService();
