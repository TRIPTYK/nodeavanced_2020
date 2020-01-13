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
            maxLength:64
        },
        title:{
            type:String,
            required:true
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
    id:String,
    type:String
})

module.exports = mongoose.model('Movie',movieSchema);