
# Permissions Schema

This document provides an overview of the permissions schema used in our application. The schema defines roles, permissions, and actions, including field-level permissions, to manage user access and operations.

## Overview

The schema includes three primary collections: `Role`, `User`, and `Task`. Each collection serves a specific purpose in managing permissions and user data.

### Collections

- **Role**: Defines roles and their associated permissions.
- **User**: Represents users and their assigned roles.
- **Task**: Represents tasks that users can interact with, based on their permissions.

## Role Schema

The `Role` schema defines roles and their permissions, including actions and field-level permissions.

### Role Schema Definition

\`\`\`javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  label: { type: String, required: true },
  key: { type: String, required: true },
  enable: { type: Boolean, required: true },
  fieldPermissions: {
    type: Map,
    of: Boolean,
    default: {}
  }
});

const PermissionSchema = new Schema({
  label: { type: String, required: true },
  key: { type: String, required: true },
  enable: { type: Boolean, required: true },
  actions: [ActionSchema]
});

const RoleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  permissions: [PermissionSchema]
});

module.exports = Role = mongoose.model("Role", RoleSchema);
\`\`\`

### Example Role Document

\`\`\`json
{
  "_id": "unique_role_id",
  "name": "Employee",
  "description": "Regular employee with limited access",
  "permissions": [
    {
      "label": "User",
      "key": "user",
      "enable": true,
      "actions": [
        {
          "label": "List",
          "key": "list",
          "enable": true
        },
        {
          "label": "Add",
          "key": "add",
          "enable": true
        },
        {
          "label": "Edit",
          "key": "edit",
          "enable": false,
          "fieldPermissions": {
            "date": false  // cannot edit the date field
            // Other fields are implicitly allowed
          }
        },
        {
          "label": "Owner View",
          "key": "ownerView",
          "enable": true
        },
        {
          "label": "Owner Edit",
          "key": "ownerEdit",
          "enable": true,
          "fieldPermissions": {
            "date": false  // cannot edit the date field
            // Other fields are implicitly allowed
          }
        },
        {
          "label": "Owner Delete",
          "key": "ownerDelete",
          "enable": true
        }
      ]
    }
  ]
}
\`\`\`

## User Schema

The `User` schema represents users and their assigned roles.

### User Schema Definition

\`\`\`javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role_ids: [{ type: Schema.Types.ObjectId, ref: "Role" }]
});

module.exports = User = mongoose.model("User", UserSchema);
\`\`\`

### Example User Document

\`\`\`json
{
  "_id": "unique_user_id",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role_ids": ["unique_role_id"]
}
\`\`\`

## Task Schema

The `Task` schema represents tasks that users can interact with, based on their permissions.

### Task Schema Definition

\`\`\`javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model("Task", TaskSchema);
\`\`\`

### Example Task Document

\`\`\`json
{
  "_id": "unique_task_id",
  "title": "Task 1",
  "description": "Description of task 1",
  "date": "2024-07-01T00:00:00Z",
  "ownerId": "unique_user_id",
  "creationDate": "2024-07-01T00:00:00Z"
}
\`\`\`

## Usage Example

The following example demonstrates how to use the schemas to manage permissions and perform operations.

### Fetching User Permissions

\`\`\`javascript
const getUserPermissions = async (userId) => {
  const user = await User.findById(userId).populate('role_ids').exec();
  const permissions = [];
  
  user.role_ids.forEach(role => {
    role.permissions.forEach(permission => {
      permissions.push(permission);
    });
  });

  return permissions;
};
\`\`\`

### Editing a Task with Field-Level Permissions

\`\`\`javascript
const editTask = async (userId, taskId, updatedData) => {
  const user = await User.findById(userId).populate('role_ids').exec();
  const task = await Task.findById(taskId);
  
  if (!task) {
    throw new Error('Task not found');
  }

  let canEdit = false;
  let fieldPermissions = {};

  user.role_ids.forEach(role => {
    role.permissions.forEach(permission => {
      if (permission.key === 'user') {
        permission.actions.forEach(action => {
          if (action.key === 'edit' && action.enable) {
            canEdit = true;
            fieldPermissions = action.fieldPermissions;
          } else if (action.key === 'ownerEdit' && action.enable && task.ownerId.toString() === userId) {
            canEdit = true;
            fieldPermissions = action.fieldPermissions;
          }
        });
      }
    });
  });

  if (canEdit) {
    for (const field in updatedData) {
      if (fieldPermissions[field] === false) {
        throw new Error(`Permission denied to edit field: ${field}`);
      }
    }
    Object.assign(task, updatedData);
    await task.save();
    return task;
  } else {
    throw new Error('Permission denied');
  }
};

// Example usage
(async () => {
  try {
    const userId = "user_id_here"; // Replace with actual user ID
    const taskId = "task_id_here"; // Replace with actual task ID
    const newTaskData = { title: "New Title", description: "Updated Description" };

    const permissions = await getUserPermissions(userId);
    console.log('User Permissions:', permissions);

    const updatedTask = await editTask(userId, taskId, newTaskData);
    console.log('Updated Task:', updatedTask);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
})();
\`\`\`
