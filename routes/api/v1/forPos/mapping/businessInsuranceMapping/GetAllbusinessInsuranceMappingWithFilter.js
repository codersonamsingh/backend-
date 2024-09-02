const BusinessInsuranceMapping = require("../../../../../../Models/Private/Pos/Mapping/BusinessInsuranceMapping");

const GetAllBusinessInsuranceMappingWithFilter = async (req, res) => {
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
        let query = BusinessInsuranceMapping.find();

        if (searchText) {
            query = query.or([
                { reqNumber: new RegExp(searchText, 'i') },
                { plan: new RegExp(searchText, 'i') }, // Updated to use prosperName
                { sumInsured: new RegExp(searchText, 'i') },
                { policyNumber: new RegExp(searchText, 'i') }, // Updated to use pincode
                { insurer: new RegExp(searchText, 'i') } // Updated to use prosperMobileNumber
            ]);
        }

        const allBusinessInsuranceMappings = await query
            .sort({ [sortBy]: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'partner',
                select: 'partnerId firstName lastName middleName'
            })
            .exec();

        // Flatten the partner object
        const flattenedBusinessInsuranceMappings = allBusinessInsuranceMappings.map(businessInsuranceMapping => {
            const { partner, ...rest } = businessInsuranceMapping.toObject(); // Convert the document to a plain JS object
            return {
                ...rest,
                partnerId: partner?.partnerId || "",
                partnerFirstName: partner?.firstName || "",
                partnerLastName: partner?.lastName || "",
                partnerMiddleName: partner?.middleName || ""
            };
        });

        res.json({ 
            data: flattenedBusinessInsuranceMappings, 
            message: "BusinessInsuranceMappings fetched successfully", 
            variant: "success" 
        });
    } catch (error) {
        console.error("Error fetching BusinessInsuranceMappings:", error);
        res.status(500).json({ variant: "error", message: "Error fetching BusinessInsuranceMappings: " + error.message });
    }
};

module.exports = GetAllBusinessInsuranceMappingWithFilter;
