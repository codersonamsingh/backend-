const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const GetQuestion = require("./questions/getQuestions");



// @type    Get
// @route   /api/v1/forPos/signUpFlow/getQuestions
// @desc    Update an existing user profile
// @access  Public
router.get("/getQuestions",
    // passport.authenticate("jwt", { session: false }),
     async (req, res) => {
        GetQuestion(req, res);
    });


module.exports = router;
