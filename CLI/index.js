#!/usr/bin/env node

require("dotenv").config();

//yargs
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

//commands
const { login } = require("./commands/login");
const { logout } = require("./commands/logout");
const { whoami } = require("./commands/whoami");
const { initRepo } = require("./commands/init");
const { addRepo } = require("./commands/add");
const { commitRepo } = require("./commands/commit");
const { pushRepo } = require("./commands/push");
const { pullRepo } = require("./commands/pull");
const { revertRepo } = require("./commands/revert");

yargs(hideBin(process.argv))
  .command({
    command: "login",
    describe: "Login to Code Chronicle",
    handler: login,
  })
  .command({
    command: "logout",
    describe: "Logout from Code Chronicle",
    handler: logout,
  })
  .command({
    command: "whoami",
    describe: "check the current user detail",
    handler: whoami,
  })
  .command(
    "init <repoName>",
    "Initialize a new repository",
    (yargs) => {
      yargs.positional("repoName", {
        describe: "Repository name",
        type: "string",
      });
    },
    (argv) => {
      initRepo(argv.repoName);
    }
  )
  .command(
    "add <file>",
    "Add file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the staged file",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command(
    "push",
    "Push the latest commit to the remote repository",
    {},
    pushRepo
  )
  .command("pull", "pull the commits in to local machine", {}, pullRepo)
  .command(
    "revert <commitId>",
    "Restore the project to a specific commit",
    () => {},
    (argv) => {
      revertRepo(argv.commitId);
    }
  )
  .parse();
