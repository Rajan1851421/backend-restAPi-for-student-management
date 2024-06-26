const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: { type: String, unique: true },
    phone: Number,
    gender: String
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
