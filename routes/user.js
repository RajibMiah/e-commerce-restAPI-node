const User = require('../models/User')
const {  verifyTokenAndAuthorization } = require('./verifyToken')

const router  = require('express').Router()

router.get('/', (req , res) =>{
    res.send('hellow world')
})

router.post('/' ,(req , res) =>{
    const username = req.body.username
    console.log('user name' , username)
})

//update
router.put('/:id' , verifyTokenAndAuthorization , async(req , res) =>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt( req.body.password, process.env.PASSWROD_SECRET).toString()
    }

    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id , {
            $set:req.body,
        }  ,{new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(500).json(err)
    }
})

// delete user

router.delete('/:id' , verifyTokenAndAuthorization , async (req, res) =>{

    try{
        await  user.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router