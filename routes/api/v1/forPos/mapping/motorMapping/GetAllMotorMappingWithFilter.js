const MotorMapping = require("../../../../../../Models/Private/Pos/Mapping/MotorMapping");


const GetAllMotorMappingWithFilter = async (req, res) => {
    try {
        const {
            sortBy = 'createdDate', // default sorting field
            rowsPerPage = 10, // default number of rows per page
            page = 0, // default page number
            searchText
        } = req.query;

        console.log({ sortBy, rowsPerPage, page, searchText });

        const limit = parseInt(rowsPerPage, 10);
        const skip = (parseInt(page, 10)) * limit;

        if (skip < 0) throw new Error("Page number must be greater than 0.");

        let query = MotorMapping.find();

        if (searchText) {
            query = query.or([
                { reqNumber: new RegExp(searchText, 'i') },
                { fullName: new RegExp(searchText, 'i') },
                { city: new RegExp(searchText, 'i') },
                { pinCode: new RegExp(searchText, 'i') },
                { mobileNumber: new RegExp(searchText, 'i') }
            ]);
        }

        const allMotorMappings = await query
            .sort({ [sortBy]: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'partner',
                select: 'partnerId firstName lastName middleName'
            })
            .exec();

        // Flatten the partner object
        const flattenedMotorMappings = allMotorMappings.map(motorMapping => {
            const { partner, ...rest } = motorMapping.toObject(); // Convert the document to a plain JS object
            return {
                ...rest,
                partnerId: partner?.partnerId || "",
                partnerFirstName: partner?.firstName || "",
                partnerLastName: partner?.lastName || "",
                partnerMiddleName: partner?.middleName || ""
            };
        });

        res.json({ 
            data: flattenedMotorMappings, 
            message: "MotorMappings fetched successfully", 
            variant: "success" 
        });
    } catch (error) {
        console.error("Error fetching MotorMappings:", error);
        res.status(500).json({ variant: "error", message: "Error fetching MotorMappings: " + error.message });
    }
};

module.exports = GetAllMotorMappingWithFilter;
