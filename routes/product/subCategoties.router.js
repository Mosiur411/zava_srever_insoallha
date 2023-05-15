const { Router } = require('express')
const { addSubCategoties, getSubCategoties, deleteSubCategoties } = require('../../controller/product/subCategoties.controller')
const subCategoriesRoutes = Router()
subCategoriesRoutes.post('/', addSubCategoties)
subCategoriesRoutes.get('/', getSubCategoties)
subCategoriesRoutes.delete('/', deleteSubCategoties)

module.exports = {
    subCategoriesRoutes
}