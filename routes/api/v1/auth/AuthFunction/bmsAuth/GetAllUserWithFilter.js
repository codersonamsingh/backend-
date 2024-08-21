const User = require("../../../../../../Models/User");

const GetAllUserWithFilter = async (req, res) => {
    try {
        // Destructure parameters from the request and provide default values
        const {
            sortBy = 'createdAt', // default sorting field
            rowsPerPage = 10, // default number of rows per page
            page = 1, // default page number, start from 1
            searchText
        } = req.params;

        console.log({ sortBy, rowsPerPage, page, searchText });

        // Convert rowsPerPage and page to integers
        const limit = parseInt(rowsPerPage, 10);
        const skip = (parseInt(page, 10) - 1) * limit;

        // Ensure skip is never negative
        if (skip < 0) throw new Error("Page number must be greater than 0.");

        // Build the query with sorting and pagination
        let query = User.find();

        // Add search text filter if provided
        if (searchText) {
            const searchRegex = new RegExp(searchText, 'i');
            query = query.or([
                { firstName: searchRegex },
                { lastName: searchRegex },
                { middleName: searchRegex },
                { email: searchRegex },
                { mobileNumber: searchRegex }
            ]);
        }

        // Sorting, pagination, and execution of the query with role population
        const allUsers = await query
            .sort({ [sortBy]: -1 }) // Sort by the specified field
            .skip(skip) // Skip records for pagination
            .limit(limit) // Limit the number of records
            .populate('role', 'roleName description') // Populate role with roleName and description
            .exec();

        // Send the filtered users to the client
        res.json({ data: allUsers, message: "Users fetched successfully", variant: "success" });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ variant: "error", message: "Error fetching users: " + error.message });
    }
};

module.exports = GetAllUserWithFilter;
