const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    starRepos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Repository",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

/*
============================================================
USER MODEL
============================================================

Purpose:
Represents a registered user of Code Chronicle.

Responsibilities:
- Store authentication information.
- Maintain user profile details.
- Keep track of followed users.
- Store repositories starred by the user.

This model intentionally stores only user-related metadata.
Repository files and commit snapshots are stored separately
in Supabase Storage.

Relationships:
- One User can own multiple repositories.
- One User can create multiple commits.
- One User can create multiple issues.
- One User can collaborate on multiple repositories.
*/
