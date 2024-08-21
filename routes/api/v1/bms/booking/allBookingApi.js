const express = require("express");
const router = express.Router();
const passport = require("passport");
const GetAllBookingWithFilter = require("./BookingFun/getBookingData");
const { UpdateBooking, SaveOneBooking } = require("./BookingFun/SaveOneBooking");
const { validateOnBookingCreate } = require("../../../../../validation/bms/booking/bookingValidation");
const { deleteMultipleBookings, deleteOneBooking } = require("./BookingFun/DeleteBooking");

// /api/v1/bms/booking/saveOne
router.post("/saveOne", passport.authenticate("jwt", { session: false }),
validateOnBookingCreate,
(req, res) => {

    SaveOneBooking(req,res)

});

// /api/v1/bms/booking/saveOne/:id
router.post("/saveOne/:id", passport.authenticate("jwt", { session: false }),
validateOnBookingCreate,
(req, res) => {
    UpdateBooking(req,res)
});

// /api/v1/bms/booking/getallBooking/:sortBy/:rowsPerPage/:page
router.get("/getallBooking/:sortBy/:rowsPerPage/:page/:searchText?", passport.authenticate("jwt", { session: false }),(req, res) => {
    // get all user here with 
    GetAllBookingWithFilter(req,res)
});

// @type    DELETE
// @route   /api/v1/bms/booking/deleteAccount/:id
// @desc    Delete a user profile
// @access  Public
router.delete("/deleteAccount/:id",
    passport.authenticate("jwt", { session: false }), async (req, res) => {
    console.log("Delete request received");
        deleteOneBooking(req, res);
  
});

// @type    DELETE  multiple
// @route   /api/v1/bms/booking/deleteMultipleAccounts
// @desc    Delete a user profile
// @access  Public
router.delete("/deleteMultipleAccounts",
    passport.authenticate("jwt", { session: false }), async (req, res) => {
    console.log("Delete request received");
    deleteMultipleBookings(req, res);
  
});

module.exports = router;