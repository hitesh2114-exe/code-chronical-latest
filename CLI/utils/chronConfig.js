const fs = require("fs"); //file system
const os = require("os"); //Node.js’s operating system module for system info and utilities
const path = require("path");

const CONFIG_PATH = path.join(os.homedir(), ".chronconfig"); //os.homedir(): Path to the user’s home directory

function saveConfig(data) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 4), "utf-8");
}

function getConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    //Check existence
    return null;
  }

  const data = fs.readFileSync(CONFIG_PATH, "utf-8");
  return JSON.parse(data);
}

function clearConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    return false;
  }

  fs.unlinkSync(CONFIG_PATH);
  return true;
}

module.exports = { saveConfig, getConfig, clearConfig };
