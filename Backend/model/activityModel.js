const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema(
  {
    repository: {
      type: Schema.Types.ObjectId,
      ref: "Repository",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "created_repository",
        "commit",
        "push",
        "pull",
        "revert",
        "issue_created",
        "issue_closed",
        "joined_repository",
      ],
      required: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);

/*
============================================================
ACTIVITY MODEL
============================================================

Purpose:
Maintains an activity history of actions performed within a
repository.

Responsibilities:
- Record commits.
- Record pushes and pulls.
- Record repository creation.
- Record issue creation and closure.
- Record collaborator events.

This model powers the activity feed shown to repository
members and provides a historical log of important events.

Relationships:
- One Activity belongs to one Repository.
- One Activity belongs to one User.
*/
