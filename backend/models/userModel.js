const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name field'],
        minlength: [3, 'Name should be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please enter the email field'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Please enter the password field'],
    },
    m_number: {
        type: String,
        required: false,
        default:'No Mobile Number Available'
    },
    role: {
        type: Number,
        default: 0
    },
    status:{
        type:Boolean,
        default:true
    }, 
    resetToken: {
        default:null,
        type:String,
    },
    resetTokenExpiration:{
        default:null,
        type:Date
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('User', userSchema);
