const Movie = require('../models/movie')
exports.search = async (req, res, next) => {
    let { q } = req.query
    try {
        let movies = await Movie.find({
            $text: {
                $search: q,
                $caseSensitive: false
            }
        }, { 'fields.title': 1, 'fields.plot': 1 })
        if (movies.length === 0)
            movies = await Movie.find({
                'fields.title': { $regex: q, $options: 'i' }
            })
        if (movies.length === 0) res.status(404).json({ error: { message: 'NOthing found' } })
        res.status(200).json(movies)
    } catch (e) { console.log(e) }

    return res.status(200).send('search launched on term ' + q)
}