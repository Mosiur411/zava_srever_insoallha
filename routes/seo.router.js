const { Router } = require('express')
const { updateSeo, getSeo } = require('../controller/seo.controller')
const seoRoutes = Router()
seoRoutes.get('/', getSeo)
seoRoutes.put('/', updateSeo)
module.exports = { seoRoutes }