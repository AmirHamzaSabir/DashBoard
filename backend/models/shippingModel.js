const mongoose = require('mongoose');
const shippingSchema = mongoose.Schema({
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

module.exports = mongoose.model('Shipping',shippingSchema)