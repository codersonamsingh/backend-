const Role = require("../../../../../../Models/Role");

// @desc    Create a new role
const SaveOneRole = async (req, res) => {
    try {
        const roleObj = await getRoleObj(req, "create");
        let newRole = await new Role(roleObj).save();
        res.status(200).json({
            message: "Role Successfully Created",
            variant: "success",
            roleId: newRole._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a role by ID
const UpdateRole = async (req, res) => {
    try {
        const roleObj = await getRoleObj(req, "update");
        await updateMe(req, res, roleObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateRole) => {
    try {
        const role = await Role.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateRole },
            { new: true }
        );
        if (!role) {
            return res.status(406).json({
                message: "Id not found",
                variant: "error",
            });
        }
        res.status(200).json({
            message: "Updated successfully!!",
            variant: "success",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error" + error.message,
        });
    }
};

const getRoleObj = async (req, type) => {
    let newRole = {};

    if (type === "create") {
        newRole.createdBy = req.user.id;
    }
    if (type === "update") {
        newRole.updatedDate = new Date();
    }

    if (req.body.roleName) {
        newRole.roleName = req.body.roleName;
    }
    if (req.body.description) {
        newRole.description = req.body.description;
    }
    if (req.body.permissions) {
        newRole.permissions = req.body.permissions.map(permission => ({
            label: permission.label,
            key: permission.key,
            enable: permission.enable,
            actions: permission.actions.map(action => ({
                label: action.label,
                key: action.key,
                enable: action.enable,
                fieldPermissions: action.fieldPermissions ? action.fieldPermissions.map(field => ({
                    label: field.label,
                    key: field.key,
                    enable: field.enable
                })) : [] // Handle absence of fieldPermissions
            }))
        }));
    }

    newRole.lastModified = new Date();

    return newRole;
};

module.exports = { SaveOneRole, UpdateRole };
