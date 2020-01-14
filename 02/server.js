const [major] = process.versions.node.split('.').map(parseFloat)
if(major < 10){
    console.log('Ta version de node est trop faible il faut mettre le serveur a jour.')
}
//config values
const dotEnv = require('dotenv')
dotEnv.config({path: './development.env'})

//mongo db management
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.set('debug',true)
mongoose.connect(process.env.DB_HOST,{useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>{
    console.log('Mongodb server is running and ready to be called')
    initApp()
})
.catch(e=>{
    console.log(e)
})
const initApp=()=>{
    const app = require('./app')
    app.listen(process.env.PORT,()=>{
        console.log(`Express app is running at port : ${process.env.PORT}`)
    })
    
}
