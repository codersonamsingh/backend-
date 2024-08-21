const getDropDownRole = async (req, res) => {


    try {
        const roles = await Role.find({}, { roleName: 1, _id: 1, description: 1 });
        res.json({ data: roles, message: "Roles fetched successfully", variant: "success" });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ variant: "error", message: "Error fetching roles: " + error.message });
    }
}
module.exports = getDropDownRole;