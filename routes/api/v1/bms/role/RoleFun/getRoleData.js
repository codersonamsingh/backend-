const Role = require("../../../../../../Models/Role");
const User = require("../../../../../../Models/User");

const GetAllRoleWithFilter = async (req, res) => {
    try {
        const {
            sortBy = 'createdAt',
            rowsPerPage = 10,
            page = 0,
            searchText
        } = req.query;

        const limit = parseInt(rowsPerPage, 10);
        const skip = parseInt(page, 10) * limit;

        if (skip < 0) throw new Error("Page number must be greater than or equal to 0.");

        const match = {};
        if (searchText) {
            match.roleName = { $regex: new RegExp(searchText, 'i') };
        }

        const roles = await Role.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: 'myusers', // The collection name in the database
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
            { $sort: { [sortBy]: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    roleName: 1,
                    description: 1,
                    permissions: 1,
                    createdDate: 1,
                    updatedDate: 1,
                    'user._id': 1,
                    'user.employeeId': 1,
                    'user.firstName': 1,
                    'user.lastName': 1,
                    'user.middleName': 1,
                    'user.dateOfBirth': 1,
                    'user.dateOfJoining': 1,
                    'user.designation': 1
                }
            }
        ]);

        res.json({ data: roles, message: "Roles fetched successfully", variant: "success" });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ variant: "error", message: "Error fetching roles: " + error.message });
    }
};

module.exports = GetAllRoleWithFilter;
