const express = require('express')
const app = express();
const router = require('./router')
require('dotenv').config({path:'./production.env'});
const hbs = require('express-hbs');
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
//mongo db management
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_HOST,{useNewUrlParser: true },()=>{
    console.log('Mongodb server is running and ready to be called')
})

app.engine('hbs',hbs.express4({
    partialsDir: `${process.cwd()}/views/partials`,
    defaultLayout:`${process.cwd()}/views/layouts/default.hbs`
}))
app.set('view engine', 'hbs');
app.set('views',`${process.cwd()}/views`);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',router)


app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})