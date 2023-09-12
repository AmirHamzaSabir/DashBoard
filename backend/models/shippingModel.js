const mongoose = require('mongoose');
const shippingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[false,'Please enter this field'],
    },
    awb:{
        type:String,
        required:[false,'Please enter this field'],
    },
    address:{
        type:String,
        required:[false,'Please enter this field'],
    },
    
})

module.exports = shippingSchema;