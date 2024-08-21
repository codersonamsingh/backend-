const Booking = require("../../../../../../Models/Private/Employee/Booking");

const deleteOneBooking = async (req, res) => {
    const { id: bookingId } = req.params;
    const { _id: requestingUserId } = req.user;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
                variant: "error"
            });
        }

        const result = await Booking.deleteOne({ _id: bookingId });
        if (result.deletedCount > 0) {
            return res.json({
                message: "Booking deleted successfully",
                variant: "success",
                deletedCount: result.deletedCount
            });
        } else {
            return res.status(404).json({
                message: "No booking found to delete",
                variant: "error"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Problem in deleting",
            variant: "error",
            error
        });
    }
};

const deleteMultipleBookings = async (req, res) => {
    const { bookingIdsToDelete } = req.body; // Array of booking IDs to delete
    const { _id: requestingUserId } = req.user;

    try {
        const result = await Booking.deleteMany({ _id: { $in: bookingIdsToDelete } });
        if (result.deletedCount > 0) {
            return res.json({
                message: "Bookings deleted successfully",
                variant: "success",
                deletedCount: result.deletedCount
            });
        } else {
            return res.status(404).json({
                message: "No bookings found to delete",
                variant: "error"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Problem in deleting bookings",
            variant: "error",
            error
        });
    }
};

module.exports = { deleteOneBooking, deleteMultipleBookings };
