const mongoose = require('mongoose');
const headerScheme = mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    status: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("header", headerScheme)