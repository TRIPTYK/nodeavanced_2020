const express = require('express')
const app = express();
const router = require('./router')
require('dotenv').config({path:'./production.env'});

app.use('/',router)

app.listen(process.env.PORT, () => {
    console.log(`App listineng on port ${process.env.PORT}`)
})