const mongoose = require('mongoose');

const adminuserSchema= new mongoose.Schema({

    username:String,

    password:String
});

module.exports = mongoose.model("adminuser",adminuserSchema); 