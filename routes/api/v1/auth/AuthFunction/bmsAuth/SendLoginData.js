const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../../../../../../setup/myurl");
const jwt_decode = require("jwt-decode");

function SendLoginData(req, res, user) {
    // use payload and create token for user
    const payload = {
        id: user._id,
        userImage: user.userImage,
        name: user.name
    };

    // Setting token expiration to 20 hour
    const options = { expiresIn: '20h' };

    try {
        jsonwt.sign(payload, key.secret, options, (err, token) => {
            if (err) {
                console.error("Error signing token:", err);
                res.status(500).json({ success: false, message: "Internal Server Error" });
            } else {
                let obj = {
                    success: true,
                    accessToken: token,
                    user: user,
                    id: user._id,
                    message: "Success",
                    variant: "success",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    userImage: user.userImage || "https://mui.com/static/images/avatar/2.jpg",
                    designation: user.profileType ? user.profileType : "Unknown", // handle if jobRole is undefined
                    profileType: user.profileType,
                };
                res.json(obj);
            }
        });
    } catch (error) {
        console.error("Error sending login data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


  module.exports = SendLoginData