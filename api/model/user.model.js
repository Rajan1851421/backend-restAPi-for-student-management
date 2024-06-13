const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password:String,
    phone: Number,
    email:String,
    userType:String
    
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
