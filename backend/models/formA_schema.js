const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  coupleContribution: {
    type: Number,
    required: true
  },
  coupleMembers: {
    type: String,
    required: true
  },
  grandTotal: {
    type: Number,
    required: true
  },
  grossTotal: {
    type: Number,
    required: true
  },
  groupAddress: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: true
  },
  groupNumber: {
    type: String,
    required: true
  },
  gstAmount: {
    type: Number,
    required: true
  },
  lessPaid: {
    type: String,
    required: false
  },
  netPayable: {
    type: Number,
    required: true
  },
  presidentMobileNumber: {
    type: String,
    required: true,
    match: /^\d{10,12}$/ // Validates phone numbers between 10-12 digits
  },
  previousDues: {
    type: String,
    required: false
  },
  secretaryMobileNumber: {
    type: String,
    required: true,
    match: /^\d{10,12}$/
  },
  singleContribution: {
    type: Number,
    required: true
  },
  singleMembers: {
    type: String,
    required: true
  },
  treasurerMobileNumber: {
    type: String,
    required: true,
    match: /^\d{10,12}$/
  },
  submissionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contribution', contributionSchema);