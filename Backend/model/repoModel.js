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

    storagePath: {
      type: String,
      required: true,
    },

    defaultBranch: {
      type: String,
      default: "main",
    },

    latestCommit: {
      type: Schema.Types.ObjectId,
      ref: "Commit",
    },

    stars: {
      type: Number,
      default: 0,
    },

    forks: {
      type: Number,
      default: 0,
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
Represents a Code Chronicle repository.

Responsibilities:
- Store repository metadata.
- Maintain ownership information.
- Define repository visibility.
- Point to the storage location containing repository files.

Important Design Decision:
This model DOES NOT store actual repository files.
All repository contents and commit snapshots are stored inside
Supabase Storage, while MongoDB stores only metadata.

Relationships:
- One Repository belongs to one User (Owner).
- One Repository has many Commits.
- One Repository has many Issues.
- One Repository has many Collaborators.
- One Repository has many Activities.
*/
