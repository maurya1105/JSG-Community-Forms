// models/Forum.js
const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
    // Basic Forum Info
    forumName: String,
    groupNo: String,
    region: String,
    sponsoringGroup: String,
    address: String,
    pinCode: String,
    phone: String,
    mobile: String,
    email: String,
    stdCode: String,
    dateOfCharter: String,
    dateOfInaugration: String,
    electedBearers: Date,
    generalMeet: Date,

    // President Details
    president: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Vice President Details
    vicePresident: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Secretary Details
    secretary: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Joint Secretary Details
    jointSecretary: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Treasurer Details
    treasurer: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Founder President Details
    founderPresident: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Immediate Former President Details
    immediateFormerPresident: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Nominated Former Presidents

    //Nominated Former Presdent 1
    nominatedFormerPresident1: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    //Nominated Former Presdent 2
    nominatedFormerPresident2: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    //Nominated Former Presdent 3
    nominatedFormerPresident3: {
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        whatsapp: String,
        email: String,
        occupation: String,
        birthDate: Date,
        marriageDate: Date,
        spouseName: String,
        spouseBirthDate: Date,
        photo: String
    },

    // Committee Members (Array of 8)
    committeeMembers: [{
        name: String,
        membershipNo: String,
        address: String,
        pinCode: String,
        phone: String,
        mobile: String,
        email: String
    }]
});

module.exports = mongoose.model('Forum', forumSchema);