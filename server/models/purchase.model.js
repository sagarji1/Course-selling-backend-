const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const purchaseSchema = new Schema({
    userId: { type: objectId, ref: "user", required: true },
    courseId: { type: objectId, ref: "course", required: true },
}, { timestamps: true });

module.exports = mongoose.model('purchase', purchaseSchema);
