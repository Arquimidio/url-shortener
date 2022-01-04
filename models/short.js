const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    hash: String,
    url: String
})

module.exports = mongoose.model('Address', addressSchema)