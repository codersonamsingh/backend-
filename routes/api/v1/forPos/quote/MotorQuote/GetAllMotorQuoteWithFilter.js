const OfflineMotorQuote = require("../../../../../../Models/Private/Pos/OfflineMotorQuote");

const GetAllMotorQuoteWithFilter = async (req, res) => {
    try {
        const {
            sortBy = 'createdAt',
            rowsPerPage = 10,
            page = 0,
            searchText
        } = req.query;

        console.log({ sortBy, rowsPerPage, page, searchText });

        const limit = parseInt(rowsPerPage, 10);
        const skip = (parseInt(page, 10)) * limit;

        if (skip < 0) throw new Error("Page number must be greater than 0.");

        let query = OfflineMotorQuote.find();

        if (searchText) {
            query = query.where('customerEmail').regex(new RegExp(searchText, 'i'));
        }

        const allMotorQuotes = await query
            .sort({ [sortBy]: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'partner',
                select: 'partnerId firstName lastName middleName'
            })
            .exec();

        // Flatten the partner object
        const flattenedMotorQuotes = allMotorQuotes.map(motorQuote => {
            const { partner, ...rest } = motorQuote.toObject(); // Convert the document to a plain JS object
            return {
                ...rest,
                partnerId: partner?.partnerId || "",
                partnerFirstName: partner?.firstName || "",
                partnerLastName: partner?.lastName || "",
                partnerMiddleName: partner?.middleName || ""
            };
        });

        res.json({ data: flattenedMotorQuotes, message: "OfflineMotorQuotes fetched successfully", variant: "success" });
    } catch (error) {
        console.error("Error fetching OfflineMotorQuotes:", error);
        res.status(500).json({ variant: "error", message: "Error fetching OfflineMotorQuotes: " + error.message });
    }
};

module.exports = GetAllMotorQuoteWithFilter;

