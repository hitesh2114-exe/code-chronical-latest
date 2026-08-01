const fs = require("fs"); //file system
const archiver = require("archiver"); //used to compress file to ZIP file

async function zipDirectory(sourceDir, outputZip) {
  return new Promise(async (resolve, reject) => {
    const output = fs.createWriteStream(outputZip);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      resolve();
    });

    output.on("error", (err) => {
      reject(err);
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);

    // Add the entire directory while preserving its structure.
    archive.directory(sourceDir, false);

    await archive.finalize();
  });
}

module.exports = { zipDirectory };
