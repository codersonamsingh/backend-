const VerifyMobileOtp = async (mobileNumber,otp) => {

    try {
        console.log('Verifying OTP for mobileNumber', mobileNumber, otp);
        // Find the otp in the database
        const otpCreation = await OtpCreation.findOne({
            'mobileNumber.mobileNumber': mobileNumber,
            'mobileNumber.otp': otp,
            'mobileNumber.verified' : false
        });

        if (otpCreation) {
            console.log('OTP verified successfully!');
            // Update the otp as verified
            otpCreation.mobileNumber.verified = true;
            await otpCreation.save();
            return true;
        } else {
            console.error('Failed to verify OTP');
            return false;
        }
    } catch (error) {
        console.error('Error occurred while verifying OTP', error);
        return false;
    }
}

module.exports = VerifyMobileOtp;