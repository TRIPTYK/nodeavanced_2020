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

const getSort = (sortString)=>{
    try {
        let sorts = sortString.split(',')
        if(sorts[1] !== 'asc' && sorts[1] !== 'desc') sorts[1]='asc'
        let sort = {}
        sort[sorts[0]]=sorts[1]
        return sort
    } catch (e) {
        return {}
    }
}

const getLinks = (limite,page,total,sort,fields)=>{
    let lastPage = total/limite;
    let self= `http://localhost:${process.env.PORT}/movies?page=${page}&sorts=${sort},&fields=${fields}`;
    let prev= `http://localhost:${process.env.PORT}/movies?page=${page-1}&sorts=${sort},&fields=${fields}`;
    let next= `http://localhost:${process.env.PORT}/movies?page=${page+1}&sorts=${sort},&fields=${fields}`;
    let last= `http://localhost:${process.env.PORT}/movies?page=${lastPage}&sorts=${sort},&fields=${fields}`;
    let po =  {
        self,
        prev,
        next,
        last
    }
    if(page<=1) delete po.prev;
    if(page>=lastPage) delete po.next;
    return po;
}
exports.index = async (req, res) => {
    let limite = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) - 1 || 0;
    let projection = getFieldsProjection(req.query.fields) || {};
    let sort = getSort(req.query.sorts) || {}
    let query =  Movie.find({}, projection)
    let total = await Movie.estimatedDocumentCount()
    let movies = await query.sort(sort).skip(limite * page).limit(limite).exec()
    let links = getLinks(limite,page+1,total,req.query.sorts,req.query.fields)
    res.json({links,data :{movies}})
}