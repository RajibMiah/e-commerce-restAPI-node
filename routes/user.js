const User = require('../models/User')
const {  verifyTokenAndAuthorization , verifyTokenAndAdmin } = require('../utilities/verifyToken')

const router  = require('express').Router()

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
        await  user.findById(req.params.id)
        res.status(200).json("User has been deleted...")

    }catch(err){
        res.status(500).json(err)
    }
})

//get  user
router.get('/find/:id' , verifyTokenAndAdmin , async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc
        res.status(200).json({status:'Success'  , result : others})
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL USERS
router.get('/' , verifyTokenAndAdmin , async (req, res)=>{
    const query = req.params.new
    try{
        const users = query ? await User.find().sort({_id:-1}).limit(1) : await User.find()
        
        res.status(200).json({status:'Success'  , result : users})
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router