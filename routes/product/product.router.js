const { Router } = require('express')
const { addProduct, getProduct, updateProduct, deleteProduct, addBulkProduct } = require('../../controller/product/product.controller')
const { addPurchases, addProductPurchases } = require('../../controller/product/purchases.controller')
const productRoutes = Router()
productRoutes.post('/', addProduct)
productRoutes.post('/bulk', addBulkProduct)
productRoutes.get('/', getProduct)
productRoutes.put('/', updateProduct)
productRoutes.delete('/', deleteProduct)
/* ========================== porduct purchase  ========================== */
productRoutes.post('/purchases', addPurchases)
productRoutes.get('/purchases', addProductPurchases)


module.exports = {
    productRoutes
}