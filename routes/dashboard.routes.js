const { Router } = require('express')
const { getRrecord } = require('../controller/dashboard.controller')
const dashboardRoutes = Router()
dashboardRoutes.get('/', getRrecord)

module.exports = { dashboardRoutes }