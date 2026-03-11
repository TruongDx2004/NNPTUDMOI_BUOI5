let mongoose = require('mongoose')

let roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Trùng tên role"]
    },
    description: {
        type: String,
        default: ""
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model('role', roleSchema)