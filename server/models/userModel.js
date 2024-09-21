const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    profilepic:{
        type:String,
    },
    
    
});

module.exports = mongoose.model("User", userSchema);
