// groupFinancial.model.js
const mongoose = require("mongoose");

const financialSchema = new mongoose.Schema({
  groupNo: {
    type: Number,
  },
  groupName: String,
  previousDues: {
    type: Number,
    default: 0,
  },
  lessPaid: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Financial", financialSchema);
