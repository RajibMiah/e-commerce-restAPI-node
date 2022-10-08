const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const app = express()
dotenv.config()

const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('db connection successfull')
})
.catch((err)=>{
    console.log(err)
})
app.use(express.json())
app.use('/api/auth' , authRoute)
app.use('/api/users' , userRoute)


app.listen(port , ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})