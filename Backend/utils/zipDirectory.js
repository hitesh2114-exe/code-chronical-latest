const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

async function zipDirectory(sourceDir, outputZip) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!fs.existsSync(sourceDir)) {
        return reject(
          new Error(`Source directory does not exist: ${sourceDir}`)
        );
      }

      const outputDir = path.dirname(outputZip);

      // Make sure the ZIP output directory exists.
      fs.mkdirSync(outputDir, {
        recursive: true,
      });

      const output = fs.createWriteStream(outputZip);

      const archive = archiver("zip", {
        zlib: { level: 9 },
      });

      output.on("close", () => {
        console.log(`ZIP created successfully: ${outputZip}`);

        resolve();
      });

      output.on("error", (err) => {
        reject(err);
      });

      archive.on("error", (err) => {
        reject(err);
      });

      archive.pipe(output);

      archive.directory(sourceDir, false);

      await archive.finalize();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { zipDirectory };
