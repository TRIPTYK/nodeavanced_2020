const express = require('express')
const router = express.Router();
const fs = require('fs').promises;
const moment = require('moment');
const pageController = require('./controllers/page')
//log management
router.use('*', async(req, res, next) => {
    console.log(`${req.method} ::: ${req.originalUrl}`)
    await fs.appendFile(`${process.cwd()}/private/logs.txt`, `${req.originalUrl} called with an action ${req.method} by ${req.ip} at ${moment().format()}\n`)
    next()
})
//static files
router.use(express.static('public'))
router.get('/',pageController.index)
router.get('/about',pageController.about)
router.get('/clients', pageController.clients)
router.post('/clients', pageController.clientscreate)


router.get('/clients/:id', pageController.getClient)
router.patch('/clients/:id', pageController.editClient)
router.delete('/clients/:id', pageController.deleteClient)


router.get('/client_form', pageController.clientform)
//error managememnt
router.use((req, res, next)=> {
    res.status(404).render(`pages/error`)
})

module.exports = router;