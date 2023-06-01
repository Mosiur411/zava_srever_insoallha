
const mongoose = require("mongoose")

const ffers = new mongoose.Schema({
    type: {
        type: String,
        trim: true,
    },
    offer: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
    },
    amount: {
        type: Number,
        trim: true,
    },
})

const productImages = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    image: [
        {
            type: String,
            trim: true
        }
    ],
})
const productPrices = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
})




const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        trim: true,
        required: true,
    },
    upc: {
        type: String,
        trim: true,
    },
    sku: {
        type: String,
        trim: true,
    },
    upcBox: {
        type: String,
        trim: true,
    },
    cost: {
        type: Number,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'Employee'
    },
    development_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Development',
        required: true
    },
    categorie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
    },
    sub_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategorie',
    },
    childSub_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChildSubcategorie',
    },
    brand_id: {
        type: String,
        trim: true,
    },
    status: {
        type: Boolean,
        trim: true,
    },
    inStock: {
        type: Number,
        trim: true,
    },
    quantity: {
        type: Number,
        trim: true,
    },
    /* ============== */
    images: [productImages],
    imagesTitle: {
        type: String,
        trim: true,
    },
    imageAlterText: {
        type: String,
        trim: true,
    },
    saleing_Price: {
        type: Number,
        trim: true,
    },
    price: [productPrices],
    tag: {
        type: String,
        trim: true,
    },
    meta_title: {
        type: String,
        trim: true,
    },
    meta_description: {
        type: String,
        trim: true,
    },
    sale: [ffers],
    coupon: [ffers],
    promo: [ffers],
    deal: [ffers],
    description: {
        type: String,
        trim: true,
    }


}, { timestamps: true })
module.exports = {
    ProductModel: mongoose.model('Product', ProductSchema),
}