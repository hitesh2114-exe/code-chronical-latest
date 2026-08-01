const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper"); //used to extract the zip files

async function unzipDirectory(zipPath, destination) {
  // Create destination folder if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: destination }))
      .on("finish", () => {
        console.log("Extraction completed");
        resolve();
      })
      .on("error", reject);
  });
}

module.exports = { unzipDirectory };
