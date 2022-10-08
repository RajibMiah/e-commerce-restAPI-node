const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
var jwt = require('jsonwebtoken');
router.post('/register' , async(req , res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt( req.body.password, process.env.PASSWROD_SECRET).toString()
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
        const oldPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWROD_SECRET).toString(CryptoJS.enc.Utf8);
        oldPassword != req.body.password && res.status(401).json("Wrong is incorrect")

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
          }, process.env.JWT_SCRET_KEY, { expiresIn: '1h' });

        const {password , ...others} = user._doc;
        res.status(200).json({'success' : true, 'result': others , 'accessToken' :accessToken})
    
    }catch(err){
        res.status(500).json("Error occured",err)
    }
})
module.exports = router