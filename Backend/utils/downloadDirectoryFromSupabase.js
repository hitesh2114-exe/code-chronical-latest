const fs = require("fs").promises;
const path = require("path");
const { supabase } = require("../config/supabase");

async function downloadDirectoryFromSupabase(
  bucketName,
  storagePath,
  downloadDir
) {
  console.log("Downloading from Supabase");
  console.log("Bucket:", bucketName);
  console.log("Remote path:", storagePath);
  console.log("Local path:", downloadDir);

  await fs.mkdir(downloadDir, { recursive: true });

  const { data: items, error } = await supabase.storage
    .from(bucketName)
    .list(storagePath);

  if (error) {
    console.error("Supabase list error:", error);
    throw new Error(error.message);
  }

  console.log(
    `Found ${items.length} items in ${storagePath}`
  );

  for (const item of items) {
    const remoteItemPath = `${storagePath}/${item.name}`;
    const localItemPath = path.join(downloadDir, item.name);

    console.log(
      "Processing:",
      remoteItemPath,
      "| id:",
      item.id
    );

    if (!item.id) {
      await downloadDirectoryFromSupabase(
        bucketName,
        remoteItemPath,
        localItemPath
      );
    } else {
      console.log(
        "Downloading file:",
        remoteItemPath
      );

      const { data: fileData, error } = await supabase.storage
        .from(bucketName)
        .download(remoteItemPath);

      if (error) {
        console.error(
          "Supabase download error:",
          remoteItemPath,
          error
        );

        throw new Error(error.message);
      }

      const buffer = Buffer.from(
        await fileData.arrayBuffer()
      );

      await fs.writeFile(localItemPath, buffer);

      console.log(
        `Downloaded successfully: ${remoteItemPath}`
      );
    }
  }

  console.log(
    "Finished downloading:",
    storagePath
  );
}

module.exports = {
  downloadDirectoryFromSupabase,
};