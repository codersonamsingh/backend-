const User = require("../../../../../../Models/User");

const GetallSupervisor = async (req, res) => {
    try {
        const vertical = req.body.vertical;
        const allSupervisors = await User.find().select('firstName lastName ');

        res.json({ data: allSupervisors, message: "Supervisors fetched successfully", variant: "success" });
    } catch (error) {
        console.error("Error fetching supervisors:", error);
        res.status(500).json({ variant: "error", message: "Error fetching supervisors: " + error.message });
    }
}

module.exports = GetallSupervisor;