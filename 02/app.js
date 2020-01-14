const express = require('express');
const MoviesRouter = require('./api/routes/movies')
const bodyParser = require('body-parser')

const app = express();

//
app.use(bodyParser.json())
//
app.use('/movies', MoviesRouter)
module.exports = app;