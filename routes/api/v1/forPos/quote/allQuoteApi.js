const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const {AddMotorQuote, UpdateOfflineMotorQuote} = require("./MotorQuote/AddMotorQuote");
const { validateOnOfflineMotorQuoteCreate, validateOnOfflineMotorQuoteUpdate } = require("../../../../../validation/pos/offline/offlineMotorQuoteValidation");
const GetAllMotorQuoteWithFilter = require("./MotorQuote/GetAllMotorQuoteWithFilter");
const GetAllHealthQuoteWithFilter = require("./HealthQuote/GetAllHealthQuoteWithFilter");
const { validateOnOfflineHealthQuoteUpdate, validateOnOfflineHealthQuoteCreate } = require("../../../../../validation/pos/offline/offlineHealthQuoteValidation");
const { UpdateOfflineHealthQuote, AddHealthQuote } = require("./HealthQuote/AddHealthQuote");
const GetAllTravelQuoteWithFilter = require("./TravelQuote/GetAllTravelQuoteWithFilter");
const { UpdateOfflineTravelQuote, AddTravelQuote } = require("./TravelQuote/AddTravelQuote");
const { validateOnOfflineTravelQuoteUpdate, validateOnOfflineTravelQuoteCreate } = require("../../../../../validation/pos/offline/offlineTravelQuoteValidation");

// @type    POST
// @route   /api/v1/forPos/quote/motor/saveOne
// @desc    Add some additional data
// @access  Private
router.post("/motor/saveOne", 
passport.authenticate("jwt", { session: false }),
validateOnOfflineMotorQuoteCreate,
 async(req, res) => {
 await AddMotorQuote(req,res);
})
// @type    POST
// @route   /api/v1/forPos/quote/motor/saveOne/:id
// @desc    Add some additional data
// @access  Private
router.post("/motor/deleteOne/:id", 
passport.authenticate("jwt", { session: false }),
 async(req, res) => {
 await UpdateOfflineMotorQuote(req,res);
})
// @type    DELETE
// @route   /api/v1/forPos/quote/motor/saveOne/:id
// @desc    Add some additional data
// @access  Private
router.post("/motor/saveOne/:id", 
passport.authenticate("jwt", { session: false }),
validateOnOfflineMotorQuoteUpdate,
 async(req, res) => {
 await UpdateOfflineMotorQuote(req,res);
})

// /api/v1/forPos/quote/getallmotorQuote/:sortBy/:rowsPerPage/:page
router.get("/getallmotorQuote/:sortBy/:rowsPerPage/:page/:searchText?", passport.authenticate("jwt", { session: false }),(req, res) => {
    // get all user here with 
    GetAllMotorQuoteWithFilter(req,res)
});

// @type    POST
// @route   /api/v1/forPos/quote/health/saveOne
// @desc    Add some additional data
// @access  Private
router.post("/health/saveOne", 
passport.authenticate("jwt", { session: false }),
validateOnOfflineHealthQuoteCreate,
 async(req, res) => {
 await AddHealthQuote(req,res);
})

// @type    DELETE
// @route   /api/v1/forPos/quote/health/saveOne/:id
// @desc    Add some additional data
// @access  Private
router.post("/health/saveOne/:id", 
passport.authenticate("jwt", { session: false }),
validateOnOfflineHealthQuoteUpdate,
 async(req, res) => {
 await UpdateOfflineHealthQuote(req,res);
})

// /api/v1/forPos/quote/getallhealthQuote/:sortBy/:rowsPerPage/:page
router.get("/getallhealthQuote/:sortBy/:rowsPerPage/:page/:searchText?", passport.authenticate("jwt", { session: false }),(req, res) => {
    // get all user here with 
    GetAllHealthQuoteWithFilter(req,res)
});

// @type    POST
// @route   /api/v1/forPos/quote/travel/saveOne
// @desc    Add some additional data
// @access  Private
router.post("/travel/saveOne", 
    passport.authenticate("jwt", { session: false }),
    validateOnOfflineTravelQuoteCreate,
     async(req, res) => {
     await AddTravelQuote(req,res);
    })
    
    // @type    DELETE
    // @route   /api/v1/forPos/quote/travel/saveOne/:id
    // @desc    Add some additional data
    // @access  Private
    router.post("/travel/saveOne/:id", 
    passport.authenticate("jwt", { session: false }),
    validateOnOfflineTravelQuoteUpdate,
     async(req, res) => {
     await UpdateOfflineTravelQuote(req,res);
    })
    
    // /api/v1/forPos/quote/getalltravelQuote/:sortBy/:rowsPerPage/:page
    router.get("/getalltravelQuote/:sortBy/:rowsPerPage/:page/:searchText?", passport.authenticate("jwt", { session: false }),(req, res) => {
        // get all user here with 
        GetAllTravelQuoteWithFilter(req,res)
    });
module.exports = router;
