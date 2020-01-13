const Movie = require('../models/movie');

/**
 * Display list of movies
 * 
 * @param {*} req
 * @param {*} res
 */
exports.index = async(req,res)=>{
    let movies = await Movie.find({}).limit(10)
    res.json(movies)
}