const mongoose = require("mongoose");
const { Schema } = mongoose;

const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
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

    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);

/*
============================================================
ISSUE MODEL
============================================================

Purpose:
Represents an issue raised for a repository.

Responsibilities:
- Store issue title and description.
- Track issue status.
- Associate issues with repositories.
- Track the user who created the issue.

This model enables repository collaboration by allowing users
to report bugs, request features, or discuss improvements.

Relationships:
- One Issue belongs to one Repository.
- One Issue belongs to one User.
*/
