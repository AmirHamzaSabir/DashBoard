const mongoose = require('mongoose');
const refundScheme = mongoose.Schema({
    bankReferenceNumber:{
        type:'string',
        required: true
    },
    refundAmount:{
        type:'number',
        required:true
    },
    referenceNumber:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: 'Order'
    }
})
module.exports = mongoose.model("Refund",refundScheme);