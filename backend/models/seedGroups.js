const mongoose = require('mongoose');
const Group = require('./group_schema'); // Adjust the path if needed

mongoose.connect("mongodb+srv://202100378:iYWJm9cNC7z1tVaR@backend-app.l2zik.mongodb.net/?retryWrites=true&w=majority&appName=Backend-app", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedGroups();
  })
  .catch(error => console.error('MongoDB connection error:', error));

const groupData = [
  { groupNo: 1, groupName: 'Bombay Main', region: 'Bombay' },
  { groupNo: 2, groupName: 'Rajkot Main', region: 'Saurashtra' },
  { groupNo: 3, groupName: 'Junior JSG', region: 'Bombay' },
  { groupNo: 4, groupName: 'Ghatkopar', region: 'Bombay' },
  { groupNo: 5, groupName: 'Matunga', region: 'Bombay' },
  { groupNo: 6, groupName: 'Malad-Goregaon', region: 'Bombay' },
  { groupNo: 7, groupName: 'Pune Main', region: 'Maharashtra' },
  { groupNo: 8, groupName: 'Jamnagar Main', region: 'Saurashtra' },
  { groupNo: 9, groupName: 'Bangalore', region: 'South' },
  { groupNo: 10, groupName: 'Parle Platinum', region: 'Bombay' },
];

async function seedGroups() {
  try {
    await Group.deleteMany(); // Clear existing data
    await Group.insertMany(groupData);
    console.log('Group data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding group data:', error);
    process.exit(1);
  }
}
