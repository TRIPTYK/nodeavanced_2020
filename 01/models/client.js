const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    firstname: String,
    lastname:String
})
module.exports = mongoose.model('Client',schema)