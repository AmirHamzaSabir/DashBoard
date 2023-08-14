const mongoose = require('mongoose');
const paymentGateWaySchema = mongoose.Schema({
    name :{
        type:String,
        required:false,
    },
    status:{
        type:String,
        required:false,
    },
});

module.exports = mongoose.model('PaymentGateWay',paymentGateWaySchema);