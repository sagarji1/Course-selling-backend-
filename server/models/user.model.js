const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    role: { type: String, default: "user" },
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "course" }]
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
