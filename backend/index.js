const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');

const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Configure multer for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure R2 client
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  }
});

// Helper function to upload file to R2
async function uploadToR2(file, groupNo, email, fileName) {
  const generateFileName = `${groupNo}-${email}/${fileName}-${crypto.randomBytes(8).toString('hex')}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET,
    Key: generateFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);
  return `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${generateFileName}`;
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Import models
const Contribution = require('./models/formA_schema'); // Import the formA model
const Forum = require('./models/formB_schema'); // Import the formB model
const Group = require('./models/group_schema'); // Import the Group model

// GET endpoint for autocomplete suggestions
app.get('/api/suggestions', async (req, res) => {
  try {
    const { query, type, region } = req.query;

    // Validate input
    if (!query || !type) {
      return res.status(400).json({
        success: false,
        message: 'Query and type are required'
      });
    }

    // Create a case-insensitive regex search
    const searchRegex = new RegExp(query, 'i');

    let suggestions;
    // Different search logic based on type of suggestion
    switch (type) {
      case 'region':
        suggestions = await Group.find({ 
          region: searchRegex 
        }).select('region');
        break;
      
      case 'groupName':
        // If region is provided, filter by region as well
        const filter = region 
          ? { 
              groupName: searchRegex, 
              region: new RegExp(region, 'i') 
            }
          : { groupName: searchRegex };

        suggestions = await Group.find(filter)
          .select('groupName groupNo region')
          .limit(100);
        break;
      
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid suggestion type'
        });
    }

    // Remove duplicates while preserving order
    const uniqueSuggestions = Array.from(
      new Map(suggestions.map(item => 
        type === 'region' 
          ? [item.region, item]
          : [item.groupName, item]
      )).values()
    );

    res.status(200).json({
      success: true,
      count: uniqueSuggestions.length,
      data: uniqueSuggestions
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch suggestions',
      error: error.message
    });
  }
});

// Endpoint to fetch all groups (if needed)
app.get('/api/groups', async (req, res) => {
  try {
    const groups = await Group.find();  // Fetch all groups
    res.status(200).json({ success: true, data: groups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch groups', error: error.message });
  }
});

// GET endpoint to fetch group details by group number
app.get('/api/groups/:groupNo', async (req, res) => {
  try {
    const groupNo = parseInt(req.params.groupNo, 10);
    const group = await Group.findOne({ groupNo });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }

    res.status(200).json({
      success: true,
      data: group
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch group',
      error: error.message
    });
  }
});

// POST endpoint to save contribution data (Form A)
app.post('/api/contributions', async (req, res) => {
  try {
    const contribution = new Contribution(req.body);
    const savedContribution = await contribution.save();
    
    res.status(201).json({
      success: true,
      message: 'Contribution saved successfully',
      data: savedContribution
    });
  } catch (error) {
    console.error('Error saving contribution:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to save contribution',
      error: error.message
    });
  }
});

// GET endpoint to fetch all contributions (Form A)
app.get('/api/contributions', async (req, res) => {
  try {
    const contributions = await Contribution.find()
      .sort({ submissionDate: -1 });
    
    res.status(200).json({
      success: true,
      count: contributions.length,
      data: contributions
    });
  } catch (error) {
    console.error('Error fetching contributions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contributions',
      error: error.message
    });
  }
});

// GET endpoint to fetch a specific contribution (Form A)
app.get('/api/contributions/:id', async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);
    
    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: 'Contribution not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contribution
    });
  } catch (error) {
    console.error('Error fetching contribution:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contribution',
      error: error.message
    });
  }
});

// POST endpoint to save forum data (Form B) with image uploads
app.post('/api/forums', upload.fields([
  { name: 'presidentPhoto', maxCount: 1 },
  { name: 'immediateFormerPresidentPhoto', maxCount: 1 },
  { name: 'founderPresidentPhoto', maxCount: 1 },
  { name: 'nominatedFormerPresident1Photo', maxCount: 1 },
  { name: 'nominatedFormerPresident2Photo', maxCount: 1 },
  { name: 'nominatedFormerPresident3Photo', maxCount: 1 },
  { name: 'vicePresidentPhoto', maxCount: 1 },
  { name: 'secretaryPhoto', maxCount: 1 },
  { name: 'jointSecretaryPhoto', maxCount: 1 },
  { name: 'treasurerPhoto', maxCount: 1 }
]), async (req, res, next) => {
  try {
    // Upload images to R2 and get URLs
    const photoUrls = {};
    const files = req.files;
    const groupNo = req.body.groupNo;
    const email = req.body.email;

    // Process each uploaded photo
    for (const [fieldName, fileArray] of Object.entries(files)) {
      if (fileArray && fileArray[0]) {
        const file = fileArray[0];
        console.log("File : ", file)
        const url = await uploadToR2(file, groupNo, email, fieldName);
        console.log("URL : ", url)
        photoUrls[fieldName] = url;
        console.log("PhotoURLs",photoUrls)
      }
    }

    // Prepare form data with photo URLs
    const formData = {
      forumName: req.body.forumName,
      groupNo: groupNo,
      region: req.body.region,
      groupName: req.body.groupName,
      address: req.body.address,
      pinCode: req.body.pinCode,
      phone: req.body.phone,
      mobile: req.body.mobile,
      email: email,
      stdCode: req.body.stdCode,
      dateOfCharter: req.body.dateOfCharter,
      dateOfInaugration: req.body.dateOfInaugration,
      electedBearers: req.body.electedBearers,
      generalMeet: req.body.generalMeet,

      president: {
        name: req.body.presidentName,
        membershipNo: req.body.presidentMembershipNo,
        address: req.body.presidentAddress,
        pinCode: req.body.presidentPinCode,
        phone: req.body.presidentPhone,
        mobile: req.body.presidentMobile,
        whatsapp: req.body.presidentWhatsapp,
        email: req.body.presidentEmail,
        occupation: req.body.presidentOccupation,
        birthDate: req.body.presidentBirthDate,
        marriageDate: req.body.presidentMarriageDate,
        spouseName: req.body.presidentSpouseName,
        spouseBirthDate: req.body.presidentSpouseBirthDate,
        photo: photoUrls.presidentPhoto
      },
      // Similar structure for other office bearers with their respective photo URLs
      immediateFormerPresident: {
        name: req.body.immediateFormerPresidentName,
        membershipNo: req.body.immediateFormerPresidentMembershipNo,
        address: req.body.immediateFormerPresidentAddress,
        pinCode: req.body.immediateFormerPresidentPinCode,
        phone: req.body.immediateFormerPresidentPhone,
        mobile: req.body.immediateFormerPresidentMobile,
        whatsapp: req.body.immediateFormerPresidentWhatsapp,
        email: req.body.immediateFormerPresidentEmail,
        occupation: req.body.immediateFormerPresidentOccupation,
        birthDate: req.body.immediateFormerPresidentBirthDate,
        marriageDate: req.body.immediateFormerPresidentMarriageDate,
        spouseName: req.body.immediateFormerPresidentSpouseName,
        spouseBirthDate: req.body.immediateFormerPresidentSpouseBirthDate,
        photo: photoUrls.immediateFormerPresidentPhoto
      },
      founderPresident: {
        name: req.body.founderPresidentName,
        membershipNo: req.body.founderPresidentMembershipNo,
        address: req.body.founderPresidentAddress,
        pinCode: req.body.founderPresidentPinCode,
        phone: req.body.founderPresidentPhone,
        mobile: req.body.founderPresidentMobile,
        whatsapp: req.body.founderPresidentWhatsapp,
        email: req.body.founderPresidentEmail,
        occupation: req.body.founderPresidentOccupation,
        birthDate: req.body.founderPresidentBirthDate,
        marriageDate: req.body.founderPresidentMarriageDate,
        spouseName: req.body.founderPresidentSpouseName,
        spouseBirthDate: req.body.founderPresidentSpouseBirthDate,
        photo: photoUrls.founderPresidentPhoto
      },
      nominatedFormerPresident1: {
        name: req.body.nominatedFormerPresident1Name,
        membershipNo: req.body.nominatedFormerPresident1MembershipNo,
        address: req.body.nominatedFormerPresident1Address,
        pinCode: req.body.nominatedFormerPresident1PinCode,
        phone: req.body.nominatedFormerPresident1Phone,
        mobile: req.body.nominatedFormerPresident1Mobile,
        whatsapp: req.body.nominatedFormerPresident1Whatsapp,
        email: req.body.nominatedFormerPresident1Email,
        occupation: req.body.nominatedFormerPresident1Occupation,
        birthDate: req.body.nominatedFormerPresident1BirthDate,
        marriageDate: req.body.nominatedFormerPresident1MarriageDate,
        spouseName: req.body.nominatedFormerPresident1SpouseName,
        spouseBirthDate: req.body.nominatedFormerPresident1SpouseBirthDate,
        photo: photoUrls.nominatedFormerPresident1Photo
      },
      nominatedFormerPresident2: {
        name: req.body.nominatedFormerPresident2Name,
        membershipNo: req.body.nominatedFormerPresident2MembershipNo,
        address: req.body.nominatedFormerPresident2Address,
        pinCode: req.body.nominatedFormerPresident2PinCode,
        phone: req.body.nominatedFormerPresident2Phone,
        mobile: req.body.nominatedFormerPresident2Mobile,
        whatsapp: req.body.nominatedFormerPresident2Whatsapp,
        email: req.body.nominatedFormerPresident2Email,
        occupation: req.body.nominatedFormerPresident2Occupation,
        birthDate: req.body.nominatedFormerPresident2BirthDate,
        marriageDate: req.body.nominatedFormerPresident2MarriageDate,
        spouseName: req.body.nominatedFormerPresident2SpouseName,
        spouseBirthDate: req.body.nominatedFormerPresident2SpouseBirthDate,
        photo: photoUrls.nominatedFormerPresident2Photo
      },
      nominatedFormerPresident3: {
        name: req.body.nominatedFormerPresident3Name,
        membershipNo: req.body.nominatedFormerPresident3MembershipNo,
        address: req.body.nominatedFormerPresident3Address,
        pinCode: req.body.nominatedFormerPresident3PinCode,
        phone: req.body.nominatedFormerPresident3Phone,
        mobile: req.body.nominatedFormerPresident3Mobile,
        whatsapp: req.body.nominatedFormerPresident3Whatsapp,
        email: req.body.nominatedFormerPresident3Email,
        occupation: req.body.nominatedFormerPresident3Occupation,
        birthDate: req.body.nominatedFormerPresident3BirthDate,
        marriageDate: req.body.nominatedFormerPresident3MarriageDate,
        spouseName: req.body.nominatedFormerPresident3SpouseName,
        spouseBirthDate: req.body.nominatedFormerPresident3SpouseBirthDate,
        photo: photoUrls.nominatedFormerPresident3Photo
      },
      vicePresident: {
        name: req.body.vicePresidentName,
        membershipNo: req.body.vicePresidentMembershipNo,
        address: req.body.vicePresidentAddress,
        pinCode: req.body.vicePresidentPinCode,
        phone: req.body.vicePresidentPhone,
        mobile: req.body.vicePresidentMobile,
        whatsapp: req.body.vicePresidentWhatsapp,
        email: req.body.vicePresidentEmail,
        occupation: req.body.vicePresidentOccupation,
        birthDate: req.body.vicePresidentBirthDate,
        marriageDate: req.body.vicePresidentMarriageDate,
        spouseName: req.body.vicePresidentSpouseName,
        spouseBirthDate: req.body.vicePresidentSpouseBirthDate,
        photo: photoUrls.vicePresidentPhoto
      },
      secretary: {
        name: req.body.secretaryName,
        membershipNo: req.body.secretaryMembershipNo,
        address: req.body.secretaryAddress,
        pinCode: req.body.secretaryPinCode,
        phone: req.body.secretaryPhone,
        mobile: req.body.secretaryMobile,
        whatsapp: req.body.secretaryWhatsapp,
        email: req.body.secretaryEmail,
        occupation: req.body.secretaryOccupation,
        birthDate: req.body.secretaryBirthDate,
        marriageDate: req.body.secretaryMarriageDate,
        spouseName: req.body.secretarySpouseName,
        spouseBirthDate: req.body.secretarySpouseBirthDate,
        photo: photoUrls.secretaryPhoto
      },
      jointSecretary: {
        name: req.body.jointSecretaryName,
        membershipNo: req.body.jointSecretaryMembershipNo,
        address: req.body.jointSecretaryAddress,
        pinCode: req.body.jointSecretaryPinCode,
        phone: req.body.jointSecretaryPhone,
        mobile: req.body.jointSecretaryMobile,
        whatsapp: req.body.jointSecretaryWhatsapp,
        email: req.body.jointSecretaryEmail,
        occupation: req.body.jointSecretaryOccupation,
        birthDate: req.body.jointSecretaryBirthDate,
        marriageDate: req.body.jointSecretaryMarriageDate,
        spouseName: req.body.jointSecretarySpouseName,
        spouseBirthDate: req.body.jointSecretarySpouseBirthDate,
        photo: photoUrls.jointSecretaryPhoto
      },
      treasurer: {
        name: req.body.treasurerName,
        membershipNo: req.body.treasurerMembershipNo,
        address: req.body.treasurerAddress,
        pinCode: req.body.treasurerPinCode,
        phone: req.body.treasurerPhone,
        mobile: req.body.treasurerMobile,
        whatsapp: req.body.treasurerWhatsapp,
        email: req.body.treasurerEmail,
        occupation: req.body.treasurerOccupation,
        birthDate: req.body.treasurerBirthDate,
        marriageDate: req.body.treasurerMarriageDate,
        spouseName: req.body.treasurerSpouseName,
        spouseBirthDate: req.body.treasurerSpouseBirthDate,
        photo: photoUrls.treasurerPhoto
      },
      // Continue for all other positions...

      // Committee members array remains the same
      committeeMembers: Array.from({ length: 8 }, (_, i) => ({
        name: req.body[`committeemember${i + 1}Name`],
        membershipNo: req.body[`committeeMember${i + 1}MembershipNo`],
        address: req.body[`committeemember${i + 1}Address`],
        pinCode: req.body[`committeemember${i + 1}PinCode`],
        phone: req.body[`committeemember${i + 1}Phone`],
        mobile: req.body[`committeemember${i + 1}Mobile`],
        email: req.body[`committeemember${i + 1}Email`]
      }))
    };

    const forum = new Forum(formData);
    const savedForum = await forum.save();
    
    res.status(201).json({
      success: true,
      message: 'Forum registered successfully',
      data: savedForum
    });
  } catch (error) {
    console.error('Error registering forum:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to register forum',
      error: error.message
    });
  }
});

// GET endpoint to fetch all forums (Form B)
app.get('/api/forums', async (req, res) => {
  try {
    const forums = await Forum.find()
      .sort({ dateOfCharter: -1 });
    
    res.status(200).json({
      success: true,
      count: forums.length,
      data: forums
    });
  } catch (error) {
    console.error('Error fetching forums:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch forums',
      error: error.message
    });
  }
});

// GET endpoint to fetch a specific forum (Form B)
app.get('/api/forums/:id', async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id);
    
    if (!forum) {
      return res.status(404).json({
        success: false,
        message: 'Forum not found'
      });
    }

    res.status(200).json({
      success: true,
      data: forum
    });
  } catch (error) {
    console.error('Error fetching forum:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch forum',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});