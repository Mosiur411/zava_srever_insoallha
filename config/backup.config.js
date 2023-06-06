const { Router } = require('express')
const backupRoutes = Router()
backupRoutes.get('/', (req, res) => {
    res.json({ message: 'Backup successful', backupFolder });

});


module.exports = {
    backupRoutes
}