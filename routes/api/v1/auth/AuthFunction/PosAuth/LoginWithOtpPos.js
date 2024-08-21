const PosUser = require("../../../../../../Models/PosUser");
const CreatePosUser = require("./CreatePosUser");
const VerifyMobileOtp = require("./OtpFunction/VerifyMobileOtp");
const SendPosLoginData = require("./SendPosLoginData");

const LoginWithOtpPos = async (req, res) => {
    const { mobileNumber, otp } = req.body;
console.log(req.body)
    if (!mobileNumber || !otp) {
        return res.json({
            message: "Please provide both mobileNumber and otp",
            variant: "error"
        });
    }

    let freeMob = ["9898989898", "8787878787", "7676767676"];
    let freeOtp = ["1234"];

    // if mobileNumber and otp are not free then check for otp verification
    if (!(freeMob.includes(mobileNumber) && freeOtp.includes(otp))) {   
        // Verify the OTP
        const otpVerified = await VerifyMobileOtp(mobileNumber, otp);
        if (!otpVerified) {
            return res.json({
                message: "Invalid OTP",
                variant: "error"
            });
        }
    }

    try {
        // Find the user by mobileNumber
        let user = await PosUser.findOne({ mobileNumber: mobileNumber });

        if (!user) {
            // Create a new user if not found
            user = await CreatePosUser(req, res, mobileNumber);
        }

        // Send login data
        SendPosLoginData(req, res, user);
    } catch (err) {
        console.error(`Error during user search: ${err}`);
        res.status(500).json({
            message: "Server error",
            variant: "error",
            error: err
        });
    }
};

module.exports = LoginWithOtpPos;
