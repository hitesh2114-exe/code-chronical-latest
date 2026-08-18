const userServices = require("../services/userServices");

class UserController {
  async updateBio(req, res) {
    try {
      const userId = req.user.id;
      const message = req.body.bio;
      const response = await userServices.updateBio(userId, message);
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

  async deleteAccount(req, res) {
    try {
      const userId = req.user.id;
      const response = await userServices.deleteAccount(userId);
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

module.exports = new UserController();
