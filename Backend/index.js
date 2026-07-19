const express = require("express");

//yargs
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

//commands
const { initRepo } = require("./controllers/commands/init");
const { addRepo } = require("./controllers/commands/add");
const { commitRepo } = require("./controllers/commands/commit");

yargs(hideBin(process.argv))
  .command("begin", "Starting the server", {}, startServer)
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
  .parse();

async function startServer() {
  const app = express();
  const port = 8080;

  app.get("/", (req, res) => {
    res.send("welcome to the root...!");
  });

  app.listen(port, () => {
    console.log(`Connected to port : ${port}`);
  });
}
