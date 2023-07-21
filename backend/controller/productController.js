const AsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');


const addProduct = AsyncHandler(async (req, res) => {
    const { name, price, category, description, color,image } = req.body;
    // find the category
        
        const product = await Product.create({
            name, price, category, description, color,image
        });
        res.status(200).json(product)
    
});

const getProducts = AsyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.json(products);
})



module.exports = {
    addProduct,
    getProducts
}