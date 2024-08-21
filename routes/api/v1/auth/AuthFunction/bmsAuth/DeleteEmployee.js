const DeleteEmployee = async (req, res) => {
    const userIdToDelete = req.params.id;
    const requestingUserId = req.user._id;

    // Ensure the user is not deleting their own account
    if (userIdToDelete === requestingUserId.toString()) {
        return res.status(400).json({
            message: "You cannot delete your own account",
            variant: "error"
        });
    }
const userData = await User.findById(userIdToDelete);
    if (!userData) {
        return res.status(404).json({
            message: "User not found",
            variant: "error"
        });
    }
    // check if user email is admin@insofy.in then don't let it delete
    if (userData.email === "admin@insofy.in") {
        return res.status(400).json({
            message: "You cannot delete admin account",
            variant: "error"
        });
    }



    // Proceed with deleting the user
    User.findByIdAndRemove(userIdToDelete)
        .then(user => {
            if (user) {
                res.json({
                    message: "User profile deleted successfully",
                    variant: "success"
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
                message: "Problem in deleting",
                variant: "error",
                error: err
            });
        });
}

module.exports = DeleteEmployee;




