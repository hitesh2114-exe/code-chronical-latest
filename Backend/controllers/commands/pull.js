const fs = require("fs").promises; //file system
const path = require("path");
const supabase = require("../../config/supabase");

async function pullRepo() {
  const repoPath = path.join(process.cwd(), ".vcsGit"); //current working directory
  const commitsPath = path.join(repoPath, "commits"); //path to the commit folder

  try {
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

/*
============================================================
WORKING OF downloadDirectory()
============================================================

The downloadDirectory() function recursively downloads all files
and folders from a specified directory in the Supabase Storage
bucket and recreates the same directory structure on the local
machine.

This function is the reverse of uploadDirectory(). Instead of
reading files from the local system and uploading them to
Supabase, it reads files from Supabase and writes them to the
local filesystem.

Parameters:

1. remotePath
   -> The path of the directory inside the Supabase bucket that
      needs to be downloaded.

2. localPath
   -> The destination path on the local machine where the
      directory and its contents will be recreated.

3. bucket
   -> The name of the Supabase Storage bucket containing the
      repository.

Working:

1. fs.mkdir() creates the current directory on the local machine.
   The "recursive" option automatically creates any missing parent
   directories if they do not already exist.

2. Supabase's list() method retrieves every item present inside
   the current remote directory. The returned list may contain
   both files and subdirectories.

3. Each item is processed one by one.

4. For every item, two paths are constructed:

      • remoteItemPath
          -> Complete path of the item inside Supabase.

      • localItemPath
          -> Corresponding destination path on the local system.

5. The item type is identified.

      • If item.id is null (or absent), the item is treated as
        a directory.

      • If item.id exists, the item is treated as a file.

6. If the current item is a directory, downloadDirectory() calls
   itself recursively to download every file and subdirectory
   inside it.

7. If the current item is a file:

      a. download() retrieves the file from Supabase.

      b. The downloaded file is received as a Blob.

      c. arrayBuffer() converts the Blob into raw binary data.

      d. Buffer.from() converts the ArrayBuffer into a Node.js
         Buffer so that it can be written to the filesystem.

      e. fs.writeFile() saves the file to its corresponding
         local directory.

8. The recursion continues until every nested folder has been
   visited and every file has been downloaded.

Overall flow:

downloadDirectory()
        │
        ▼
Create local directory
        │
        ▼
List remote directory
        │
        ▼
For every item
        │
        ├──────────────┐
        │              │
     Directory       File
        │              │
        ▼              ▼
Recursive Call     Download File
                       │
                       ▼
                    Blob
                       │
                       ▼
                  ArrayBuffer
                       │
                       ▼
                     Buffer
                       │
                       ▼
                 Write to Disk

This recursive approach guarantees that the complete directory
hierarchy stored in Supabase is recreated exactly on the local
machine, regardless of how deeply nested the folders are.

============================================================
*/