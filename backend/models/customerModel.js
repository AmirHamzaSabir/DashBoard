const mongoose = require('mongoose');
const customerScheme = mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"]
    },
    password:{
        type: String,
        required: [true, 'Please enter the password field'],

    },
    contactNumber:{
        type:Number,
        required:[true,"Number is required"],

    },
    status:{
        type:Boolean,
        default:true
    }, 
});
module.exports = mongoose.model("Customer",customerScheme);