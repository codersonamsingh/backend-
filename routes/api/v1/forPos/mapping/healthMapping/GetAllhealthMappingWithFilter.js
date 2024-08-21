const HealthMapping = require("../../../../../../Models/Private/Pos/Mapping/HealthMapping");

const GetAllHealthMappingWithFilter = async (req, res) => {
    try {
        const {
            sortBy = 'createdDate', // Default sorting field
            rowsPerPage = 10, // Default number of rows per page
            page = 0, // Default page number
            searchText
        } = req.query;

        const limit = parseInt(rowsPerPage, 10);
        const skip = parseInt(page, 10) * limit;

        if (skip < 0) throw new Error("Page number must be greater than 0.");

        // Construct the query
        let query = HealthMapping.find();

        if (searchText) {
            query = query.or([
                { reqNumber: new RegExp(searchText, 'i') },
                { prosperName: new RegExp(searchText, 'i') }, // Updated to use prosperName
                { city: new RegExp(searchText, 'i') },
                { pincode: new RegExp(searchText, 'i') }, // Updated to use pincode
                { prosperMobileNumber: new RegExp(searchText, 'i') } // Updated to use prosperMobileNumber
            ]);
        }

        const allHealthMappings = await query
            .sort({ [sortBy]: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'partner',
                select: 'partnerId firstName lastName middleName'
            })
            .exec();

        // Flatten the partner object
        const flattenedHealthMappings = allHealthMappings.map(healthMapping => {
            const { partner, ...rest } = healthMapping.toObject(); // Convert the document to a plain JS object
            return {
                ...rest,
                partnerId: partner?.partnerId || "",
                partnerFirstName: partner?.firstName || "",
                partnerLastName: partner?.lastName || "",
                partnerMiddleName: partner?.middleName || ""
            };
        });

        res.json({ 
            data: flattenedHealthMappings, 
            message: "HealthMappings fetched successfully", 
            variant: "success" 
        });
    } catch (error) {
        console.error("Error fetching HealthMappings:", error);
        res.status(500).json({ variant: "error", message: "Error fetching HealthMappings: " + error.message });
    }
};

module.exports = GetAllHealthMappingWithFilter;
