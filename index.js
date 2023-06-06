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
const { backupRoutes } = require('./config/backup.config')
const { exec } = require('child_process');
const { dashboardRoutes } = require('./routes/dashboard.routes')

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
/* route    childSubCategories */
app.use('/', userRoutes)
app.use('/development', Auth_Rqeuired, developmentRoutes)
app.use('/categories', Auth_Rqeuired, categoriesRoutes)
app.use('/subCategories', Auth_Rqeuired, subCategoriesRoutes)
app.use('/childSubCategories', Auth_Rqeuired, childsubRoutes)
app.use('/product', Auth_Rqeuired, productRoutes)

/* ============= dashboard =============*/
app.use('/dashboard', Auth_Rqeuired, dashboardRoutes)


const backupDirectory = '/path/to/backup/directory';
/* Database backup  */
/* app.use('/backup', backupRoutes) */
// app.get('/download', (req, res) => {
//     const backupFileName = 'backup_file_name'; 
//     const backupFilePath = `${backupDirectory}/${backupFileName}`;

//     exec(`mongodump --out ${backupDirectory}`, (error) => {
//       if (error) {
//         return res.status(500).json({ error: 'Backup failed.' });
//       }

//       res.download(backupFilePath, backupFileName, (downloadError) => {
//         if (downloadError) {
//           console.error('Download failed:', downloadError);
//           return res.status(500).json({ error: 'Download failed.' });
//         }
//       });
//     });
//   });



// database
const mongodb_uri = process.env.PROD_DB;
connectDatabase(mongodb_uri)
initializeFirebase()

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})