const exploreService = require("../services/exploreService");

class ExploreController {
  async explore(req, res) {
    try {
      const response = await exploreService.explore();
      return res.status(200).json({
        success: true,
        response,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const response = await exploreService.getUserProfile(userId);
      return res.status(200).json({
        success: true,
        response,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new ExploreController();
