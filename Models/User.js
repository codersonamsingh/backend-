const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        maxlength: 50
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    middleName: {
        type: String,
        maxlength: 50
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
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
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    vertical: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    supervisorId: {
        type: Schema.Types.ObjectId,
        ref: "myUser",
    },
    salary: {
        type: "Number"
    },
    variable: {
         type: "Number"
    },
    employmentType: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    status: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "myRole",
    },
    notes: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "myUser",
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    },
    hrRemarks: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = User = mongoose.model('myUser', UserSchema);
