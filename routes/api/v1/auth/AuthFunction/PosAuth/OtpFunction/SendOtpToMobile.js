const axios = require('axios');

const SendOtpToMobile = async (mobileNumber, otp) => {
  try {
    console.log('Sending OTP to mobileNumber', mobileNumber, otp);
    const apikey = 'Z1dDDpo0QzQVbM2V';
    const senderid = 'INSOFY';
    const templateid = '1707172146159254345';
    const message = `${otp} is your One Time Password (OTP) to login into INSOFY. Please do not share it with anyone. INSOFY`;
    
    const url = `https://manage.txly.in/vb/apikey.php?apikey=${apikey}&senderid=${senderid}&templateid=${templateid}&number=${mobileNumber}&message=${encodeURIComponent(message)}`;

    const response = await axios.get(url);
    
    if (response.status === 200) {
      console.log('OTP sent successfully!');
    } else {
      console.error('Failed to send OTP', response.data);
    }
  } catch (error) {
    console.error('Error occurred while sending OTP', error);
  }
};

module.exports = SendOtpToMobile;
