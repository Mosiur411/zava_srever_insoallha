const { Router } = require('express')
const { getCategoties, addCategoties, deleteCategoties, updateCategoties } = require('../../controller/product/categoties.controller')
const categoriesRoutes = Router()
categoriesRoutes.get('/',getCategoties)
categoriesRoutes.post('/',addCategoties)
categoriesRoutes.put('/', updateCategoties)
categoriesRoutes.delete('/',deleteCategoties)

module.exports = {
    categoriesRoutes
}