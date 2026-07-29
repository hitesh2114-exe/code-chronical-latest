const { getConfig } = require("./chronConfig");

function requireAuth() {
  const config = getConfig();

  if (!config) {
    console.log("✖ You are not logged in.");
    console.log("Run 'chron login' to login.");
    process.exit(1);
  }

  return config;
}

function getToken() {
  return requireAuth().token;
}

function getCurrentUser() {
  return requireAuth().user;
}

module.exports = { requireAuth, getToken, getCurrentUser };
