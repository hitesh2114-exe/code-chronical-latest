const { getConfig, clearConfig } = require("../utils/chronConfig");
const { requireAuth } = require("../utils/auth");

async function logout() {
  const config = requireAuth();
  clearConfig();

  console.log("✔ Logged out successfully.");
  console.log(`Goodbye, ${config.user.username}!`);
}

module.exports = { logout };
