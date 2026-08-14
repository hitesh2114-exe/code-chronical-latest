const fs = require("fs/promises");
const path = require("path");

async function createCommitJson(
  uploadPath,
  commitId,
  message,
  parentCommit,
  branch = "main"
) {
  const commitData = {
    id: commitId,
    message,
    date: new Date().toISOString(),
    parentCommit: parentCommit || null,
    branch,
  };

  const commitPath = path.join(uploadPath, "commit.json");
  await fs.writeFile(commitPath, JSON.stringify(commitData, null, 2));
}

module.exports = {
  createCommitJson,
};
