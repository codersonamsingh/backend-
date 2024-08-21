
const MotorMapping = require("../../../../../../Models/Private/Pos/Mapping/MotorMapping");
// CRUD - c means create r means read u means update d means delete 


// @desc    Create a new offlineMotorMapping
const AddMotorMapping = async (req, res) => {
    try {
        const offlineMotorMappingObj = await getMotorMappingObj(req, "create");
        let newMotorMapping = await new MotorMapping(offlineMotorMappingObj).save();
        res.status(200).json({
            message: "MotorMapping Successfully Created",
            variant: "success",
            commId: newMotorMapping._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a offlineMotorMapping by ID
const UpdateMotorMapping = async (req, res) => {
    try {
        const offlineMotorMappingObj = await getMotorMappingObj(req, "update");
        await updateMe(req, res, offlineMotorMappingObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateMotorMapping) => {
    try {
        const offlineMotorMapping = await MotorMapping.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateMotorMapping },
            { new: true }
        );
        if (!offlineMotorMapping) {
            return res.status(406).json({
                message: "Id not found",
                variant: "error",
            });
        }
        res.status(200).json({
            message: "Updated successfully!!",
            variant: "success",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error" + error.message,
        });
    }
};

const getMotorMappingObj = async (req, type) => {
    let newMotorMapping = {};

    if (type === "create") {
        newMotorMapping.createdBy = req.user.id;
        newMotorMapping.partner = req.user.id;
        newMotorMapping.reqNumber = await generateReqNumber();
    }

    if (req.body.issueType) {
        newMotorMapping.issueType = req.body.issueType;
    }

    if (req.body.productName) {
        newMotorMapping.productName = req.body.productName;
    }
    
    if (req.body.isBus) {
        newMotorMapping.isBus = req.body.isBus;
    }
    if (req.body.customerName) {
        newMotorMapping.customerName = req.body.customerName;
    }
    if (req.body.registrationNumber) {
        newMotorMapping.registrationNumber = req.body.registrationNumber;
    }
    if (req.body.insurerName) {
        newMotorMapping.insurerName = req.body.insurerName;
    }
    
    if (req.body.policyNumber) {
        newMotorMapping.policyNumber = req.body.policyNumber;
    }
    if (req.body.premium) {
        newMotorMapping.premium = req.body.premium;
    }
    //policy document
    if (req.body.policyDocument) {
        newMotorMapping.policyDocument = req.body.policyDocument;
    }
    //upload rc
    if (req.body.uploadRc) {
        newMotorMapping.uploadRc = req.body.uploadRc;
    }
    //upload Permit
    if (req.body.uploadPermit) {
        newMotorMapping.uploadPermit = req.body.uploadPermit;
    }
    // if (req.body.remarks) {
    //     newMotorMapping.remarks = req.body.remarks;
    // }

    newMotorMapping.updatedDate = new Date();

    return newMotorMapping;
};

// getgReqNumber
const generateReqNumber = async () => {
    let reqNumber = "";
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    reqNumber = year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds + "" + milliseconds;
    return reqNumber;
};

module.exports = { AddMotorMapping, UpdateMotorMapping };
