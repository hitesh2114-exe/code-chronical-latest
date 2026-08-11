const Repository = require("../model/repoModel");
const commitService = require("../services/commitService");

class CommitController {
  async getCommits(req, res) {
    try {
      const { repoId } = req.params;
      const response = await commitService.getCommits(repoId);
      res.send(response);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getParticularCommit(req, res) {
    try {
      const { commitId } = req.params;
      const path = req.query.path || "";
      const response = await commitService.getParticularCommit(commitId, path);
      res.send(response);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async readFile(req, res) {
    try {
      const { commitId } = req.params;
      const path = req.query.path || "";
      const response = await commitService.readFile(commitId, path);
      return res.status(200).json({
        success: true,
        response,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new CommitController();
