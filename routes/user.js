const router  = require('express').Router()

router.get('/', (req , res) =>{
    res.send('hellow world')
})

router.post('/' ,(req , res) =>{
    const username = req.body.username
    console.log('user name' , username)
})

module.exports = router