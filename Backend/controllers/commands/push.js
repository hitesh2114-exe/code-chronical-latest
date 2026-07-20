const fs = require("fs").promises; //file syatem
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
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      console.log(`Uploaded: ${remotePath}/${item}`);
    }
  }
}

module.exports = { pushRepo };
