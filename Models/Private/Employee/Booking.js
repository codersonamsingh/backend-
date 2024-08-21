const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    businessType: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    businessName: {
        type: String,
        required: true
    },
    pospCode: {
        type: String,
        required: true
    },
    bpCode: {
        type: String,
        required: true
    },
    rmName: {
        type: String,
        required: true
    },
    rmCode: {
        type: String,
        required: true
    },
    function: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    functionHead: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingMonth: {
        type: Date,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmailId: {
        type: String,
        required: true
    },
    customerMobileNo: {
        type: Number,
        required: true
    },
    insuranceCompanyName: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    insuranceBrokerId: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    productCategory: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    product: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    productType: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    policyNumber: {
        type: String,
        required: true
    },
    planType: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    premium: {
        type: Number,
        required: true
    },
    netPremium: {
        type: Number,
        required: true
    },
    odPremium: {
        type: Number,
        required: true
    },
    commissionablePremium: {
        type: Number,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    rto: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    fuelType: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    cubicCapacity: {
        type: String,
        required: true
    },
    cpa: {
        type: String,
        required: true
    },
    ncb: {
        type: String,
        required: true
    },
    loadingCapacity: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    carrier: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    seatingCapacityIncludingDriver: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    vehicleRegistrationYear: {
        type: Date,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    policyStartDate: {
        type: Date,
        required: true
    },
    policyEndDate: {
        type: Date,
        required: true
    },
    verificationBy: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    verificationDate: {
        type: Date,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    payoutToBePaidOn: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    payoutPercent: {
        type: String,
        required: true
    },
    tds5PercentOnAmt: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payinToBePaidOn: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    payinPercent: {
        type: String,
        required: true
    },
    tds10Percent: {
        type: String,
        required: true
    },
    netIncomeInBankAccount: {
        type: Number,
        required: true
    },
    retentionPercent: {
        type: String,
        required: true
    },
    amountReceivedFromInsurer: {
        type: Number,
        required: true
    },
    finalAgentPayoutToBePaid: {
        type: Number,
        required: true
    },
    netRevenue: {
        type: Number,
        required: true
    },
    paidUnpaid: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    paidToAgentCode: {
        type: String,
        required: true
    },
    outstanding: {
        type: Number,
        required: true
    },
    invoiceRaised: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    dispute: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = Booking = mongoose.model('myBooking', BookingSchema);

