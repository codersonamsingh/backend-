const User = require("../../../../../../Models/User");
const SendLoginData = require("./SendLoginData");

const SendFakeLoginData = (req, res) => {
User.findOne({
   
}).then(user => {
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            variant: "error"
        });
    }

    SendLoginData(req, res, user);
}).catch(err => {
    console.error(`Error during user search: ${err}`);
    res.status(500).json({
        message: "Server error",
        variant: "error",
        error:err
    });
});

}
module.exports = SendFakeLoginData;