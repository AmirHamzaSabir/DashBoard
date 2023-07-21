const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter this field'],
    },
    price:{
        type:Number,
        required:[true,'Please enter this field'],
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'Please enter this field'],
        ref:'Category'
    },
    description: {
        type: String,
        required: [true,'Please enter this field']
    },
    color:{
        type: String,
        required:[true,'Please enter this field']
    },
    image:{
        type: String,
        required:[true,'Please enter this field']
    }
})

module.exports = mongoose.model('Product',productSchema)