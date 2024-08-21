const DeleteMultipleEmployees = async (req, res) => {
    const userIdsToDelete = req.body.userIdsToDelete; // Array of user IDs to delete
    const requestingUserId = req.user._id;

    // Ensure the user is not deleting their own account
    if (userIdsToDelete.includes(requestingUserId.toString())) {
        return res.status(400).json({
            message: "You cannot delete your own account",
            variant: "error"
        });
    }

        // check if user email is admin@insofy.in then don't let it delete
    const adminUser = userData.find({email:"admin@insofy.in"}).catch(err => {console.log(err)});
    // Ensure the user is not deleting their own account
    if (userIdsToDelete.includes(adminUser._id.toString())) {
        return res.status(400).json({
            message: "You cannot delete delete admin@insofy.in account",
            variant: "error"
        });
    }


    // Proceed with deleting the users
    User.deleteMany({ _id: { $in: userIdsToDelete } })
        .then(result => {
            if (result.deletedCount > 0) {
                res.json({
                    message: "Users deleted successfully",
                    variant: "success",
                    deletedCount: result.deletedCount
                });
            } else {
                res.status(404).json({
                    message: "No users found to delete",
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

module.exports = DeleteMultipleEmployees;
