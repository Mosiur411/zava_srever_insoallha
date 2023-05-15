const fs = require("fs")
const csv = require("csvtojson")
const errorMessageFormatter = (err) => {
    return { code: err.code, error: err.message }
}
const getRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const getDataFromCsv = async (locaFilePath, user) => {
    const productsFromCSV = await csv().preFileLine((fileLineString, lineIdx) => {
        if (lineIdx === 0) {
            fileLineString = `${fileLineString},user`
        } else {
            fileLineString = `${fileLineString},${user}`
        }
        return fileLineString
    }).fromFile(locaFilePath)

    fs.unlinkSync(locaFilePath)

    return productsFromCSV
}

module.exports = {
    getRandomString,
    getDataFromCsv,
    errorMessageFormatter
}