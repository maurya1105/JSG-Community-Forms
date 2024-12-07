const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupNo: { type: Number, required: true, unique: true },
  groupName: { type: String, required: true },
  region: { type: String, required: true },
});

module.exports = mongoose.model("Group", groupSchema);
