const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    price: {
        type: String, 
        required: true
    },
    // image: {
    //     data:Buffer,
    //     contentType: String,
    //     required: true
    // }
}, { timestamps: true })

const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop