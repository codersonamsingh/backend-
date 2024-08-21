const express = require("express");
const router = express.Router();
const passport = require("passport");
const { AddMotorMapping, UpdateMotorMapping } = require("./motorMapping/AddMotorMapping");
const GetAllMotorMappingWithFilter = require("./motorMapping/GetAllMotorMappingWithFilter");
const { AddHealthMapping, UpdateHealthMapping } = require("./healthMapping/AddhealthMapping");

// /api/v1/forPos/mapping/motor/saveOne
router.post("/motor/saveOne",
passport.authenticate("jwt", { session: false }),
async(req, res) => { 
    await AddMotorMapping(req,res);
}
)

// /api/v1/forPos/mapping/motor/saveOne/:id
router.post("/motor/saveOne/:id",
    passport.authenticate("jwt", { session: false }),
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
module.exports = router;