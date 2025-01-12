const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    image : String,
}, {timestamps : true});

module.exports = mongoose.model("Banner", bannerSchema);