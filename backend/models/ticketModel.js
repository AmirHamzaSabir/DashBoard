const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema({
    name :{
        type:String,
        required:false,
    },
    status:{
        type:String,
        required:false,
    },
});

module.exports = mongoose.model('SiteFeature',ticketSchema);