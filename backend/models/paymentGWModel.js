const mongoose = require('mongoose');
const paymentGateWaySchema = mongoose.Schema({
    name :{
        type:String,
        required:false,
    },
    customaizableOptions:{
        type:[String]
    },
    status:{
        type:Boolean,
        required:false,
    },
    dynamicQR:{
        status:Boolean,
    },
    superAdminId:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true
    }
});

module.exports = mongoose.model('PaymentGateWay',paymentGateWaySchema);