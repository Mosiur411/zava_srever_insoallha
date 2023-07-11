const UserRegisterType = new Set(['admin','wholesale','retailer','customer','employee'])
const AllowedFileTypes = new Set(['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'])
const maxFileSize = 50 * 1024 * 1024

const Roles = {
    ADMIN: 'admin'
}
module.exports = { AllowedFileTypes, Roles,UserRegisterType,maxFileSize}