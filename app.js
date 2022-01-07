const express = require('express')
const app = express()
const AddressRouter = require('./routes/shorts')
const connectToDb = require('./db/connect')
const PORT = process.env.PORT || 3000
require('dotenv').config()

//MIDDLEWARE
app.use('/', express.static('./public'))
app.use(express.json())
////////////

app.use('/', AddressRouter)


const start = async () => {
    try{
        await connectToDb(process.env.MONGOOSE_URI)
        app.listen(PORT, () => console.log(`Listening at ${PORT}`))
    }catch(error){
        console.log(error)
    }    
}

start()
