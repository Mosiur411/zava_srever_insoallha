const { default: mongoose } = require("mongoose");
const { errorMessageFormatter } = require("../utils/helpers");
const { UserModel } = require("../model/user.model");
const { getAuth } = require("firebase-admin/auth");
const {EmployeeModel}= require("../model/employee.model");

/* get data */
const getUserByEmail = async (email) => {
    try {
        const user = await EmployeeModel.findOne({ email })
        return user
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        throw new Error(errorMessage)
    }
}
/* user create */
const registerUser = async (req, res) => {
    try {
        const data = req.body;
        const firebaseUser = await getAuth().getUserByEmail(data?.email);
        if(!firebaseUser.uid){
            return res.status(401).json({ error: 'Unauthorized User' })
        }
        data.uid = firebaseUser.uid
        const user = await UserModel(data)
        await user.save()
        return res.status(201).json({ user })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}
/* user get  */
const getUser = async (req, res) => {
    try {
        const _id = req.user._id;
        const user = await UserModel.findById(_id)
        return res.status(201).json({ user })
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}
/* user update  */
const updateUser = async (req, res) => {
    try {
        const { _id } = req.query;
        const data = req.body;
        const file = req.file;
        const img = file?.path;
        data.image = img;
        if (!_id) return res.status(401).json({ error: 'value not Update' })
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            return res.status(401).json({ error: 'value is Empty' })
        } else {
            const user = await UserModel.findOneAndUpdate({ _id }, { ...data }, { new: true })
            return res.status(201).json({ user })
        }
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}

module.exports = {
    getUserByEmail,
    registerUser,
    getUser,
    updateUser,
}
