const Movie = require('../models/movie');

const getFieldsProjection = (fieldsString) => {
    try {
        let fields = fieldsString.split(',')
        return fields.reduce((current, next) => {
            current[next] = 1;
            return current
        }, {})
    } catch (e) {
        return {}
    }
}
const getSort = (sortString) => {
    try {
        let sorts = sortString.split(',')
        if (sorts[1] !== 'asc' && sorts[1] !== 'desc') sorts[1] = 'asc'
        let sort = {}
        sort[sorts[0]] = sorts[1]
        return sort
    } catch (e) {
        return {}
    }
}

const getLinks = (limite, page, total, sort, fields) => {
    let lastPage = Math.floor(Math.round(total / limite));
    if (sort === undefined) sort = '';
    if (fields === undefined) fields = '';
    let self = `http://localhost:${process.env.PORT}/movies?page=${page}&sorts=${sort},&fields=${fields}`;
    let prev = `http://localhost:${process.env.PORT}/movies?page=${page - 1}&sorts=${sort},&fields=${fields}`;
    let next = `http://localhost:${process.env.PORT}/movies?page=${page + 1}&sorts=${sort},&fields=${fields}`;
    let last = `http://localhost:${process.env.PORT}/movies?page=${lastPage}&sorts=${sort},&fields=${fields}`;
    let po = {
        self,
        prev,
        next,
        last
    }
    if (page <= 1) delete po.prev;
    if (page >= lastPage) delete po.next;
    return po;
}
exports.index = async (req, res) => {
    let limite = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) - 1 || 0;
    let projection = getFieldsProjection(req.query.fields) || {};
    let sort = getSort(req.query.sorts) || {}
    let query = Movie.find({}, projection)
    let total = await Movie.estimatedDocumentCount()
    let movies = await query.sort(sort).skip(limite * page).limit(limite).exec()
    let links = getLinks(limite, page + 1, total, req.query.sorts, req.query.fields)
    res.json({ links, data: { movies } })
}
exports.getById = async (req, res) => {
    try {
        let projection = getFieldsProjection(req.query.fields) || {};
        let { id } = req.params
        let query = Movie.findById(id, projection)
        let movie = await query.exec()
        if (!movie) res.status(404).json({ error: { message: `No users at the id :${id}` } })
        res.json({ data: { movies: [movie] } })
    } catch (e) {
        res.status(500).json({ error: { message: `These was a internal error` } })
    }
}
exports.createMovie = async (req, res) => {
    try {
        let movie = await Movie.create(req.body)
        res.status(201).json(movie)
    } catch (e) {
        res.status(500).json({ error: { message: e.message } })
    }
}
exports.updateMovie = async (req, res) => {
    let { id } = req.params;
    try {
        let movie = await Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
        res.status(200).json(movie)

    } catch (e) {
        res.status(500).json({ error: { message: e.message } })
    }
}
exports.deleteMovie = async (req, res) => {
    let { id } = req.params;
    try {
        await Movie.findByIdAndDelete(id);
        res.status(204).send();

    } catch (e) {
        res.status(500).json({ error: { message: e.message } })
    }
}
const { body, validationResult } = require('express-validator')
exports.validationRules = () => {
    return [
        body('fields.title','le titre doit etre rempli').notEmpty(),
        body('fields.year','l\'année doit etre rempli').notEmpty()
    ]
}
exports.validate = async (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}
