const mongoose = require("mongoose")
const Schema = mongoose.Schema

const entrySchema = new Schema({
    country: String,
    city: String,
    region: String,
    images: Array,
    imageYours: Boolean,
    visited: Boolean,
}, {
    timestamps: true
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry