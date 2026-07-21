const fs = require("fs").promises; //file system
const path = require("path");
const supabase = require("../../config/supabase");

async function pushRepo() {
  const repoPath = path.join(process.cwd(), ".vcsGit"); //current working directory
  const commitsPath = path.join(repoPath, "commits"); //path to the commit folder

  try {
    // Read repository configuration
    //intially we got it as string and after that we use JSON.parse it convert it into JSON object
    const config = JSON.parse(
      await fs.readFile(path.join(repoPath, "config.json"), "utf-8")
    );

    const { bucket, repoName } = config; //object destructuring

    // Get all commit folders
    const commitFolders = await fs.readdir(commitsPath); //stores all folders name

    // Upload every commit
    for (const commitFolder of commitFolders) {
      const localCommitPath = path.join(commitsPath, commitFolder); //read files or folders from
      const remoteCommitPath = `repos/${repoName}/commits/${commitFolder}`; //where to store the files inside the buckets

      await uploadDirectory(localCommitPath, bucket, remoteCommitPath);
    }

    console.log("All commits pushed successfully.");
  } catch (err) {
    console.error("Error pushing repository:", err.message);
  }
}

async function uploadDirectory(localPath, bucket, remotePath) {
  // Read all files and folders in the current directory
  const items = await fs.readdir(localPath);

  for (const item of items) {
    const itemPath = path.join(localPath, item); //gives us the array of items name containing inside commit1
    const stats = await fs.stat(itemPath); //return everything about the file like size, type, etc.

    if (stats.isDirectory()) {
      //to check if its a folder
      // Recursively upload the subdirectory
      await uploadDirectory(itemPath, bucket, `${remotePath}/${item}`);
    } else {
      // Read the file
      const fileContent = await fs.readFile(itemPath); //contains the information of inside the file

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from(bucket)
        .upload(`${remotePath}/${item}`, fileContent, {
          upsert: true, //update + insert : if file is not found it creates it else it overwrites it
        });

      if (error) {
        throw new Error(error.message);
      }

      console.log(`Uploaded: ${remotePath}/${item}`);
    }
  }
}

module.exports = { pushRepo };


/*
============================================================
WORKING OF uploadDirectory()
============================================================

The uploadDirectory() function recursively uploads all files
and folders from a specified local directory to the Supabase
Storage bucket while preserving the complete directory
structure.

This function is the reverse of downloadDirectory(). Instead
of reading files from Supabase and writing them to the local
filesystem, it reads files from the local filesystem and
uploads them to Supabase Storage.

Parameters:

1. localPath
   -> The path of the directory on the local machine whose
      contents need to be uploaded.

2. bucket
   -> The name of the Supabase Storage bucket where the
      repository is stored.

3. remotePath
   -> The destination path inside the Supabase bucket where
      the directory structure will be recreated.

Working:

1. fs.readdir() retrieves all files and folders present inside
   the current local directory.

2. Each item is processed one by one.

3. For every item, two paths are constructed:

      • itemPath
          -> Complete path of the current item on the local
             machine.

      • remotePath/item
          -> Corresponding destination path inside Supabase
             Storage.

4. fs.stat() is used to determine whether the current item is
   a directory or a file.

5. If the current item is a directory, uploadDirectory() calls
   itself recursively to upload every file and subdirectory
   inside it.

6. If the current item is a file:

      a. fs.readFile() reads the file from the local
         filesystem.

      b. upload() uploads the file contents to the specified
         location inside the Supabase Storage bucket.

      c. The "upsert: true" option allows an existing file
         with the same path to be replaced instead of causing
         an upload error.

7. The recursion continues until every nested folder has been
   visited and every file has been uploaded.

Overall flow:

uploadDirectory()
        │
        ▼
Read Local Directory
        │
        ▼
For every item
        │
        ├──────────────┐
        │              │
     Directory       File
        │              │
        ▼              ▼
Recursive Call     Read File
                       │
                       ▼
                  Upload File
                       │
                       ▼
               Supabase Storage

This recursive approach guarantees that the complete local
directory hierarchy is uploaded to Supabase while preserving
the exact folder structure, regardless of how deeply nested
the directories are.

============================================================
*/
