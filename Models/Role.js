const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
  label: { type: String, required: true },
  key: { type: String, required: true },
  enable: { type: Boolean, required: true },
});

const ActionSchema = new Schema({
  label: { type: String, required: true },
  key: { type: String, required: true },
  enable: { type: Boolean, required: true },
  fieldPermissions: [FieldSchema]
});

const PermissionSchema = new Schema({
  label: { type: String, required: true },
  key: { type: String, required: true },
  enable: { type: Boolean, required: true },
  actions: [ActionSchema]
});

const RoleSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
},
  roleName: { type: String, required: true },
  description: { type: String },
  permissions: [PermissionSchema],
  createdDate: {
    type: Date,
    default: Date.now
},
updatedDate: {
    type: Date
},
});

module.exports = Role = mongoose.model("myRole", RoleSchema);
