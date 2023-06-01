const { Router } = require('express')
const { addChildSubCategoties, getChildSubCategoties, deleteChildSubCategoties, updateChilSubCategoties } = require('../../controller/product/childSub.controller')
const childsubRoutes = Router()
childsubRoutes.post('/', addChildSubCategoties)
childsubRoutes.get('/', getChildSubCategoties)
childsubRoutes.put('/', updateChilSubCategoties)
childsubRoutes.delete('/', deleteChildSubCategoties)

module.exports = {
    childsubRoutes
}