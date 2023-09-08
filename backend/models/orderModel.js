const mongoose = require('mongoose');
const refundScheme = require('./refundModel');
const shippingSchema = require('./shippingModel');


const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Product',
    },
    customer: {
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
        type: refundScheme,
        required:false
    },
    shippingDetails:{
        type: shippingSchema,
        required:false
    }
})

module.exports = mongoose.model('Order', orderSchema);