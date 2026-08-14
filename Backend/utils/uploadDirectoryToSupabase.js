const fs = require("fs");
const path = require("path");
const { supabase } = require("../config/supabase");

async function uploadDirectoryToSupabase(
  localDir,
  bucketName,
  destinationPath
) {
  const entries = fs.readdirSync(localDir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    console.log("Entry name:", entry.name);

    const fullPath = path.join(localDir, entry.name);

    if (entry.isDirectory()) {
      await uploadDirectoryToSupabase(
        fullPath,
        bucketName,
        `${destinationPath}/${entry.name}`
      );
    } else {
      const fileBuffer = fs.readFileSync(fullPath);
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(`${destinationPath}/${entry.name}`, fileBuffer, {
            upsert: true,
          });

        if (error) {
          throw error;
        }

        console.log(`Uploaded: ${destinationPath}/${entry.name} to supabase`);
      } catch (err) {
        console.error("UPLOAD FAILED:");
        console.error(err);
        throw err;
      }
    }
  }
}

module.exports = { uploadDirectoryToSupabase };
