const mongoose = require('mongoose');


const invoiceSchema = mongoose.Schema({

    issueDate: {
        type: Date,
        required:true,
    },
    dueDate: {
        type: Date,
        required:true,
    },
    user: {
        type: String,
        required: true,
        ref:'User'
    },
    item: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    salesPerson: {
        type: String,
        required:true
    },
    message: {
        type: String,
        required:true
    },
    note: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Invoice', invoiceSchema);