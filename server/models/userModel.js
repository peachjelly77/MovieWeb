const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    phoneNumber: {
        type: String
    },

    address: {
        type: String,
    },

    city: {
        type: String,
     },

    state: {
        type: String,
     },

    zipCode: {
        type: String,
     },
    cardNumber: {
        type: String,
    },
    nameOnCard: {
        type: String,
    },
    EXP: {
        type: String,
    },
    CVV: {
        type: String,
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false,
    },
    isSubscribed:{
        type:Boolean,
        default:false,
    },
    userStatus: {
        type:String,
        enum:["INACTIVE", "ACTIVE", "SUSPENDED"],
        default:"INACTIVE",
    }
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("users", movieSchema);