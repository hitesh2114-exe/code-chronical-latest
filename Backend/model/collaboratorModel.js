const mongoose = require("mongoose");
const { Schema } = mongoose;

const collaboratorSchema = new Schema(
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

    role: {
      type: String,
      enum: ["owner", "editor", "viewer"],
      default: "viewer",
    },
  },
  {
    timestamps: true,
  }
);

collaboratorSchema.index({ repository: 1, user: 1 }, { unique: true }); //A user shouldn't accidentally become a collaborator twice on the same repository.

module.exports = mongoose.model("Collaborator", collaboratorSchema);

/*
============================================================
COLLABORATOR MODEL
============================================================

Purpose:
Represents a user's access to a repository.

Responsibilities:
- Store repository collaborators.
- Define collaborator roles.
- Manage repository permissions.

Important Design Decision:
Instead of storing an array of collaborators inside the
Repository model, each collaborator is stored as a separate
document. This keeps the database normalized and simplifies
permission management.

Relationships:
- One Collaborator references one Repository.
- One Collaborator references one User.

A compound unique index ensures that the same user cannot be
added multiple times to the same repository.
*/

/*
============================================================
COMPOUND UNIQUE INDEX
============================================================

This creates a compound index on the `repository` and `user` fields.

- `repository: 1` → Index the repository field in ascending order.
- `user: 1` → Within each repository, index users in ascending order.
- `unique: true` → Ensures that the combination of (repository, user)
  is unique.

Example:

Repository   User
------------------------
RepoA        John   
RepoA        Rahul    
RepoB        John   
RepoA        John   Duplicate (Not Allowed)

This prevents the same user from being added multiple times as a
collaborator to the same repository, while still allowing:
- A user to collaborate on multiple repositories.
- A repository to have multiple collaborators.

Additionally, the index improves query performance when searching
collaborators by repository and user.
*/
