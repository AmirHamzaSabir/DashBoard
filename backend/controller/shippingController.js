const AsyncHandler = require('express-async-handler');
const Shipping = require('../models/shippingModel');


const addShipping = AsyncHandler(async (req, res) => {
    const { name, awb, address } = req.body;
    // find the category
        
        const product = await Shipping.create({
            name, awb, address
        });
        res.status(200).json(product)
    
});

const getShipping = AsyncHandler(async(req,res)=>{
    const products = await Shipping.find();
    res.json(products);
})

module.exports = {
    addShipping,
    getShipping
}