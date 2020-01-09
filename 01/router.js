const express = require('express')
const router = express.Router();
const fs = require('fs').promises;
const moment = require('moment');
const pageController = require('./controllers/page')
// router.use('*', async(req, res, next) => {
//     console.log(`${req.method} ::: ${req.originalUrl}`)
//     await fs.appendFile(`${process.cwd()}/private/logs.txt`, `${req.originalUrl} called with an action ${req.method} by ${req.ip} at ${moment().format()}\n`)
//     next()

// })
//static files
router.use(express.static('public'))
router.get('/',pageController.index)
router.get('/about',pageController.about)
// router.get('/users/:id', pageController.users)
//error managememnt
router.use('*',(err,req,res,next)=>{
    console.log('ok')
    console.log(err.stack);
    res.status(500).sendFile(`${process.cwd()}/views/error.html`)
})

module.exports = router;