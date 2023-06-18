
const mongoose = require("mongoose")

const Seo = new mongoose.Schema({
    head: {
        type: String,
        trim: true,
    },
    body: {
        type: String,
        trim: true,
    },
    footer: {
        type: String,
        trim: true,
    },
})


module.exports = {
    SeoModel: mongoose.model('Seo', Seo),
}