const express = require('express');
const MoviesRouter = require('./api/routes/movies')
const SearchRouter = require('./api/routes/search')
const bodyParser = require('body-parser')

const app = express();

//GLOBAL MIDDLEWARES
app.use(bodyParser.json())


// SPECIFIC ROUTES
app.use('/search',SearchRouter)
app.use('/movies', MoviesRouter)
module.exports = app;