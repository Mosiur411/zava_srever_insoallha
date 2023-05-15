const { getAuth } = require('firebase-admin/auth')
const { errorMessageFormatter } = require('../utils/helpers')
const { getUserByEmail } = require('../controller/user.controller')
const Auth_Rqeuired = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) return res.status(401).json({ error: 'Authentication Required.' })
        const token = authorization.split('Bearer ')[1]
        const { uid, email, email_verified} = await getAuth().verifyIdToken(token)
        if (!uid) return res.status(401).json({ error: 'Unauthorized User' })
        if (!email_verified) return res.status(401).json({ error: 'User is not Verif email' })
        const user = await getUserByEmail(email)
        if (!user) return res.status(401).json({ error: 'Unauthorized User' })
        req.user = { uid, email, _id: user?._id }
        next()
    } catch (err) {
        const errorMessage = errorMessageFormatter(err)
        return res.status(500).json(errorMessage)
    }
}
module.exports = { Auth_Rqeuired }
