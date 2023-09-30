const mongoose = require('mongoose');
const popUpScheme = mongoose.Schema({
    title :{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    days:{
        type: Number,
        required:true,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },
    image:{
        type:String,
        required:true,
    }
})
module.exports = mongoose.model("popup", popUpScheme)