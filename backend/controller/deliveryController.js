const AsyncHandler = require('express-async-handler');
const Delivery = require("../models/deliveryModel");

const getAllCodes = AsyncHandler(async(req,res) =>{
    const allCodes = await Delivery.find();
    res.status(200).json({allCodes});
})

module.exports ={
    getAllCodes,
}