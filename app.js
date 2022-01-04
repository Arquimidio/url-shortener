const express = require('express')
const app = express()
const AddressRouter = require('./routes/shorts')
const connectToDb = require('./db/connect')
require('dotenv').config()

//MIDDLEWARE
app.use('/', express.static('./public'))
app.use(express.json())
////////////

app.use('/', AddressRouter)


const start = async () => {
    try{
        await connectToDb(process.env.MONGOOSE_URI)
        app.listen(3000, () => console.log('Listening at PORT 3000'))
    }catch(error){
        console.log(error)
    }    
}

start()
