const { Router } = require('express')
const { getCategoties, addCategoties, deleteCategoties } = require('../../controller/product/categoties.controller')
const categoriesRoutes = Router()
categoriesRoutes.get('/',getCategoties)
categoriesRoutes.post('/',addCategoties)
categoriesRoutes.delete('/',deleteCategoties)

module.exports = {
    categoriesRoutes
}