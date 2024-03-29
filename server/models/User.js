const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    guestID: {
        type: Number,
        unique: true
    },

    role: {
        type: String,
        enum: ["GUEST", "CUSTOMER", "ADMIN"],
        default: "GUEST"
    },

    information: {
        type: Schema.Types.Mixed
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;