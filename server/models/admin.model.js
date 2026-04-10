const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('admin', adminSchema);
