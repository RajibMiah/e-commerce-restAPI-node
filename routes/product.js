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

router.put('/:id' , verifyTokenAndAdmin , async (req , res) =>{
    
    try{
        const updatedProduct = await Product.findByIdAndUpdate( req.params.id ,{
            $set:req.body
        },
        {
            new:true.valueOf,
        })
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json(err.message)
    }
})

// DELETE PRODUCT

router.delete('/:id' , verifyTokenAndAdmin , async (req, res) =>{

    try{
        await  Product.findOneAndDelete(req.params.id)
        res.status(200).json("Product has been deleted...")

    }catch(err){
        res.status(500).json(err.message)
    }
})


// GET PRODUCT
router.get('/find/:id' , verifyTokenAndAdmin , async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)

        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err.message)
    }
})

//GET ALL PRODUCT
router.get('/' , verifyTokenAndAdmin , async (req, res)=>{
    const qNew = req.params.new
    const qCategory = req.query.Category
    try{
        let products = []
        if(qNew){
            products = await  Product.find().sort({createdAt: -1}).limit(5)
        }else if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory]
                }
            })
        }else{
            products = await Product.find()
        }
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err.message)
    }
})


module.exports = router