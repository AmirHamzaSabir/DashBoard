const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
    columnName: {
      type: String,
      required: false,
    },
    columnValue: {
      type: String,
      required: false,
    },
  })

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
        type: [String],
        required:[true,'Please enter this field']
    },
    status:{
        type:Boolean,
        default:true
    }, 
    image:{
        type: String,
        required:[true,'Please enter this field']
    },
    attribute:{
        type: [attributeSchema],
        required:false
    },
    quantity:{
        type: Number,
        default:1
    }
})

module.exports = mongoose.model('Product',productSchema)