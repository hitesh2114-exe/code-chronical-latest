const inquirer = require("inquirer").default;
const { login: loginUser } = require("../services/authService");
const { saveConfig, getConfig } = require("../utils/chronConfig");
const { getToken } = require("../utils/auth");

async function login() {

  const config = getConfig();
  if (config) {
    console.log(`✔ You are already logged in as ${config.user.username}.`);
    console.log("Run 'chron logout' to login with another account.");
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Enter your email:",
    },
    {
      type: "password",
      name: "password",
      message: "Enter your password:",
      mask: "*",
    },
  ]);

  console.log("\nLogging in...\n");

  try {
    const response = await loginUser(answers.email, answers.password);

    saveConfig({
      token: response.data.token,
      user: response.data.user,
    });

    console.log(`✔ ${response.message}`);
    console.log(`Welcome back, ${response.data.user.username}!`);
  } catch (error) {
    console.log(`✖ ${error.response?.data?.message || error.message}`);
  }
}

module.exports = { login };
