const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema({
    item: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: true,
            ref: 'Product'
        },
        product_name: {
            type: String,
            trim: true,
        },
        quantity: {
            type: Number,
            trim: true,
        },
        saleing_Price: {
            type: Number,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            required: true,
            ref: 'Employee'
        },
    }],
    payment: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    totalPrice: {
        type: Number,
        trim: true,
    },
    totalQuantity: {
        type: Number,
        trim: true,
    },
    checkNumber: {
        type: String,
        trim: true,
    },
    checkProviderName: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'Employee'
    },
    coustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'Coustomer'
    }

}, { timestamps: true })
module.exports = {
    OrderModel: mongoose.model('order', OrderSchema),
}