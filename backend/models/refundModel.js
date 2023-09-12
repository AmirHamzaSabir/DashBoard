const mongoose = require('mongoose');
const refundScheme = new mongoose.Schema({
    bankAccountNumber:{
        type:'string',
        required: false
    },
    refundAmount:{
        type:'number',
        required:false
    },
    orderNumber:{
        type:mongoose.Schema.ObjectId,
        required:false,
        ref: 'Order'
    }
})
module.exports = refundScheme;