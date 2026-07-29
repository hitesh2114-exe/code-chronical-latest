const mongoose = require("mongoose");
const { Schema } = mongoose;

const repoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    collaborators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    storagePath: {
      type: String,
      required: true,
    },

    latestCommit: {
      type: Schema.Types.ObjectId,
      ref: "Commit",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Repository", repoSchema);

/*
============================================================
REPOSITORY MODEL
============================================================

Purpose:
Represents a repository in Code Chronicle.

Responsibilities:
- Store repository metadata.
- Maintain ownership information.
- Define repository visibility.
- Store collaborators.
- Store the Supabase storage path.
- Keep reference to the latest pushed commit.

Important Design Decision:
Repository files and commit snapshots are NOT stored in MongoDB.
MongoDB stores only metadata, while repository contents are stored
inside Supabase Storage.

Relationships:
- One Repository belongs to one User (Owner).
- One Repository can have many Collaborators.
- One Repository can have many Commits.
- One Repository can have many Activities.
*/