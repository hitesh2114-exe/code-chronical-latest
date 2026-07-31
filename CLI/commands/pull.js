const fs = require("fs").promises; //file system
const path = require("path");
const supabase = require("../config/supabase");
const { requireAuth } = require("../utils/auth");

async function pullRepo() {
  requireAuth();
  const repoPath = path.join(process.cwd(), ".chron"); //current working directory
  const commitsPath = path.join(repoPath, "commits"); //path to the commit folder

  try {
    try {
      await fs.access(repoPath);
      // .chron exists
    } catch {
      console.log("Repository not initialized.");
      return;
    }
    const config = JSON.parse(
      await fs.readFile(path.join(repoPath, "config.json"), "utf-8")
    );

    const { bucket, repoName } = config; //object destructuring

    // Remote commits folder
    const remoteCommitsPath = `repos/${repoName}/commits`;

    // Fetch all commit folders from Supabase
    const { data: commitFolders, error } = await supabase.storage
      .from(bucket)
      .list(remoteCommitsPath);

    if (error) {
      throw new Error(error.message);
    }

    for (const commitFolder of commitFolders) {
      const remoteCommitPath = `${remoteCommitsPath}/${commitFolder.name}`;
      const localCommitPath = path.join(commitsPath, commitFolder.name);

      await downloadDirectory(remoteCommitPath, localCommitPath, bucket);
    }

    console.log("Repository pulled successfully.");
  } catch (err) {
    console.error("Error pulling repository:", err.message);
  }
}

async function downloadDirectory(remotePath, localPath, bucket) {
  // Create the current directory locally
  await fs.mkdir(localPath, { recursive: true }); //creates the folder locally

  // List all items inside the current remote folder
  const { data: items, error } = await supabase.storage
    .from(bucket)
    .list(remotePath);

  if (error) {
    throw new Error(error.message);
  }

  for (const item of items) {
    const remoteItemPath = `${remotePath}/${item.name}`;
    const localItemPath = path.join(localPath, item.name);

    // If the item has no id, treat it as a folder
    if (!item.id) {
      await downloadDirectory(remoteItemPath, localItemPath, bucket);
    } else {
      // Download the file
      const { data: fileData, error } = await supabase.storage //A Blob is simply a container holding binary data.
        .from(bucket)
        .download(remoteItemPath);

      if (error) {
        throw new Error(error.message);
      }

      // Convert Blob to Buffer
      const buffer = Buffer.from(await fileData.arrayBuffer()); //ArrayBuffer : a chunk of raw memory

      // Save file locally
      await fs.writeFile(localItemPath, buffer);

      console.log(`Downloaded: ${remoteItemPath}`);
    }
  }
}

module.exports = { pullRepo };

