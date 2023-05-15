
const mongoose = require("mongoose")

const SubCategorieSchema = new mongoose.Schema({
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
    categorie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
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
    SubCategorieModel: mongoose.model('Subcategorie', SubCategorieSchema),
}