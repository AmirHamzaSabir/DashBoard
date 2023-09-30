const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    serialNumber : {
        type: Number,
        required: true
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    status:{
        type: String,
        require:false,
    },
    priority:{
        type:String,
        default: "moderate"
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },
    updatedAt : {
        type: Date,
        required:false,
    },
    closedAt : {
        type: Date,
        required:false,
    },
    employeeId: {
        type:mongoose.Schema.Types.ObjectId,
        required: false,
    },
    remarks:{
        type:String,
        required: false,
    }
});

module.exports = mongoose.model('Ticket',ticketSchema);