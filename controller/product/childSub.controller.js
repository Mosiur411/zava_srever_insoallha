const { default: mongoose } = require("mongoose");
const { errorMessageFormatter } = require("../../utils/helpers");
const { SubChildCategorieSchema } = require("../../model/product/childsub.model");
/* Development create */
const addChildSubCategoties = async (req, res) => {
    try {
        const data = req.body;
        const childSub = await SubChildCategorieSchema.create({ ...data, user: req.user._id })
        return res.status(201).json({ childSub })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}
const getChildSubCategoties = async (req, res) => {
    try {
        const query = req.query._id;
        let childSub;
        if (query) {
            childSub = await SubChildCategorieSchema.find({ sub_id: query }).sort({ _id: -1 })
        } else {
            childSub = await SubChildCategorieSchema.find({}).sort({ _id: -1 }).populate(['development_id', 'categorie_id', 'sub_id', 'user'])
        }
        return res.status(201).json({ childSub })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }



}
const deleteChildSubCategoties = async (req, res) => { }

module.exports = {
    addChildSubCategoties, getChildSubCategoties, deleteChildSubCategoties
}