const fs = require("fs");
const unzipper = require("unzipper");

async function unzipDirectory(zipPath, destination) {
  // Create destination folder if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const zip = await unzipper.Open.file(zipPath);

  await zip.extract({
    path: destination,
  });
}

module.exports = { unzipDirectory };
