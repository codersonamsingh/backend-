const PosUser = require("../../../../../../Models/PosUser");
const SendPosLoginData = require("./SendPosLoginData");

const CreatePosUser = async (req, res, mobileNumber) => {
    try {
        // Create a new user
        const newUser = new PosUser({
            mobileNumber: mobileNumber,
            partnerId: await generatePartnerId(),
            designation: {
                label: "Pos",
                id: "pos"
            },
            vertical: {
                label: "Pos",
                id: "pos"
            }
        });

        // Save the user
        const savedUser = await newUser.save();

        // Return the newly created user
        return savedUser;
    } catch (err) {
        console.error(`Error during user creation: ${err}`);
        res.status(500).json({
            message: "Server error",
            variant: "error",
            error: err
        });
        throw err; // rethrow the error to be caught by the caller
    }
};

// function to generte 6 digit partnerId initiate with IP followed by 6 random digit, inital 2 will be year
function generatePartnerId() {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(100000 + Math.random() * 900000);
    return `IP${year}${random}`;
}

module.exports = CreatePosUser;
