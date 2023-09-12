const mongoose = require('mongoose');
const refundScheme = require('./refundModel');
const shippingSchema = require('./shippingModel');


const orderSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Product',
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Customer',
    },
    status: {
        type: String,
        required: true,
        default:'pending'
    },
    refundDetails:{
        type: [refundScheme],
        required:false
    },
    shippingDetails:{
        type: [shippingSchema],
        required:false
    },
    quantity: {
        type: Number,
        required: false,
        default:1
    }
})

module.exports = mongoose.model('Order', orderSchema);