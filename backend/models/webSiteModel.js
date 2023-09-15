const mongoose = require('mongoose');
const siteFeatureSchema = mongoose.Schema({
    banner :{
        type:String,
        required:false,
    },
    popUp:{
        type:String,
        required:false,
    },
});

module.exports = mongoose.model('WebSite',siteFeatureSchema);