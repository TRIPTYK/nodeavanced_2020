const express = require('express');
const Router = express.Router();
const SearchController = require('../controllers/search')

Router
    .route('/')
        .get(SearchController.search)        
module.exports=Router;
