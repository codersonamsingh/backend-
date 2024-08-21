const GetOneEmployee = async(req, res) => {
 const employeeId = req.params.employeeId;

    try {
        const employee = await User
            .findById(employeeId )
            .exec();

        if (!employee) {
            return res.status(404).json({ message: "Employee not found", variant: "error" });
        }

        res.json({ data: employee, message: "Employee fetched successfully", variant: "success" });

    }
    catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({ message: "Error fetching employee: " + error.message, variant: "error" });
    }
}
module.exports = GetOneEmployee;