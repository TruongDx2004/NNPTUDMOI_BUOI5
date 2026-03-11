let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Trùng username"]
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Trùng email"]
    },
    fullName: {
        type: String,
        default: ""
    },
    avatarUrl: {
        type: String,
        default: "https://i.sstatic.net/l60Hf.png"
    },
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role"
    },
    loginCount: {
        type: Number,
        default: 0,
        min: [0, "loginCount phải >= 0"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model('user', userSchema)