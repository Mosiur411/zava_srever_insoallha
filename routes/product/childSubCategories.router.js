const { Router } = require('express')
const { addChildSubCategoties, getChildSubCategoties, deleteChildSubCategoties } = require('../../controller/product/childSub.controller')
const childsubRoutes = Router()
childsubRoutes.post('/', addChildSubCategoties)
childsubRoutes.get('/', getChildSubCategoties)
childsubRoutes.delete('/', deleteChildSubCategoties)

module.exports = {
    childsubRoutes
}