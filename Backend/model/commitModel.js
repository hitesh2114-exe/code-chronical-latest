const mongoose = require("mongoose");
const { Schema } = mongoose;

const commitSchema = new Schema(
  {
    commitId: {
      type: String,
      required: true,
      unique: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    repository: {
      type: Schema.Types.ObjectId,
      ref: "Repository",
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    storagePath: {
      type: String,
      required: true,
    },

    parentCommit: {
      type: Schema.Types.ObjectId,
      ref: "Commit",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Commit", commitSchema);

/*
============================================================
COMMIT MODEL
============================================================

Purpose:
Represents a single commit made to a repository.

Responsibilities:
- Store commit metadata.
- Store commit message.
- Track commit author.
- Link commits together using parentCommit.
- Store the storage path of the commit snapshot.

Important Design Decision:
Only commit metadata is stored in MongoDB.
The actual snapshot of repository files is stored in
Supabase Storage.

Relationships:
- One Commit belongs to one Repository.
- One Commit belongs to one User.
- One Commit may reference one Parent Commit.
*/
