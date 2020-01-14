const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let movieSchema = new Schema({
    fields:{
        directors:[String],
        release_date : String,
        rating:{
            type:Number,
            min:0,
            max:10
        },
        genres :[String],
        image_url: {
            type:String,
            match: /.jpg|.png|.gif$/i
        },
        plot:{
            type:String,
            minLength:0,
            maxLength:64,
            index:'text'
        },
        title:{
            type:String,
            index:'text'
        },
        rank:{
            type:Number
        },
        running_time_secs:Number,
        actors:[String],
        year:Number,
        production: {
            company:String,
            director:String
        }
    },
    id:{
        type:String
    },
    type:String
})
let model =  mongoose.model('Movie',movieSchema);
model.ensureIndexes()
module.exports = model;