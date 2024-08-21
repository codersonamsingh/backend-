const Booking = require("../../../../../../Models/Private/Employee/Booking");

const GetAllBookingWithFilter = async(req, res) => {
    try {
        // Destructure parameters from the request and provide default values
        const {
            sortBy = 'createdAt', // default sorting field
            rowsPerPage = 10, // default number of rows per page
            page = 0, // default page number
            searchText
        } = req.params;

        console.log({ sortBy, rowsPerPage, page, searchText });

        // Convert rowsPerPage and page to integers
        const limit = parseInt(rowsPerPage, 10);
        const skip = (parseInt(page, 10) ) * limit;

        // Ensure skip is never negative
        if (skip < 0) throw new Error("Page number must be greater than 0.");

        // Build the query with sorting and pagination
        let query = Booking.find();

        // Add search text filter if provided
        if (searchText) {
            query = query.where('customerName').regex(new RegExp(searchText, 'i')); // Example: searching by customerName
        }

        // Sorting, pagination, and execution of the query
        const allBooking = await query
            .sort({ [sortBy]: -1 }) // Sort by the specified field
            .skip(skip) // Skip records for pagination
            .limit(limit) // Limit the number of records
            .exec();

        // Send the filtered Booking to the client
        res.json({ data: allBooking, message: "Booking fetched successfully" , variant: "success" });
    } catch (error) {
        console.error("Error fetching Booking:", error);
        res.status(500).json({ variant:"error", message: "Error fetching Booking: " + error.message });
    }
};
module.exports = GetAllBookingWithFilter;