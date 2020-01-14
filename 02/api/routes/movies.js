const express = require('express');
const Router = express.Router();
const MoviesController = require('../controllers/movies')

Router
    .route('/')
        .get(MoviesController.index)
        .post(MoviesController.createMovie)

Router
    .route('/:id')
        .get(MoviesController.getById)
        .put(MoviesController.updateMovie)
        .patch(MoviesController.updateMovie)
        .delete(MoviesController.deleteMovie)



module.exports = Router;