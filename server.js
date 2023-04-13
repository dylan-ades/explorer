const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
require('dotenv').config()
const app = express()
const PORT  = (process.env.PORT)

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
//Middlewares
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// controllers
const entriesController  =require('./controllers/entries')
const photosController  =require('./controllers/photos')
app.use('/entries', entriesController)
app.use('/photos', photosController)

// const articlesController = require('./controllers/articles.js');
// app.use('/articles', articlesController)
// INDUCES

// I 
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})