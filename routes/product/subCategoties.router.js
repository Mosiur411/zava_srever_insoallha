const { Router } = require('express')
const { addSubCategoties, getSubCategoties, deleteSubCategoties, updateSubCategoties } = require('../../controller/product/subCategoties.controller')
const subCategoriesRoutes = Router()
subCategoriesRoutes.post('/', addSubCategoties)
subCategoriesRoutes.get('/', getSubCategoties)
subCategoriesRoutes.put('/', updateSubCategoties)
subCategoriesRoutes.delete('/', deleteSubCategoties)

module.exports = {
    subCategoriesRoutes
}