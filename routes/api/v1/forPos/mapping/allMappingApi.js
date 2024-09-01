const express = require("express");
const router = express.Router();
const passport = require("passport");
const { AddMotorMapping, UpdateMotorMapping } = require("./motorMapping/AddMotorMapping");
const GetAllMotorMappingWithFilter = require("./motorMapping/GetAllMotorMappingWithFilter");
const { AddHealthMapping, UpdateHealthMapping } = require("./healthMapping/AddhealthMapping");
const GetAllHealthMappingWithFilter = require("./healthMapping/GetAllhealthMappingWithFilter");
const { validateOnHealthMappingUpdate, validateOnHealthMappingCreate } = require("../../../../../validation/pos/offline/mapping/healthValidation");
const { AddTravelMapping, UpdateTravelMapping } = require("./travelMapping/AddtravelMapping");
const GetAllTravelMappingWithFilter = require("./travelMapping/GetAlltravelMappingWithFilter");
const { validateOnTravelMappingUpdate, validateOnTravelMappingCreate } = require("../../../../../validation/pos/offline/mapping/travelValidation");
const { AddbusinessInsuranceMapping } = require("./businessInsuranceMapping/AddbusinessInsuranceMapping");

// /api/v1/forPos/mapping/motor/saveOne
router.post("/motor/saveOne",
passport.authenticate("jwt", { session: false }),
validateOnHealthMappingCreate,
async(req, res) => { 
    await AddMotorMapping(req,res);
}
)

// /api/v1/forPos/mapping/motor/saveOne/:id
router.post("/motor/saveOne/:id",
    passport.authenticate("jwt", { session: false }),
    validateOnHealthMappingUpdate,
    async(req, res) => { 
        await UpdateMotorMapping(req,res);
    }
    )

    // /api/v1/forPos/mapping/getAllMotorMappingWith/:sortBy/:rowsPerPage/:page/:searchText
router.get("/getAllMotorMappingWith/:sortBy/:rowsPerPage/:page/:searchText?",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => { 
        await GetAllMotorMappingWithFilter(req,res);
    }
    )


    // /api/v1/forPos/mapping/health/saveOne
router.post("/health/saveOne",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => { 
        await AddHealthMapping(req,res);
    }
    )

     // /api/v1/forPos/mapping/health/saveOne/id:
router.post("/health/saveOne/id:",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => { 
        await UpdateHealthMapping(req,res);
    }
    )
      // /api/v1/forPos/mapping/getAllHealthMappingWith/:sortBy/:rowsPerPage/:page/:searchText
router.get("/getAllHealthMappingWith/:sortBy/:rowsPerPage/:page/:searchText?",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => { 
        await GetAllHealthMappingWithFilter(req,res);
    }
    )

    // /api/v1/forPos/mapping/travel/saveOne
router.post("/travel/saveOne",
    passport.authenticate("jwt", { session: false }),
    validateOnTravelMappingCreate,
    async(req, res) => { 
        await AddTravelMapping(req,res);
    }
    )

    // /api/v1/forPos/mapping/travel/saveOne/:id
router.post("/travel/saveOne/:id",
    passport.authenticate("jwt", { session: false }),
    validateOnTravelMappingUpdate,
    async(req, res) => { 
        await  UpdateTravelMapping(req,res);
    }
    )

     // /api/v1/forPos/mapping//getAllTravelMappingWith/:sortBy/:rowsPerPage/:page/:searchText
router.get("/getAllTravelMappingWith/:sortBy/:rowsPerPage/:page/:searchText?",
    passport.authenticate("jwt", { session: false }),
    
    async(req, res) => { 
        await  GetAllTravelMappingWithFilter(req,res);
    }
    )

    // /api/v1/forPos/mapping/businessInsurance/saveOne
router.post("/businessInsurance/saveOne",
    passport.authenticate("jwt", { session: false }),
    validateOnHealthMappingCreate,
    async(req, res) => { 
        await AddbusinessInsuranceMapping(req,res);
    }
    )
module.exports = router;