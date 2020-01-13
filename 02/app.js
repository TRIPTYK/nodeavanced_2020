const express = require('express');
const MoviesRouter = require('./api/routes/movies')
const app = express();

//
app.use('/movies', MoviesRouter)
module.exports = app;