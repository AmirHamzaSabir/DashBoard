const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    category: {
        type: String, 
        required:[true,'This field is required'],
        unique:[true,'This category is already present']
    },
    status:{
        type:Boolean,
        default:true
    }
}, {
    timestamps:true
})

module.exports = mongoose.model('Category', categorySchema);