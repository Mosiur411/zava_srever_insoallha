const { Router } = require('express')
const { addDevelopment, getDevelopment, deleteDevelopment } = require('../../controller/product/development.controller')
const developmentRoutes = Router()
developmentRoutes.get('/', getDevelopment)
developmentRoutes.post('/', addDevelopment)
developmentRoutes.delete('/', deleteDevelopment)

module.exports = {
    developmentRoutes
}
