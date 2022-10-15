const {  verifyTokenAndAdmin } = require('../utilities/verifyToken')
const Product = require('../models/Product')
const router = require('express').Router()

router.post('/' , verifyTokenAndAdmin , async (req, res) =>{
    const newProduct = new Product(req.body)
    try{
        const data = await newProduct.save()
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router