const { default: mongoose } = require("mongoose");
const { PurchasesModel } = require("../../model/purchase");
const { errorMessageFormatter } = require("../../utils/helpers");
const { ProductModel } = require("../../model/product/product.model");

const chcekPurchases = async ({ id }) => {
    const get = await PurchasesModel.findOne({ product_id: id, status: true });
    const result = get?.quantity >= 0 ? false : true;
    return result;
}


const addPurchases = async (req, res) => {
    try {
        const data = req.body;
        const { id, cost, quantity } = data;
        const sentResult = await chcekPurchases(data);
        const extraPurchases = await PurchasesModel({ product_id: id, quantity: quantity, cost: cost, user: req.user._id, stock: quantity, status: sentResult })
        await ProductModel.findOneAndUpdate({ _id: id }, { $inc: { stock: Number(quantity) } }, { new: true })
        await extraPurchases.save()
        return res.status(201).json(extraPurchases)
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}

const addProductPurchases = async (req, res) => {
    try {
        const { _id } = req.query;
        const purchases = await PurchasesModel.find({ product_id: _id })
        return res.status(201).json({ message: purchases })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}
module.exports = { addProductPurchases, addPurchases }