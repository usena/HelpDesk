import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fName: {
        type: String,
        required: true,
        index: true
    },
    lName: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        required: true,
        default: "customer",
        enum: ["staff", "customer"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    verifyOtp: {
        type: String, 
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean, 
        default: false
    },
    resetOtp: {
        type: String, 
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export default mongoose.model('Users', userSchema)