const router = require('express').Router()
const User = require('../models/User')

router.post('/register' , async(req , res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    }catch(err){
        res.status(500).json(err)
    }
} )

router.post('/login' , async (req, res) =>{
    try{
        const user = await User.findOne({username: req.body.username})
        !user && res.status(401).json('Wrong credentials! ')
        /*
            TODO::GET JWT TOKEN FROM PASSWORD 
        */
        const {password , ...others} = user._doc
        res.status(200).json(others)
    
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router