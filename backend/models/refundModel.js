const mongoose = require('mongoose');
const refundScheme = new mongoose.Schema({
    bankAccountNumber:{
        type:'string',
        required: true
    },
    refundAmount:{
        type:'number',
        required:true
    },
    orderNumber:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: 'Order'
    }
})
module.exports = refundScheme;