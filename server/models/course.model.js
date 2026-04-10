const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    createrId: { type: Schema.Types.ObjectId, ref: "admin", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "admin" }
}, { timestamps: true });

module.exports = mongoose.model('course', courseSchema);
