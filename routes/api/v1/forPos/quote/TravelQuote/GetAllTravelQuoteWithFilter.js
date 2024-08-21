const OfflineTravelQuote = require("../../../../../../Models/Private/Pos/OfflineTravelQuote");

const GetAllTravelQuoteWithFilter = async (req, res) => {
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

        let query = OfflineTravelQuote.find();

        if (searchText) {
            query = query.or([
                { reqNumber: new RegExp(searchText, 'i') },
                { fullName: new RegExp(searchText, 'i') },
                { city: new RegExp(searchText, 'i') },
                { pinCode: new RegExp(searchText, 'i') },
                { mobileNumber: new RegExp(searchText, 'i') }
            ]);
        }

        const allTravelQuotes = await query
            .sort({ [sortBy]: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'partner',
                select: 'partnerId firstName lastName middleName'
            })
            .exec();

        // Get total count for pagination purposes
        const totalCount = await OfflineTravelQuote.countDocuments(query.getQuery());

        // Flatten the partner object
        const flattenedTravelQuotes = allTravelQuotes.map(travelQuote => {
            const { partner, ...rest } = travelQuote.toObject(); // Convert the document to a plain JS object
            return {
                ...rest,
                partnerId: partner?.partnerId || "",
                partnerFirstName: partner?.firstName || "",
                partnerLastName: partner?.lastName || "",
                partnerMiddleName: partner?.middleName || ""
            };
        });

        res.json({ 
            data: flattenedTravelQuotes, 
            totalCount, 
            message: "OfflineTravelQuotes fetched successfully", 
            variant: "success" 
        });
    } catch (error) {
        console.error("Error fetching OfflineTravelQuotes:", error);
        res.status(500).json({ variant: "error", message: "Error fetching OfflineTravelQuotes: " + error.message });
    }
};

module.exports = GetAllTravelQuoteWithFilter;
