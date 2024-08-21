const bcrypt = require("bcryptjs");

const UpdateAccount = async (req, res) => {
    const updatedUser = {};

    // Add fields to updatedUser only if they are available in the request
    if (req.body.employeeId) updatedUser.employeeId = req.body.employeeId;
    if (req.body.firstName) updatedUser.firstName = req.body.firstName;
    if (req.body.lastName) updatedUser.lastName = req.body.lastName;
    if (req.body.middleName) updatedUser.middleName = req.body.middleName;
    if (req.body.dateOfBirth) updatedUser.dateOfBirth = req.body.dateOfBirth;
    if (req.body.gender) updatedUser.gender = req.body.gender;
    if (req.body.email) updatedUser.email = req.body.email;
    if (req.body.mobileNumber) updatedUser.mobileNumber = req.body.mobileNumber;
    if (req.body.address) updatedUser.address = req.body.address;
    if (req.body.city) updatedUser.city = req.body.city;
    if (req.body.state) updatedUser.state = req.body.state;
    if (req.body.postalCode) updatedUser.postalCode = req.body.postalCode;
    if (req.body.country) updatedUser.country = req.body.country;
    if (req.body.dateOfJoining) updatedUser.dateOfJoining = req.body.dateOfJoining;
    if (req.body.designation) updatedUser.designation = req.body.designation;
    if (req.body.vertical) updatedUser.vertical = req.body.vertical;
    if (req.body.supervisorId) updatedUser.supervisorId = req.body.supervisorId;
    if (req.body.salary) updatedUser.salary = req.body.salary;
    if (req.body.variable) updatedUser.variable = req.body.variable;
    if (req.body.employmentType) updatedUser.employmentType = req.body.employmentType;
    if (req.body.status) updatedUser.status = req.body.status;
    if (req.body.role) updatedUser.role = req.body.role;
    if (req.body.notes) updatedUser.notes = req.body.notes;
    if (req.body.hrRemarks) updatedUser.hrRemarks = req.body.hrRemarks;
    updatedUser.updatedDate = new Date();

    // Check if password is provided and needs to be hashed
    if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error("Error generating salt:", err);
                return res.status(500).json({
                    message: "Internal Server Error",
                    variant: "error"
                });
            }

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({
                        message: "Internal Server Error",
                        variant: "error"
                    });
                }

                updatedUser.password = hash;

                // Update the user with the new hashed password
                User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true })
                    .then(user => {
                        if (user) {
                            res.json({
                                message: "User profile updated successfully",
                                variant: "success",
                                user
                            });
                        } else {
                            res.status(404).json({
                                message: "User not found",
                                variant: "error"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Problem in updating",
                            variant: "error",
                            error: err
                        });
                    });
            });
        });
    } else {
        // Update the user without changing the password
        User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true })
            .then(user => {
                if (user) {
                    res.json({
                        message: "User profile updated successfully",
                        variant: "success",
                        user
                    });
                } else {
                    res.status(404).json({
                        message: "User not found",
                        variant: "error"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Problem in updating",
                    variant: "error",
                    error: err
                });
            });
    }
}

module.exports = UpdateAccount;