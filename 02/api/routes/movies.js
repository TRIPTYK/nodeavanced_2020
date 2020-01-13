const express = require('express');
const Router = express.Router();
const MoviesController = require('../controllers/movies')

Router
    .route('/')
        .get(MoviesController.index);


module.exports = Router;