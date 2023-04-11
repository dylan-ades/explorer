const mongoose = require("mongoose")
const Schema = mongoose.Schema

const entrySchema = new Schema({
    country: String,
    city: String,
    image: String,
    imageYours: Boolean,
    visited: Boolean,
}, {
    timestamps: true
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry