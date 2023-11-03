const mongoose = require('mongoose');
const footerScheme = mongoose.Schema({
    image:{
        type:String,
        required:false,
    },
    address :{
        type:String,
        required:true,
    },
    mobileNumber :{
        type:String,
        required:true,
    },
    email :{
        type:String,
        required:true,
    },
    status: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("footer", footerScheme)