const AsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');


const addProduct = AsyncHandler(async (req, res) => {
    const { name, price, category, description, color,image } = req.body;  
        const product = await Product.create({
            name, price, category, description, color,image
        });
        res.status(200).json(product)
    
});

const getProducts = AsyncHandler(async(req,res)=>{
    const products = await Product.find();
    res.json(products);
});

const getProduct = AsyncHandler(async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json(product);
})

const updateProduct = AsyncHandler(async(req,res)=>{
    const user = req.user;
    var response = null;
 if(user.role === 2 || user.role === 1){
    const data = await Product.findById(req.params.id);
    if (data) {
      response = await await Product.findOneAndUpdate(
        { _id: `${req.params.id}` },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(response);
    }else{
        res.status(404);
        throw new Error("Not Found");
      }
 }
 else{
    res.status(401);
    throw new Error("You are not authorized");
 }
})
const removeProduct = AsyncHandler(async(req,res) =>{
    const id = req.params.id;
    const deletedProduct = await Product.deleteOne({ _id: id });
    res.status(200).json(deletedProduct);
});
module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    removeProduct
}