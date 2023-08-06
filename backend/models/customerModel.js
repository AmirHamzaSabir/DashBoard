const mongoose = require('moongose');
const customerScheme = mongoose.Scheme({
    name :{
        type:string,
        required:true
    },
    address:{
        type:string,
        required:true,
    },
    email:{
        type:Email,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"]
    },
    contactNumber:{
        type:Number,
        required:[true,"Number is required"],

    },
    active:{
        type:boolean,
        default:false
    }, 
});
module.exports = mongoose.model("Customer",customerScheme);