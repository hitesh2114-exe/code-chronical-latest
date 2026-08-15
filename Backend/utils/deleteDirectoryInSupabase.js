const fs = require("fs").promises;
const path = require("path");
const { supabase } = require("../config/supabase");

async function collectFiles(bucketName, directoryPath) {
  const { data: items, error } = await supabase.storage
    .from(bucketName)
    .list(directoryPath);

  if (error) {
    throw error;
  }

  const files = [];

  for (const item of items) {
    const remotePath = `${directoryPath}/${item.name}`;

    if (!item.id) {
      // Folder
      const nestedFiles = await collectFiles(bucketName, remotePath);

      files.push(...nestedFiles);
    } else {
      // File
      files.push(remotePath);
    }
  }

  return files;
}

async function deleteDirectoryInSupabase(bucketName, directoryPath) {
  try {
    const filesToDelete = await collectFiles(bucketName, directoryPath);
    console.log("Files to delete:", filesToDelete);

    if (filesToDelete.length === 0) {
      return {
        success: true,
        deletedFiles: 0,
      };
    }

    const { error } = await supabase.storage
      .from(bucketName)
      .remove(filesToDelete);

    if (error) {
      throw error;
    }

    console.log(`${filesToDelete.length} files deleted from Supabase.`);

    return {
      success: true,
      deletedFiles: filesToDelete.length,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = { deleteDirectoryInSupabase };
