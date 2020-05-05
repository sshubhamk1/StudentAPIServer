const mongoose = require('mongoose');

let studentScheme = new mongoose.Schema({
    name : String,
    class : String,
    roll_num : Number,
    reg_num : Number,
    mob_num : Number,
    address: String
});

module.exports = mongoose.model('Employee', studentScheme);