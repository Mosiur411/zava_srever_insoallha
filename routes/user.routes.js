const { Router } = require('express')
const { getUser, updateUser, registerUser } = require('../controller/user.controller')
const { Auth_Rqeuired } = require('../middleware/auth.middleware')
const userRoutes = Router()
userRoutes.post('/register', registerUser)
userRoutes.get('/user', Auth_Rqeuired, getUser)
userRoutes.put('/updateProfile', Auth_Rqeuired, updateUser)

module.exports = { userRoutes }