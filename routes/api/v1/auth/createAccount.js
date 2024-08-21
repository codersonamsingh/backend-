const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { validateOnAccountCreate, validateOnAccountUpdate } = require("../../../../validation/auth/creatAccountValidation");
const User = require("../../../../Models/User");
const Profile = require("../../../../Models/Private/Profile");
const passport = require("passport");
const SendLoginData = require("./AuthFunction/bmsAuth/SendLoginData");
const UpdateAccount = require("./AuthFunction/bmsAuth/UpdateAccount");
const DeleteMultipleEmployees = require("./AuthFunction/bmsAuth/DeleteMultipleEmployees");


// /api/v1/auth/createAccount/check
router.get("/check", (req, res) => {
    console.log("I am working");
    res.send("I am working");
});

// @type    POST
// @route   /api/v1/auth/createAccount/createEmployee
// @desc    Create a new user profile
// @access  Public
router.post("/createEmployee", 
    passport.authenticate("jwt", { session: false }),
    validateOnAccountCreate, async (req, res) => {
    console.log("I am working");
    const newUser = {
      employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
        dateOfJoining: req.body.dateOfJoining,
        designation: req.body.designation,
        vertical: req.body.vertical,
        supervisorId: req.body.supervisorId,
        salary: req.body.salary,
        variable: req.body.variable,
        employmentType: req.body.employmentType,
        status: req.body.status,
        role: req.body.role,
        notes: req.body.notes,
        createdBy: req.user.id,
        password: req.body.password,  // Password to be hashed
        createdDate: new Date(), // Default to current date
        updatedDate: new Date(), // Default to current date
        hrRemarks: req.body.hrRemarks
    };

    // Encrypt Password using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error("Error generating salt:", err);
            return res.status(500).json({
                message: "Internal Server Error",
                variant: "error"
            });
        }

        if (newUser.password) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({
                        message: "Internal Server Error",
                        variant: "error"
                    });
                }

                newUser.password = hash;
                new User(newUser)
                    .save()
                    .then(user => {
                        if (user) {
                            SendLoginData(req, res, user);
                        } else {
                            res.json({
                                message: "Something Went Wrong",
                                variant: "error"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(404).json({
                            message: "Problem in saving",
                            variant: "error",
                            error:err
                        });
                    });
            });
        } else {
            return res.status(400).json({
                message: "Invalid password",
                variant: "error"
            });
        }
    });
});


// @type    POST
// @route   /api/v1/auth/createAccount/updateEmployee/:id
// @desc    Update an existing user profile
// @access  Public
router.post("/updateEmployee/:id",
    passport.authenticate("jwt", { session: false }),
    validateOnAccountUpdate, async (req, res) => {
        UpdateAccount(req, res);
    });

// @type    DELETE
// @route   /api/v1/auth/createAccount/deleteAccount/:id
// @desc    Delete a user profile
// @access  Public
router.delete("/deleteAccount/:id",
    passport.authenticate("jwt", { session: false }), async (req, res) => {
    console.log("Delete request received");
        DeleteEmployee(req, res);
  
});

// @type    DELETE  multiple
// @route   /api/v1/auth/createAccount/deleteMultipleAccounts
// @desc    Delete a user profile
// @access  Public
router.delete("/deleteMultipleAccounts",
    passport.authenticate("jwt", { session: false }), async (req, res) => {
    console.log("Delete request received");
    DeleteMultipleEmployees(req, res);
  
});


const CreateBlankProfile = (user) => {
    let userId = user._id;
    let newData = { user: userId };
    new Profile(newData)
        .save()
        .then(() => console.log("Profile created"))
        .catch(err => console.log(err));
};

module.exports = router;
