const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../../../Models/User");
const passport = require("passport");
const SendLoginData = require("./AuthFunction/bmsAuth/SendLoginData");
const GetAllUserWithFilter = require("./AuthFunction/bmsAuth/GetAllUserWithFilter");
const GetOneEmployee = require("./AuthFunction/bmsAuth/GetOneEmployee");
const SendFakeLoginData = require("./AuthFunction/bmsAuth/SendFakeLoginData");
const LoginWithOtpPos = require("./AuthFunction/PosAuth/LoginWithOtpPos");
const CreateAndSendOtp = require("./AuthFunction/PosAuth/OtpFunction/CreateAndSendOtp");
const mongoose = require('mongoose');
const GetallSupervisor = require("./AuthFunction/bmsAuth/GetallSupervisor");
const PosUser = require("../../../../Models/PosUser");

// @type    POST
// @route   /api/v1/auth/passwordAuth/login
// @desc    route for login of users
// @access  PUBLIC
router.post("/login", async (req, res) => {
    const password = req.body.password;
    const emu = req.body.emu;  // This should be either email, mobileNumber number, or employeeId

    if (!password || !emu) {
        return res.status(400).json({
            message: "Please provide both email/mobileNumber/employeeId and password",
            variant: "error"
        });
    }

    // Find the user by email, mobileNumber number, or employeeId
    User.findOne({
        $or: [
            { email: emu },
            { mobileNumber: emu },
            { employeeId: emu }
        ]
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                variant: "error"
            });
        }
        // Check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // Send login data if password matches
                    SendLoginData(req, res, user);
                } else {
                    res.status(400).json({
                        message: "Invalid credentials",
                        variant: "error"
                    });
                }
            })
            .catch(err => {
                console.error(`Error during password comparison: ${err}`);
                res.status(500).json({
                    message: "Server error",
                    variant: "error",
                    error:err
                });
            });
    }).catch(err => {
        console.error(`Error during user search: ${err}`);
        res.status(500).json({
            message: "Server error",
            variant: "error",
            error:err
        });
    });
});
// /api/v1/auth/passwordAuth/me
router.get("/posme", passport.authenticate("jwt", { session: false }), async (req, res) => {
const posUser = await PosUser.findById(req.user._id);
if (!posUser) {
    return res.status(404).json({ variant: "error", message: "User not found" });
}
res.json({ user: posUser, message:"data loaded", variant: "success" });
})
// /api/v1/auth/passwordAuth/me
router.get("/me", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId(req.user._id);

        const userWithRole = await User.aggregate([
            { $match: { _id: userId } },
            {
                $lookup: {
                    from: 'myroles', // Make sure this matches your collection name in MongoDB
                    localField: 'role',
                    foreignField: '_id',
                    as: 'roleDetails'
                }
            },
            { $unwind: '$roleDetails' },
            {
                $project: {
                    gender: 1,
                    designation: 1,
                    vertical: 1,
                    employmentType: 1,
                    status: 1,
                    employeeId: 1,
                    firstName: 1,
                    lastName: 1,
                    middleName: 1,
                    dateOfBirth: 1,
                    email: 1,
                    phoneNumber: 1,
                    role: '$roleDetails',
                    _id: 1
                }
            }
        ]);

        if (!userWithRole || userWithRole.length === 0) {
            return res.status(404).json({ variant: "error", message: "User not found" });
        }

        res.json({ user: userWithRole[0], message:"data loaded", variant: "success" });
    } catch (error) {
        console.error("Error fetching user with role details:", error);
        res.status(500).json({ variant: "error", message: "Error fetching user details: " + error.message });
    }
});

// /api/v1/auth/passwordAuth/getallUser/:sortBy/:rowsPerPage/:page
router.get("/getallUser/:sortBy/:rowsPerPage/:page/:searchText?", passport.authenticate("jwt", { session: false }),(req, res) => {
    // get all user here with 
    GetAllUserWithFilter(req,res)
});

// /api/v1/auth/passwordAuth/getOneEmployee/:employeeId
router.get("/getOneEmployee/:employeeId", passport.authenticate("jwt", { session: false }),(req, res) => {
    // get all user here with 
    GetOneEmployee(req,res)
});

// /api/v1/auth/passwordAuth/fakeLoginWithOtp
router.post("/fakeLoginWithOtp",(req, res) => {
    
    SendFakeLoginData(req,res);
});

// @type    POST
// @route   /api/v1/auth/passwordAuth/sendOtp
// @desc    Add some additional data
// @access  Private
router.post("/sendOtp", 
    // passport.authenticate("jwt", { session: false }),
     async(req, res) => {
     await CreateAndSendOtp(req,res);
    })


// /api/v1/auth/passwordAuth/posLoginWithOtp
router.post("/posLoginWithOtp",(req, res) => {
    
    LoginWithOtpPos(req,res);
});
// Get supervisor list
// /api/v1/auth/passwordAuth/getallSupervisor
router.post("/getallSupervisor",(req, res) => {
    
    GetallSupervisor(req,res);
});

module.exports = router;
