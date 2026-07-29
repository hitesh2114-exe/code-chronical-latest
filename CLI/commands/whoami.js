const { requireAuth } = require("../utils/auth");

async function whoami() {
  const config = requireAuth();
  console.log("Logged in as\n");

  console.log(`Username : ${config.user.username}`);
  console.log(`Email    : ${config.user.email}`);
}

module.exports = { whoami };
