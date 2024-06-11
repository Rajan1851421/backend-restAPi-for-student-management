const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    subject: String,
    email: String,
    phone: Number,
    gender: String
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);
