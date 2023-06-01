const { Router } = require('express')
const { addDevelopment, getDevelopment, deleteDevelopment, updateDepartment } = require('../../controller/product/development.controller')
const developmentRoutes = Router()
developmentRoutes.get('/', getDevelopment)
developmentRoutes.post('/', addDevelopment)
developmentRoutes.put('/', updateDepartment)
developmentRoutes.delete('/', deleteDevelopment)

module.exports = {
    developmentRoutes
}
