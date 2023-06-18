const { default: mongoose } = require("mongoose");
const { errorMessageFormatter } = require("../utils/helpers");
const { SeoModel } = require("../model/seo.model");

const getSeo = async (req, res) => {
    try {
        const seo = await SeoModel.findOne({})
        return res.status(201).json({ seo })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}
const updateSeo = async (req, res) => {
    try {
        const data = req.body;
        const { _id } = req.query;
        console.log(_id)
        console.log(data)
        const seo = await SeoModel.findOneAndUpdate({ _id }, { ...data }, { new: true })
        return res.status(201).json({ seo })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}

module.exports = {
    getSeo,
    updateSeo
}
