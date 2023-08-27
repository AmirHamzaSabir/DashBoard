const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    serialNumber :{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:false,
    },
    fullName:{
        type:String,
        required:false,
    },
    mobileNumber:{
        type:String,
        required:false,
    },
    description:{
        type:String,
        required:false,
    },
    status:{
        type:Boolean,
        require:false,

    },
    priority:{
        type:String,
        required:false,
    },
    isApproved:{
        type:Boolean,
        required:false,
    }
});

module.exports = mongoose.model('SiteFeature',ticketSchema);