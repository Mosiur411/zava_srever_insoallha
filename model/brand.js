const mongoose = require("mongoose")
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
}, { timestamps: true })

module.exports = {
    BrandModel: mongoose.model('Brand', BrandSchema),
}