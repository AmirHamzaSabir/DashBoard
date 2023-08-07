const mongoose = require('mongoose');
const deliveryModel = mongoose.Schema({
    countryCode:{
        type:String,
        required: true,
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
        required: true,
    }

});
module.exports = mongoose.model("Delivery",deliveryModel);