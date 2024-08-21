const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../../../Models/User");
const Profile = require("../../../../Models/Private/Profile");


// @type    GET
// @route   /api/v1/auth/profile/getOne/:userName
// @desc    Get an employee by ID
// @access  Public
router.get("/getOne/:userName", (req, res) => {
    let userName = req.params.userName;
    User.findOne({ userName: userName })
        .then(myData => {
            if (!myData) {
                return res.status(404).json({ message: "My Data not found" });
            }
            
            // Exclude sensitive fields from the response
            const { loginAllowed, value, password, ...userData } = myData.toObject();

            res.json({
                data: userData,
                message: "Profile Data Loaded",
                variant: "success"
            });
        })
        .catch(err => console.log(err));
});

// @type    Get
// @route   /api/v1/auth/profile/get/oneProfile
// @desc    Add some additional data
// @access  Private
router.get("/get/oneProfile", 
passport.authenticate("jwt", { session: false }), async(req, res) => {

    let myData = await Profile.findOne({user:req.user._id}).catch(err => console.log(err))
res.json({
    data:myData,
    message:"Profile data loaded",
    variant:"success"
})
})




module.exports = router;
