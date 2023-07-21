const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Product',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User',
    },
    status: {
        type: String,
        required: true,
        default:'Pending'
    }
})

module.exports = mongoose.model('Order', orderSchema);