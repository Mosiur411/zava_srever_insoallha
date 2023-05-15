const mongoose = require("mongoose")

const CategorieSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    development_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Development',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'User'
    }

}, { timestamps: true })
module.exports = {
    CategorieModel: mongoose.model('Categorie', CategorieSchema),
}