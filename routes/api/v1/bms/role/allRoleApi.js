const express = require("express");
const router = express.Router();
const passport = require("passport");
const PermissionData = require("./RoleFun/permissionData");
const { validateOnRoleCreate, validateOnRoleUpdate } = require("../../../../../validation/bms/roleValidation");
const { SaveOneRole, UpdateRole } = require("./RoleFun/SaveOneRole");
const GetAllRoleWithFilter = require("./RoleFun/getRoleData");
const getDropDownRole = require("./RoleFun/getDropDownRole");
const DeleteRole = require("./RoleFun/DeleteRole");


// @type    GET
// @route   /api/v1/bms/role/allPermissionData
// @desc    route for all Permission Data
// @access  PUBLIC
router.get("/allPermissionData", 
(req, res) => {
    res.json({
        message: "allPermissionData",
        variant: "success",
        data:PermissionData
    });
});

// /api/v1/bms/role/saveOne
router.post("/saveOne", passport.authenticate("jwt", { session: false }),
validateOnRoleCreate,
(req, res) => {
    SaveOneRole(req,res)
});

// /api/v1/bms/role/saveOne/:id
router.post("/saveOne/:id", passport.authenticate("jwt", { session: false }),
validateOnRoleUpdate,
(req, res) => {
    UpdateRole(req,res)
});


// /api/v1/bms/role/getallRole/:sortBy/:rowsPerPage/:page
router.get("/getallRole/:sortBy/:rowsPerPage/:page/:searchText?", passport.authenticate("jwt", { session: false }),(req, res) => {
    // get all user here with 
    GetAllRoleWithFilter(req,res)
});
// /api/v1/bms/role/dropDown/allRole
router.get("/dropDown/allRole", passport.authenticate("jwt", { session: false }),(req, res) => {
    // get all user here with 
    getDropDownRole(req,res)
});

// /api/v1/bms/role/deleteRole/:id
router.delete("/deleteRole/:id", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    // get all user here with 
    DeleteRole(req,res)
});

module.exports = router;