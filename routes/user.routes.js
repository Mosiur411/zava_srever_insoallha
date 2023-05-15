const { Router } = require('express')
const { getUser, updateUser, registerUser } = require('../controller/user.controller')
const { Auth_Rqeuired } = require('../middleware/auth.middleware')
const userRoutes = Router()
userRoutes.post('/register', registerUser)
userRoutes.get('/user', getUser)
userRoutes.put('/updateProfile', updateUser)

module.exports = { userRoutes }