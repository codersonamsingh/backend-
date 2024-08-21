const OtpCreation = require("../../../../../../../Models/Private/Common/OtpCreation");
const SendOtpToMobile = require("./SendOtpToMobile");

const CreateAndSendOtp = async(req, res) => {
 
    let otp = RandomNumber(1000, 9999);
    let mobileNumber = req.body.mobileNumber;
    let freeMob = ["9898989898", "8787878787", "7676767676"];

    // if mobileNumber and otp are not free then check for otp verification
    if (freeMob.includes(mobileNumber)) {      
       return res.status(200).json({
            message: "OTP sent successfully",
            Variant: "success"
        });
        
    }


    let email = req.body.email;
    let user = req.user?.id;
    let creationDate = new Date();

    let otpCreation = new OtpCreation({
        mobileNumber: {
            mobileNumber: mobileNumber,
            otp: otp
        },
        email: {
            emailId: email,
            otp: otp
        },
        user: user,
        creationDate: creationDate
    });
    await otpCreation.save();

    // Send OTP to mobileNumber
    await SendOtpToMobile(mobileNumber, otp);
    // Send OTP to email

    res.status(200).json({
        message: "OTP sent successfully",
        Variant: "success"
    });

}

const RandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



module.exports = CreateAndSendOtp;