const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PosUserSchema = new Schema({
    partnerId: {
        type:String,
        required:true,
        unique:true
    },
    firstName: {
        type: String,
        default:"Default",
        maxlength: 50
    },
    lastName: {
        type: String,
        default:"Name",

        maxlength: 50
    },
    middleName: {
        type: String,
        default:"",

        maxlength: 50
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        label: {
            type: String,
        },
        id: {
            type: String,
        }
    },
    email: {
        type: String,
        maxlength: 100
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        maxlength: 15
    },
    address: {
        type: String,
        maxlength: 255
    },
    city: {
        type: String,
        maxlength: 50
    },
    state: {
        type: String,
        maxlength: 50
    },
    postalCode: {
        type: String,
        maxlength: 10
    },
    country: {
        type: String,
        maxlength: 50
    },
    dateOfJoining: {
        type: Date
    },
    designation: {
        label: {
            type: String,
            default:"PosUser"
        },
        id: {
            type: String,
            default:"pos"
        }
    },
    vertical: {
        label: {
            type: String,
            default:"PosUser"

        },
        id: {
            type: String,
            default:"pos"

        }
    },
    supervisorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
  
    status: {
        label: {
            type: String,
            default: "Active"
        },
        id: {
            type: String,
            default:"active"
        }
    },
  
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    },
    password: {
        type: String,
        default:"Not Set"
    }
});


module.exports = PosUser = mongoose.model('myPosUser', PosUserSchema);
