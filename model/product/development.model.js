const mongoose = require("mongoose")

const DevelopmentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref:'User'
    }
   

}, { timestamps: true })
module.exports = {
    DevelopmentModel: mongoose.model('Development', DevelopmentSchema),
}