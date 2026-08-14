const fs = require("fs").promises;
const path = require("path");
const { supabase } = require("../config/supabase");

async function downloadDirectoryFromSupabase(
  bucketName,
  storagePath, //remote path
  downloadDir //local path
) {
  // console.log("reachead downloadDirectoryFromSupabase");

  await fs.mkdir(downloadDir, { recursive: true }); //creates the parent folder

  const { data: items, error } = await supabase.storage //read from supabase
    .from(bucketName)
    .list(storagePath);

  if (error) {
    throw new Error(error.message);
  }

  for (const item of items) {
    const remoteItemPath = `${storagePath}/${item.name}`;
    const localItemPath = path.join(downloadDir, item.name);

    // If the item has no id, treat it as a folder
    if (!item.id) {
      await downloadDirectoryFromSupabase(
        bucketName,
        remoteItemPath,
        localItemPath
      );
    } else {
      // Download the file
      const { data: fileData, error } = await supabase.storage //A Blob is simply a container holding binary data.
        .from(bucketName)
        .download(remoteItemPath);

      if (error) {
        throw new Error(error.message);
      }

      // Convert Blob to Buffer
      const buffer = Buffer.from(await fileData.arrayBuffer()); //ArrayBuffer : a chunk of raw memory

      // Save file locally
      await fs.writeFile(localItemPath, buffer);

      console.log(`Downloaded: ${remoteItemPath} from supabase`);
    }
  }
}

module.exports = { downloadDirectoryFromSupabase };
