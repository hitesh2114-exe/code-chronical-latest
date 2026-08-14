const fs = require("fs/promises");
const path = require("path");

async function writeFile(filePath, buffer) {
  // Create parent directories if they don't exist
  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  });

  // Write the file
  await fs.writeFile(filePath, buffer);
}

module.exports = {
  writeFile,
};
