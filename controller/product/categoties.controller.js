const { default: mongoose } = require("mongoose");
const { errorMessageFormatter } = require("../../utils/helpers");
const { CategorieModel } = require("../../model/product/categories.model");
const { DevelopmentModel } = require("../../model/product/development.model");
/* Development create */
const addCategoties = async (req, res) => {

    try {
        const name = req.body.name;
        const development_id = req.body.development_id;
        const data = { name: name, development_id: development_id, user: req.user._id }
        const categorie = await CategorieModel(data).save()
        return res.status(201).json({ categorie })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}




const getCategoties = async (req, res) => {
    try {
        const query = req.query._id;
        let categorie;
        if (query) {
            categorie = await CategorieModel.find({ development_id: query }).sort({ _id: -1 })
        } else {
            categorie = await CategorieModel.find({}).sort({ _id: -1 }).populate(['development_id', 'user'])
        }
        return res.status(201).json({ categorie })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}

const deleteCategoties = async (req, res) => {
    try {
        const { categoty_id } = req.query;
        const result = await CategorieModel.deleteMany({ _id: { $in: categoty_id } });
        return res.status(201).json({ result })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}




module.exports = {
    addCategoties, getCategoties, deleteCategoties
}

/*   // const result = await DevelopmentModel.aggregate([
        //     {
        //         $lookup: {
        //             from: 'categories',
        //             localField: 'category',
        //             foreignField: '_id',
        //             as: 'category'
        //         }
        //     },
        //     {
        //         $match: {
        //             'category._id': new mongoose.Types.ObjectId(categoty_id),
        //         }
        //     },
        //     {
        //         $unset: 'category'
        //     },
        //     {
        //         $unwind: '$developments'
        //     }
        // ]).then(() => CategorieModel.findByIdAndDelete(categoty_id)); */