import express from 'express'



const app = express()
const port = process.env.Port || 3000

app.get('/', (req , res) =>{
    res.send('hellow world')
})

app.listen(port , ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})