const mongoose = require('mongoose');
const deliveryModel = mongoose.Schema({
    pinCode:{
        type:String,
        required: true,
        unique:true
    },
    district : {
        type : String,
        required: true,
        unique:true
    },
    countryName:{
        type:String,
        required: true,
    },
    status:{
        type:Boolean,
        default:true,
    },
    codFee:{
        type:String,
        required: false,
    }

});
module.exports = mongoose.model("Delivery",deliveryModel);