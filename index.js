const express = require('express')
const cors = require('cors')
const { connectDatabase } = require('./config/bd.config')
const { Auth_Rqeuired } = require('./middleware/auth.middleware')
const { initializeFirebase } = require('./config/firebase.config')
const { userRoutes } = require('./routes/user.routes')
const { developmentRoutes } = require('./routes/product/development.routes')
const { categoriesRoutes } = require('./routes/product/categories.routes')
const { subCategoriesRoutes } = require('./routes/product/subCategoties.router')
const { childsubRoutes } = require('./routes/product/childSubCategories.router')
const { productRoutes } = require('./routes/product/product.router')

require('dotenv').config()
const app = express()
/* server site port  
*/
const port = process.env.PORT || 5001
// middlewares 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// database
const mongodb_uri = process.env.PROD_DB;
connectDatabase(mongodb_uri)
initializeFirebase()

app.listen(port,"0.0.0.0", () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})