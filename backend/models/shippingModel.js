const mongoose = require('mongoose');
const shippingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter this field'],
    },
    awb:{
        type:String,
        required:[true,'Please enter this field'],
    },
    address:{
        type:String,
        required:[true,'Please enter this field'],
    },
    
})

module.exports = shippingSchema;