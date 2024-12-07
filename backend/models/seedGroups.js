const mongoose = require('mongoose');
const Group = require('./group_schema'); // Adjust the path if needed

mongoose.connect("mongodb+srv://202100378:iYWJm9cNC7z1tVaR@backend-app.l2zik.mongodb.net/?retryWrites=true&w=majority&appName=Backend-app", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedGroups();
  })
  .catch(error => console.error('MongoDB connection error:', error));

const groupData = [
  {
    groupNo: 1,
    groupName: "Bombay Main",
    region: "Bombay"
  },
  {
    groupNo: 2,
    groupName: "Rajkot Main",
    region: "Saurashtra"
  },
  {
    groupNo: 3,
    groupName: "Junior JSG",
    region: "Bombay"
  },
  {
    groupNo: 4,
    groupName: "Ghatkopar",
    region: "Bombay"
  },
  {
    groupNo: 5,
    groupName: "Matunga",
    region: "Bombay"
  },
  {
    groupNo: 6,
    groupName: "Malad-Goregaon",
    region: "Bombay"
  },
  {
    groupNo: 7,
    groupName: "Pune Main",
    region: "Maharashtra"
  },
  {
    groupNo: 8,
    groupName: "Jamnagar Main",
    region: "Saurashtra"
  },
  {
    groupNo: 9,
    groupName: "Bangalore",
    region: "South"
  },
  {
    groupNo: 10,
    groupName: "Parle Platinum",
    region: "Bombay"
  },
  {
    groupNo: 11,
    groupName: "Andheri",
    region: "Bombay"
  },
  {
    groupNo: 12,
    groupName: "Bhavnagar Main",
    region: "Saurashtra"
  },
  {
    groupNo: 13,
    groupName: "Vadodara Main",
    region: "Gujarat"
  },
  {
    groupNo: 14,
    groupName: "Hyderabad",
    region: "South"
  },
  {
    groupNo: 15,
    groupName: "Rajkot West",
    region: "Saurashtra"
  },
  {
    groupNo: 16,
    groupName: "Surendranagar Main",
    region: "Saurashtra"
  },
  {
    groupNo: 17,
    groupName: "Morbi",
    region: "Saurashtra"
  },
  {
    groupNo: 18,
    groupName: "Madras Main",
    region: "South"
  },
  {
    groupNo: 19,
    groupName: "Secunderabad",
    region: "South"
  },
  {
    groupNo: 20,
    groupName: "Bombay Central",
    region: "Bombay"
  },
  {
    groupNo: 21,
    groupName: "Kolhapur Main",
    region: "Maharashtra"
  },
  {
    groupNo: 22,
    groupName: "Gandhinagar",
    region: "Gujarat"
  },
  {
    groupNo: 23,
    groupName: "Solapur",
    region: "Maharashtra"
  },
  {
    groupNo: 24,
    groupName: "Surat Main",
    region: "Gujarat"
  },
  {
    groupNo: 25,
    groupName: "Mulund",
    region: "Bombay"
  },
  {
    groupNo: 26,
    groupName: "London",
    region: "Overseas"
  },
  {
    groupNo: 27,
    groupName: "Madurai",
    region: "South"
  },
  {
    groupNo: 28,
    groupName: "Coimbatore",
    region: "South"
  },
  {
    groupNo: 29,
    groupName: "Sangli",
    region: "Maharashtra"
  },
  {
    groupNo: 30,
    groupName: "Cochin",
    region: "South"
  },
  {
    groupNo: 31,
    groupName: "Calicut",
    region: "South"
  },
  {
    groupNo: 32,
    groupName: "Indore Main",
    region: "Indore"
  },
  {
    groupNo: 33,
    groupName: "Wankaner",
    region: "Saurashtra"
  },
  {
    groupNo: 34,
    groupName: "Porbandar",
    region: "Saurashtra"
  },
  {
    groupNo: 35,
    groupName: "Satara",
    region: "Maharashtra"
  },
  {
    groupNo: 36,
    groupName: "Bharuch",
    region: "Gujarat"
  },
  {
    groupNo: 37,
    groupName: "Rajkot Mid Town",
    region: "Saurashtra"
  },
  {
    groupNo: 38,
    groupName: "Jamnagar West",
    region: "Saurashtra"
  },
  {
    groupNo: 39,
    groupName: "Los Angeles",
    region: "Overseas"
  },
  {
    groupNo: 40,
    groupName: "Dhrangadhra",
    region: "Saurashtra"
  },
  {
    groupNo: 41,
    groupName: "Madras Central",
    region: "South"
  },
  {
    groupNo: 42,
    groupName: "Junagadh",
    region: "Saurashtra"
  },
  {
    groupNo: 43,
    groupName: "Valsad",
    region: "Gujarat"
  },
  {
    groupNo: 44,
    groupName: "Palitana",
    region: "Saurashtra"
  },
  {
    groupNo: 45,
    groupName: "Veraval",
    region: "Saurashtra"
  },
  {
    groupNo: 46,
    groupName: "Nashik",
    region: "Maharashtra"
  },
  {
    groupNo: 47,
    groupName: "Five Garden Dadar",
    region: "Bombay"
  },
  {
    groupNo: 48,
    groupName: "Pune Central",
    region: "Maharashtra"
  },
  {
    groupNo: 49,
    groupName: "Bhiwandi",
    region: "Bombay"
  },
  {
    groupNo: 50,
    groupName: "Dubai",
    region: "Overseas"
  },
  {
    groupNo: 51,
    groupName: "Ujjain Main",
    region: "M.P."
  },
  {
    groupNo: 52,
    groupName: "Anand V. V. Nagar",
    region: "Gujarat"
  },
  {
    groupNo: 53,
    groupName: "Himatnagar",
    region: "Gujarat"
  },
  {
    groupNo: 54,
    groupName: "Suryapur",
    region: "Gujarat"
  },
  {
    groupNo: 55,
    groupName: "Dewas",
    region: "M.P."
  },
  {
    groupNo: 56,
    groupName: "Dhoraji",
    region: "Saurashtra"
  },
  {
    groupNo: 57,
    groupName: "Pune Mid Town",
    region: "Maharashtra"
  },
  {
    groupNo: 58,
    groupName: "Bilimora Main - CLOSED",
    region: "Gujarat"
  },
  {
    groupNo: 59,
    groupName: "Navsari Main",
    region: "Gujarat"
  },
  {
    groupNo: 60,
    groupName: "Middland & North (UK)",
    region: "Overseas"
  },
  {
    groupNo: 61,
    groupName: "Mehsana",
    region: "Gujarat"
  },
  {
    groupNo: 62,
    groupName: "Ratlam Main",
    region: "M.P."
  },
  {
    groupNo: 63,
    groupName: "Mumbai Down Town",
    region: "Bombay"
  },
  {
    groupNo: 64,
    groupName: "Indore Greater",
    region: "Indore"
  },
  {
    groupNo: 65,
    groupName: "Nairobi",
    region: "Overseas"
  },
  {
    groupNo: 66,
    groupName: "Suvarnapuri",
    region: "Gujarat"
  },
  {
    groupNo: 67,
    groupName: "Dhar Main",
    region: "Indore"
  },
  {
    groupNo: 68,
    groupName: "Khandwa",
    region: "Indore"
  },
  {
    groupNo: 69,
    groupName: "Jaora",
    region: "M.P."
  },
  {
    groupNo: 70,
    groupName: "Latur",
    region: "Maharashtra"
  },
  {
    groupNo: 71,
    groupName: "Bhavnagar West",
    region: "Saurashtra"
  },
  {
    groupNo: 72,
    groupName: "Bhopal",
    region: "M.P."
  },
  {
    groupNo: 73,
    groupName: "Indore Malwa",
    region: "Indore"
  },
  {
    groupNo: 74,
    groupName: "Vapi Main",
    region: "Gujarat"
  },
  {
    groupNo: 75,
    groupName: "Palanpur",
    region: "Gujarat"
  },
  {
    groupNo: 76,
    groupName: "Toronto",
    region: "Overseas"
  },
  {
    groupNo: 77,
    groupName: "Thane",
    region: "Bombay"
  },
  {
    groupNo: 78,
    groupName: "Narmadnagari",
    region: "Gujarat"
  },
  {
    groupNo: 79,
    groupName: "New York (USA)",
    region: "Overseas"
  },
  {
    groupNo: 80,
    groupName: "Juhu Beach Centre",
    region: "Bombay"
  },
  {
    groupNo: 81,
    groupName: "Ratlam Greater",
    region: "M.P."
  },
  {
    groupNo: 82,
    groupName: "Neemuch",
    region: "M.P."
  },
  {
    groupNo: 83,
    groupName: "Pandharpur",
    region: "Maharashtra"
  },
  {
    groupNo: 84,
    groupName: "Chittorgarh",
    region: "Mewar"
  },
  {
    groupNo: 85,
    groupName: "Khachrod",
    region: "M.P."
  },
  {
    groupNo: 86,
    groupName: "Vadodara Mid Town",
    region: "Gujarat"
  },
  {
    groupNo: 87,
    groupName: "Indore Mid Town",
    region: "Indore"
  },
  {
    groupNo: 88,
    groupName: "Idar",
    region: "Gujarat"
  },
  {
    groupNo: 89,
    groupName: "Indore Down Town",
    region: "Indore"
  },
  {
    groupNo: 90,
    groupName: "Nagda",
    region: "M.P."
  },
  {
    groupNo: 91,
    groupName: "Shujalpur",
    region: "M.P."
  },
  {
    groupNo: 92,
    groupName: "Badnawar",
    region: "Indore"
  },
  {
    groupNo: 93,
    groupName: "Muscat",
    region: "Overseas"
  },
  {
    groupNo: 94,
    groupName: "Jabalpur",
    region: "M.P."
  },
  {
    groupNo: 95,
    groupName: "Mandsaur",
    region: "M.P."
  },
  {
    groupNo: 96,
    groupName: "Ankleshwar Main",
    region: "Gujarat"
  },
  {
    groupNo: 97,
    groupName: "Thangadh",
    region: "Saurashtra"
  },
  {
    groupNo: 98,
    groupName: "Raipur Main",
    region: "Central"
  },
  {
    groupNo: 99,
    groupName: "Pink City Jaipur",
    region: "Northern"
  },
  {
    groupNo: 100,
    groupName: "Bhuj-Kutch",
    region: "Saurashtra"
  },
  {
    groupNo: 101,
    groupName: "Kolhapur Mid Town",
    region: "Maharashtra"
  },
  {
    groupNo: 102,
    groupName: "Pune Paschim",
    region: "Maharashtra"
  },
  {
    groupNo: 103,
    groupName: "Jamnagar Down Town",
    region: "Saurashtra"
  },
  {
    groupNo: 104,
    groupName: "Rajkot Down Town",
    region: "Saurashtra"
  },
  {
    groupNo: 105,
    groupName: "Awantika Ujjain",
    region: "M.P."
  },
  {
    groupNo: 106,
    groupName: "Indore City",
    region: "Indore"
  },
  {
    groupNo: 107,
    groupName: "Bijapur",
    region: "Maharashtra"
  },
  {
    groupNo: 108,
    groupName: "Malegaon",
    region: "Maharashtra"
  },
  {
    groupNo: 109,
    groupName: "Sion",
    region: "Bombay"
  },
  {
    groupNo: 110,
    groupName: "Jhabua",
    region: "Indore"
  },
  {
    groupNo: 111,
    groupName: "Gandhidham-Kutchh",
    region: "Saurashtra"
  },
  {
    groupNo: 112,
    groupName: "Ratlam Central",
    region: "M.P."
  },
  {
    groupNo: 113,
    groupName: "Mehidpur",
    region: "M.P."
  },
  {
    groupNo: 114,
    groupName: "Airport",
    region: "Bombay"
  },
  {
    groupNo: 115,
    groupName: "Borivali",
    region: "Bombay"
  },
  {
    groupNo: 116,
    groupName: "Akola",
    region: "Central"
  },
  {
    groupNo: 117,
    groupName: "Walkeshwar",
    region: "Bombay"
  },
  {
    groupNo: 118,
    groupName: "Pune City",
    region: "Maharashtra"
  },
  {
    groupNo: 119,
    groupName: "Durg-Bhilai",
    region: "Central"
  },
  {
    groupNo: 120,
    groupName: "Nashik Road Deolali",
    region: "Maharashtra"
  },
  {
    groupNo: 121,
    groupName: "Jam Jodhpur",
    region: "Saurashtra"
  },
  {
    groupNo: 122,
    groupName: "Kalyan",
    region: "Bombay"
  },
  {
    groupNo: 123,
    groupName: "Surendranagar Mid Town",
    region: "Saurashtra"
  },
  {
    groupNo: 124,
    groupName: "Gulbarga",
    region: "Maharashtra"
  },
  {
    groupNo: 125,
    groupName: "Pune Dakshin",
    region: "Maharashtra"
  },
  {
    groupNo: 126,
    groupName: "Kuwait",
    region: "Overseas"
  },
  {
    groupNo: 127,
    groupName: "Vijaywada",
    region: "South"
  },
  {
    groupNo: 128,
    groupName: "Pune Greater",
    region: "Maharashtra"
  },
  {
    groupNo: 129,
    groupName: "Hawa Mahal Jaipur",
    region: "Northern"
  },
  {
    groupNo: 130,
    groupName: "Jaipur Mid Town",
    region: "Northern"
  },
  {
    groupNo: 131,
    groupName: "Aurangabad",
    region: "Maharashtra"
  },
  {
    groupNo: 132,
    groupName: "Vikram Ujjain",
    region: "M.P."
  },
  {
    groupNo: 133,
    groupName: "Pimpri-Chinchwad",
    region: "Maharashtra"
  },
  {
    groupNo: 134,
    groupName: "Balotra",
    region: "Northern"
  },
  {
    groupNo: 135,
    groupName: "Pune Deccan",
    region: "Maharashtra"
  },
  {
    groupNo: 136,
    groupName: "Udaipur Main",
    region: "Mewar"
  },
  {
    groupNo: 137,
    groupName: "Anjar-Kutch",
    region: "Saurashtra"
  },
  {
    groupNo: 138,
    groupName: "Rahpar-Kutchh",
    region: "Saurashtra"
  },
  {
    groupNo: 139,
    groupName: "Worli",
    region: "Bombay"
  },
  {
    groupNo: 140,
    groupName: "Ratlam Ratnapuri",
    region: "M.P."
  },
  {
    groupNo: 141,
    groupName: "Jaipur Capital",
    region: "Northern"
  },
  {
    groupNo: 142,
    groupName: "Nimbahera",
    region: "Mewar"
  },
  {
    groupNo: 143,
    groupName: "Nadiad",
    region: "Gujarat"
  },
  {
    groupNo: 144,
    groupName: "Krishnanagar-Ahmedabad",
    region: "Gujarat"
  },
  {
    groupNo: 145,
    groupName: "Mandsaur Greater",
    region: "M.P."
  },
  {
    groupNo: 146,
    groupName: "Kanpur",
    region: "East"
  },
  {
    groupNo: 147,
    groupName: "Central Sansthan Jaipur",
    region: "Northern"
  },
  {
    groupNo: 148,
    groupName: "Pune Aagam",
    region: "Maharashtra"
  },
  {
    groupNo: 149,
    groupName: "Vapi West",
    region: "Gujarat"
  },
  {
    groupNo: 150,
    groupName: "Vadodara Sayajinagari",
    region: "Gujarat"
  },
  {
    groupNo: 151,
    groupName: "London Middlesex",
    region: "Overseas"
  },
  {
    groupNo: 152,
    groupName: "Pune Down Town",
    region: "Maharashtra"
  },
  {
    groupNo: 153,
    groupName: "Indore Swagat",
    region: "Indore"
  },
  {
    groupNo: 154,
    groupName: "Mahanagar Jaipur",
    region: "Northern"
  },
  {
    groupNo: 155,
    groupName: "Heritage City Jaipur",
    region: "Northern"
  },
  {
    groupNo: 156,
    groupName: "Airport Mumbai",
    region: "Bombay"
  },
  {
    groupNo: 157,
    groupName: "Pune Metrocity",
    region: "Maharashtra"
  },
  {
    groupNo: 158,
    groupName: "Koregaon",
    region: "Maharashtra"
  },
  {
    groupNo: 159,
    groupName: "Emerald Jaipur",
    region: "Northern"
  },
  {
    groupNo: 160,
    groupName: "Unhel",
    region: "M.P."
  },
  {
    groupNo: 161,
    groupName: "Bhuj Mid Town",
    region: "Saurashtra"
  },
  {
    groupNo: 162,
    groupName: "Kota",
    region: "Northern"
  },
  {
    groupNo: 163,
    groupName: "Mewar Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 164,
    groupName: "Talod",
    region: "Gujarat"
  },
  {
    groupNo: 165,
    groupName: "North Jaipur",
    region: "Northern"
  },
  {
    groupNo: 166,
    groupName: "Ajmer",
    region: "Northern"
  },
  {
    groupNo: 167,
    groupName: "Ankleshwar Town",
    region: "Gujarat"
  },
  {
    groupNo: 168,
    groupName: "Gem City Jaipur",
    region: "Northern"
  },
  {
    groupNo: 169,
    groupName: "Nawanagar",
    region: "Saurashtra"
  },
  {
    groupNo: 170,
    groupName: "Arihant Jaipur",
    region: "Northern"
  },
  {
    groupNo: 171,
    groupName: "Pune Bibwewadi",
    region: "Maharashtra"
  },
  {
    groupNo: 172,
    groupName: "New Jersy",
    region: "Overseas"
  },
  {
    groupNo: 173,
    groupName: "Phaltan",
    region: "Maharashtra"
  },
  {
    groupNo: 174,
    groupName: "Beverly Hills (USA)",
    region: "Overseas"
  },
  {
    groupNo: 175,
    groupName: "Ujjain Maytree",
    region: "M.P."
  },
  {
    groupNo: 176,
    groupName: "Nashik Grape City",
    region: "Maharashtra"
  },
  {
    groupNo: 177,
    groupName: "Silk City",
    region: "Gujarat"
  },
  {
    groupNo: 178,
    groupName: "Samanvaya Surat",
    region: "Gujarat"
  },
  {
    groupNo: 179,
    groupName: "Navkar Jaipur",
    region: "Northern"
  },
  {
    groupNo: 180,
    groupName: "Rajkot Royal",
    region: "Saurashtra"
  },
  {
    groupNo: 181,
    groupName: "Juhu Beach",
    region: "Bombay"
  },
  {
    groupNo: 182,
    groupName: "Surendranagar Silver",
    region: "Saurashtra"
  },
  {
    groupNo: 183,
    groupName: "Bhavnagar East",
    region: "Saurashtra"
  },
  {
    groupNo: 184,
    groupName: "Kolhapur Yuva",
    region: "Maharashtra"
  },
  {
    groupNo: 185,
    groupName: "Lake City Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 186,
    groupName: "Sikar",
    region: "Northern"
  },
  {
    groupNo: 187,
    groupName: "Indore Unique",
    region: "Indore"
  },
  {
    groupNo: 188,
    groupName: "Rainbow Jaipur",
    region: "Northern"
  },
  {
    groupNo: 189,
    groupName: "Jaipur Diamond",
    region: "Northern"
  },
  {
    groupNo: 190,
    groupName: "Indore Navkar",
    region: "Indore"
  },
  {
    groupNo: 191,
    groupName: "Jaipur Sapphire",
    region: "Northern"
  },
  {
    groupNo: 192,
    groupName: "Bijainagar",
    region: "Northern"
  },
  {
    groupNo: 193,
    groupName: "Sion Jewel",
    region: "Bombay"
  },
  {
    groupNo: 194,
    groupName: "Matunga Gold",
    region: "Bombay"
  },
  {
    groupNo: 195,
    groupName: "Matunga Silver",
    region: "Bombay"
  },
  {
    groupNo: 196,
    groupName: "Jaipur Metro",
    region: "Northern"
  },
  {
    groupNo: 197,
    groupName: "Jaipur Venus",
    region: "Northern"
  },
  {
    groupNo: 198,
    groupName: "Jaipur Topaz",
    region: "Northern"
  },
  {
    groupNo: 199,
    groupName: "Marble City Kishangarh",
    region: "Northern"
  },
  {
    groupNo: 200,
    groupName: "Navkar Beawar",
    region: "Northern"
  },
  {
    groupNo: 201,
    groupName: "Jaipur Tonk",
    region: "Northern"
  },
  {
    groupNo: 202,
    groupName: "Khachrod Metri",
    region: "M.P."
  },
  {
    groupNo: 203,
    groupName: "Jaora Golden",
    region: "M.P."
  },
  {
    groupNo: 204,
    groupName: "Bhavnagar (Youth)",
    region: "Saurashtra"
  },
  {
    groupNo: 205,
    groupName: "Samanvaya Ujjain",
    region: "M.P."
  },
  {
    groupNo: 206,
    groupName: "Ahmedabad Elite",
    region: "Gujarat"
  },
  {
    groupNo: 207,
    groupName: "Bhamashah - Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 208,
    groupName: "Pune Nagar Road",
    region: "Maharashtra"
  },
  {
    groupNo: 209,
    groupName: "Pune Youth Central",
    region: "Maharashtra"
  },
  {
    groupNo: 210,
    groupName: "Pune Platinum",
    region: "Maharashtra"
  },
  {
    groupNo: 211,
    groupName: "Pune Noble",
    region: "Maharashtra"
  },
  {
    groupNo: 212,
    groupName: "Chennai Elite",
    region: "South"
  },
  {
    groupNo: 213,
    groupName: "Pratap Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 214,
    groupName: "Uday Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 215,
    groupName: "Bhavnagar \"Gaurav\"",
    region: "Saurashtra"
  },
  {
    groupNo: 216,
    groupName: "Ratlam Classic",
    region: "M.P."
  },
  {
    groupNo: 217,
    groupName: "Arihant Ujjain",
    region: "M.P."
  },
  {
    groupNo: 218,
    groupName: "Dhar City",
    region: "Indore"
  },
  {
    groupNo: 219,
    groupName: "London (NW)",
    region: "Overseas"
  },
  {
    groupNo: 220,
    groupName: "Udaipur Umang",
    region: "Mewar"
  },
  {
    groupNo: 221,
    groupName: "(Aravli) Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 222,
    groupName: "Kota Maytree",
    region: "Northern"
  },
  {
    groupNo: 223,
    groupName: "Jaora Maytree",
    region: "M.P."
  },
  {
    groupNo: 224,
    groupName: "Pune Central Gold",
    region: "Maharashtra"
  },
  {
    groupNo: 225,
    groupName: "Pune Elite",
    region: "Maharashtra"
  },
  {
    groupNo: 226,
    groupName: "(Royal) Jaipur",
    region: "Northern"
  },
  {
    groupNo: 227,
    groupName: "Surendranagar Royal",
    region: "Saurashtra"
  },
  {
    groupNo: 228,
    groupName: "Jaipur (Mansarovar)",
    region: "Northern"
  },
  {
    groupNo: 229,
    groupName: "Neemuch Greater",
    region: "M.P."
  },
  {
    groupNo: 230,
    groupName: "Ratlam Youth",
    region: "M.P."
  },
  {
    groupNo: 231,
    groupName: "Bhilad-Sarigam-Fansa",
    region: "Gujarat"
  },
  {
    groupNo: 232,
    groupName: "Vidisha",
    region: "M.P."
  },
  {
    groupNo: 233,
    groupName: "Ujjain Sagar",
    region: "M.P."
  },
  {
    groupNo: 234,
    groupName: "Dudu",
    region: "Northern"
  },
  {
    groupNo: 235,
    groupName: "Indore \"Udaan\"",
    region: "Indore"
  },
  {
    groupNo: 236,
    groupName: "Sparkle Jaipur",
    region: "Northern"
  },
  {
    groupNo: 237,
    groupName: "\"Chambal City\" Kota",
    region: "Northern"
  },
  {
    groupNo: 238,
    groupName: "Gadhavada (Satlasana)",
    region: "Gujarat"
  },
  {
    groupNo: 239,
    groupName: "Rajnagar - CLOSED",
    region: "Gujarat"
  },
  {
    groupNo: 240,
    groupName: "Dahanu Road",
    region: "Gujarat"
  },
  {
    groupNo: 241,
    groupName: "Malpura",
    region: "Northern"
  },
  {
    groupNo: 242,
    groupName: "Amam-Krupa - Ahmedabad",
    region: "Gujarat"
  },
  {
    groupNo: 243,
    groupName: "Nashik Platinum",
    region: "Maharashtra"
  },
  {
    groupNo: 244,
    groupName: "Dhulia",
    region: "Maharashtra"
  },
  {
    groupNo: 245,
    groupName: "Neemuch Unique",
    region: "M.P."
  },
  {
    groupNo: 246,
    groupName: "Silver Leaf Kolhapur",
    region: "Maharashtra"
  },
  {
    groupNo: 247,
    groupName: "Jhabua Maitree",
    region: "Indore"
  },
  {
    groupNo: 248,
    groupName: "Jaora Central",
    region: "M.P."
  },
  {
    groupNo: 249,
    groupName: "Baramati",
    region: "Maharashtra"
  },
  {
    groupNo: 250,
    groupName: "Shekhawati Sikar",
    region: "Northern"
  },
  {
    groupNo: 251,
    groupName: "Bhopal Rajdhani",
    region: "M.P."
  },
  {
    groupNo: 252,
    groupName: "Jawad",
    region: "M.P."
  },
  {
    groupNo: 253,
    groupName: "Amalner",
    region: "Maharashtra"
  },
  {
    groupNo: 254,
    groupName: "Ananta Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 255,
    groupName: "Sion Solitaire",
    region: "Bombay"
  },
  {
    groupNo: 256,
    groupName: "Emerald Beawar",
    region: "Northern"
  },
  {
    groupNo: 257,
    groupName: "Evergreen Kolhapur",
    region: "Maharashtra"
  },
  {
    groupNo: 258,
    groupName: "Sunshine Beawar",
    region: "Northern"
  },
  {
    groupNo: 259,
    groupName: "Jaora Muskan",
    region: "M.P."
  },
  {
    groupNo: 260,
    groupName: "Diamond Pimpri-Chinchwad",
    region: "Maharashtra"
  },
  {
    groupNo: 261,
    groupName: "Lotus Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 262,
    groupName: "Sunshine Jaipur",
    region: "Northern"
  },
  {
    groupNo: 263,
    groupName: "Pune Lotus",
    region: "Maharashtra"
  },
  {
    groupNo: 264,
    groupName: "Diamond Mandsaur",
    region: "M.P."
  },
  {
    groupNo: 265,
    groupName: "Blue Diamond Jaipur",
    region: "Northern"
  },
  {
    groupNo: 266,
    groupName: "Bhusawal",
    region: "Maharashtra"
  },
  {
    groupNo: 267,
    groupName: "Nashik Mid Town",
    region: "Maharashtra"
  },
  {
    groupNo: 268,
    groupName: "Ratlam Maitri",
    region: "M.P."
  },
  {
    groupNo: 269,
    groupName: "Nakshatra",
    region: "Gujarat"
  },
  {
    groupNo: 270,
    groupName: "Ujjain Muskan",
    region: "M.P."
  },
  {
    groupNo: 271,
    groupName: "Vadodara Elite",
    region: "Gujarat"
  },
  {
    groupNo: 272,
    groupName: "Vadodara Vibrant",
    region: "Gujarat"
  },
  {
    groupNo: 273,
    groupName: "Ganj Basoda City",
    region: "M.P."
  },
  {
    groupNo: 274,
    groupName: "Nashik Central",
    region: "Maharashtra"
  },
  {
    groupNo: 275,
    groupName: "(Pearl) Jaipur",
    region: "Northern"
  },
  {
    groupNo: 276,
    groupName: "Bundi",
    region: "Northern"
  },
  {
    groupNo: 277,
    groupName: "Vapi Generation Next",
    region: "Gujarat"
  },
  {
    groupNo: 278,
    groupName: "Young Dewas",
    region: "M.P."
  },
  {
    groupNo: 279,
    groupName: "Janak",
    region: "Northern"
  },
  {
    groupNo: 280,
    groupName: "Thandla",
    region: "Indore"
  },
  {
    groupNo: 281,
    groupName: "Davangere",
    region: "Maharashtra"
  },
  {
    groupNo: 282,
    groupName: "Indore Elite",
    region: "Indore"
  },
  {
    groupNo: 283,
    groupName: "Nashik Metro",
    region: "Maharashtra"
  },
  {
    groupNo: 284,
    groupName: "Deoli",
    region: "Northern"
  },
  {
    groupNo: 285,
    groupName: "Samta",
    region: "Mewar"
  },
  {
    groupNo: 286,
    groupName: "Sanskar",
    region: "Northern"
  },
  {
    groupNo: 287,
    groupName: "\"Ok\" Nimbahera",
    region: "Mewar"
  },
  {
    groupNo: 288,
    groupName: "Udaipur Vijay",
    region: "Mewar"
  },
  {
    groupNo: 289,
    groupName: "Udaipur Platinum",
    region: "Mewar"
  },
  {
    groupNo: 290,
    groupName: "Alot Young",
    region: "M.P."
  },
  {
    groupNo: 291,
    groupName: "Petlawad Maitri",
    region: "Indore"
  },
  {
    groupNo: 292,
    groupName: "Pune Smart City",
    region: "Maharashtra"
  },
  {
    groupNo: 293,
    groupName: "Pune Royals",
    region: "Maharashtra"
  },
  {
    groupNo: 294,
    groupName: "Kukreshwar",
    region: "M.P."
  },
  {
    groupNo: 295,
    groupName: "Ujjain Milan",
    region: "M.P."
  },
  {
    groupNo: 296,
    groupName: "Sakri",
    region: "Maharashtra"
  },
  {
    groupNo: 297,
    groupName: "Diamond Malegaon",
    region: "Maharashtra"
  },
  {
    groupNo: 298,
    groupName: "Indore Elegant",
    region: "Indore"
  },
  {
    groupNo: 299,
    groupName: "Solitaire North Mumbai",
    region: "Bombay"
  },
  {
    groupNo: 300,
    groupName: "Youth Bijainagar",
    region: "Northern"
  },
  {
    groupNo: 301,
    groupName: "Star Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 302,
    groupName: "Kota Aagam",
    region: "Northern"
  },
  {
    groupNo: 303,
    groupName: "Udaipur Kalpataru",
    region: "Mewar"
  },
  {
    groupNo: 304,
    groupName: "Udaipur Navkar",
    region: "Mewar"
  },
  {
    groupNo: 305,
    groupName: "Bhopal Raja Bhoj",
    region: "M.P."
  },
  {
    groupNo: 306,
    groupName: "Bhopal Metro",
    region: "M.P."
  },
  {
    groupNo: 307,
    groupName: "Rajkot Elite",
    region: "Saurashtra"
  },
  {
    groupNo: 308,
    groupName: "Bhopal Chandanwala",
    region: "M.P."
  },
  {
    groupNo: 309,
    groupName: "Bengaluru East",
    region: "South"
  },
  {
    groupNo: 310,
    groupName: "Jaipur Triveni",
    region: "Northern"
  },
  {
    groupNo: 311,
    groupName: "Ratlam Shine",
    region: "M.P."
  },
  {
    groupNo: 312,
    groupName: "Jaipur Gold",
    region: "Northern"
  },
  {
    groupNo: 313,
    groupName: "Delhi Main",
    region: "Northern"
  },
  {
    groupNo: 314,
    groupName: "Pune Pearl",
    region: "Maharashtra"
  },
  {
    groupNo: 315,
    groupName: "Indapur",
    region: "Maharashtra"
  },
  {
    groupNo: 316,
    groupName: "Udaipur Arham",
    region: "Mewar"
  },
  {
    groupNo: 317,
    groupName: "Nashik Namo",
    region: "Maharashtra"
  },
  {
    groupNo: 318,
    groupName: "Islampur",
    region: "Maharashtra"
  },
  {
    groupNo: 319,
    groupName: "Dharwad (Hubli)",
    region: "Maharashtra"
  },
  {
    groupNo: 320,
    groupName: "Indore Legend",
    region: "Indore"
  },
  {
    groupNo: 321,
    groupName: "Classic Ajmer",
    region: "Northern"
  },
  {
    groupNo: 322,
    groupName: "Mandsaur Gold",
    region: "M.P."
  },
  {
    groupNo: 323,
    groupName: "Sparkle Beawar",
    region: "Northern"
  },
  {
    groupNo: 324,
    groupName: "Venus (Youth) Jaipur",
    region: "Northern"
  },
  {
    groupNo: 325,
    groupName: "Sagar Main",
    region: "M.P."
  },
  {
    groupNo: 326,
    groupName: "Chhindwara",
    region: "M.P."
  },
  {
    groupNo: 327,
    groupName: "Jaora Navkar",
    region: "M.P."
  },
  {
    groupNo: 328,
    groupName: "Fort Jaipur",
    region: "Northern"
  },
  {
    groupNo: 329,
    groupName: "Phulera (Dist. Jaipur)",
    region: "Northern"
  },
  {
    groupNo: 330,
    groupName: "Jalgaon Gold",
    region: "Maharashtra"
  },
  {
    groupNo: 331,
    groupName: "Vishad Jaipur",
    region: "Northern"
  },
  {
    groupNo: 332,
    groupName: "Jewels (Udaipur)",
    region: "Mewar"
  },
  {
    groupNo: 333,
    groupName: "Royal Mumbai",
    region: "Bombay"
  },
  {
    groupNo: 334,
    groupName: "Royals Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 335,
    groupName: "Umang Elite",
    region: "Mewar"
  },
  {
    groupNo: 336,
    groupName: "Kirit Jaipur",
    region: "Northern"
  },
  {
    groupNo: 337,
    groupName: "Hiranandani Powai",
    region: "Bombay"
  },
  {
    groupNo: 338,
    groupName: "Khandwa Unique",
    region: "Indore"
  },
  {
    groupNo: 339,
    groupName: "Unique Bamnia",
    region: "Indore"
  },
  {
    groupNo: 340,
    groupName: "Indore Exotic",
    region: "Indore"
  },
  {
    groupNo: 341,
    groupName: "Petlawad Youth",
    region: "Indore"
  },
  {
    groupNo: 342,
    groupName: "Ujjain \"Sarthak\"",
    region: "M.P."
  },
  {
    groupNo: 343,
    groupName: "Neemuch Sanskar",
    region: "M.P."
  },
  {
    groupNo: 344,
    groupName: "Singoli Dist. Neemuch",
    region: "M.P."
  },
  {
    groupNo: 345,
    groupName: "Ujjain Udaan",
    region: "M.P."
  },
  {
    groupNo: 346,
    groupName: "Mehidpur Sarthak",
    region: "M.P."
  },
  {
    groupNo: 347,
    groupName: "Platinum Dhule",
    region: "Maharashtra"
  },
  {
    groupNo: 348,
    groupName: "Chennai Down Town",
    region: "South"
  },
  {
    groupNo: 349,
    groupName: "Chennai Greater",
    region: "South"
  },
  {
    groupNo: 350,
    groupName: "Chennai Mid Town",
    region: "South"
  },
  {
    groupNo: 351,
    groupName: "Chennai Classic",
    region: "South"
  },
  {
    groupNo: 352,
    groupName: "Chennai Royal",
    region: "South"
  },
  {
    groupNo: 353,
    groupName: "Ernakulam",
    region: "South"
  },
  {
    groupNo: 354,
    groupName: "Jakarta",
    region: "Overseas"
  },
  {
    groupNo: 355,
    groupName: "Bangkok",
    region: "Overseas"
  },
  {
    groupNo: 356,
    groupName: "Singapore",
    region: "Overseas"
  },
  {
    groupNo: 357,
    groupName: "Jabalpur (Unique)",
    region: "M.P."
  },
  {
    groupNo: 358,
    groupName: "Indore Shourya",
    region: "Indore"
  },
  {
    groupNo: 359,
    groupName: "Ratlam Sanskar",
    region: "M.P."
  },
  {
    groupNo: 360,
    groupName: "Jaipur Surya",
    region: "Northern"
  },
  {
    groupNo: 361,
    groupName: "Jaipur Star",
    region: "Northern"
  },
  {
    groupNo: 362,
    groupName: "Jaipur Ruby Gold",
    region: "Northern"
  },
  {
    groupNo: 363,
    groupName: "Jaipur Rays",
    region: "Northern"
  },
  {
    groupNo: 364,
    groupName: "Jaipur Paras",
    region: "Northern"
  },
  {
    groupNo: 365,
    groupName: "Jaipur Scorpio",
    region: "Northern"
  },
  {
    groupNo: 366,
    groupName: "Jaipur Ruby",
    region: "Northern"
  },
  {
    groupNo: 367,
    groupName: "Jaipur Rajdhani",
    region: "Northern"
  },
  {
    groupNo: 368,
    groupName: "Jaipur Silver",
    region: "Northern"
  },
  {
    groupNo: 369,
    groupName: "Jaipur Toda Rai Singh",
    region: "Northern"
  },
  {
    groupNo: 370,
    groupName: "Jaipur Lotus",
    region: "Northern"
  },
  {
    groupNo: 371,
    groupName: "Chomu Main",
    region: "Northern"
  },
  {
    groupNo: 372,
    groupName: "Fort Kuchaman City",
    region: "Northern"
  },
  {
    groupNo: 373,
    groupName: "Siddha",
    region: "Northern"
  },
  {
    groupNo: 374,
    groupName: "Platinum Nandurbar",
    region: "Maharashtra"
  },
  {
    groupNo: 375,
    groupName: "Akluj",
    region: "Maharashtra"
  },
  {
    groupNo: 376,
    groupName: "Indonesia",
    region: "Overseas"
  },
  {
    groupNo: 377,
    groupName: "Atlanta",
    region: "Overseas"
  },
  {
    groupNo: 378,
    groupName: "Washington",
    region: "Overseas"
  },
  {
    groupNo: 379,
    groupName: "Gwalior",
    region: "M.P."
  },
  {
    groupNo: 380,
    groupName: "Swastik Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 381,
    groupName: "Jainam Jaipur",
    region: "Northern"
  },
  {
    groupNo: 382,
    groupName: "Rajkot Yuva",
    region: "Saurashtra"
  },
  {
    groupNo: 383,
    groupName: "Pune Anand",
    region: "Maharashtra"
  },
  {
    groupNo: 384,
    groupName: "Parle Gold",
    region: "Bombay"
  },
  {
    groupNo: 385,
    groupName: "Parle Santacruz",
    region: "Bombay"
  },
  {
    groupNo: 386,
    groupName: "Mumbai Westside",
    region: "Bombay"
  },
  {
    groupNo: 387,
    groupName: "Bombay North",
    region: "Bombay"
  },
  {
    groupNo: 388,
    groupName: "Andheri Mid Town",
    region: "Bombay"
  },
  {
    groupNo: 389,
    groupName: "Shaurya Nimbahera-Raj.",
    region: "Mewar"
  },
  {
    groupNo: 390,
    groupName: "Supreme Udaipur-Raj.",
    region: "Mewar"
  },
  {
    groupNo: 391,
    groupName: "Rajkot Central",
    region: "Saurashtra"
  },
  {
    groupNo: 392,
    groupName: "Agra",
    region: "Northern"
  },
  {
    groupNo: 393,
    groupName: "Bahrain",
    region: "Overseas"
  },
  {
    groupNo: 394,
    groupName: "Udaipur Arihant",
    region: "Mewar"
  },
  {
    groupNo: 395,
    groupName: "Siwanchi Malani Ahmedabad",
    region: "Gujarat"
  },
  {
    groupNo: 396,
    groupName: "Vijaynagar",
    region: "Gujarat"
  },
  {
    groupNo: 397,
    groupName: "Udaipur Namokar",
    region: "Mewar"
  },
  {
    groupNo: 398,
    groupName: "Udaipur Unique",
    region: "Mewar"
  },
  {
    groupNo: 399,
    groupName: "Elite Durg-Bhilai",
    region: "Central"
  },
  {
    groupNo: 400,
    groupName: "Pune Pride",
    region: "Maharashtra"
  },
  {
    groupNo: 401,
    groupName: "Ujjain 'JYC'",
    region: "M.P."
  },
  {
    groupNo: 402,
    groupName: "Platinum Jaipur",
    region: "Northern"
  },
  {
    groupNo: 403,
    groupName: "Pune Sky",
    region: "Maharashtra"
  },
  {
    groupNo: 404,
    groupName: "Arham Jaipur",
    region: "Northern"
  },
  {
    groupNo: 405,
    groupName: "Pune Market Yard",
    region: "Maharashtra"
  },
  {
    groupNo: 406,
    groupName: "Sheetal Vidisha",
    region: "M.P."
  },
  {
    groupNo: 407,
    groupName: "Neemuch Udan",
    region: "M.P."
  },
  {
    groupNo: 408,
    groupName: "Classic Juhu",
    region: "Bombay"
  },
  {
    groupNo: 409,
    groupName: "Anuvrat (Rajsamand)",
    region: "Mewar"
  },
  {
    groupNo: 410,
    groupName: "Joy Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 411,
    groupName: "Manasa",
    region: "M.P."
  },
  {
    groupNo: 412,
    groupName: "Shahpur - Surpur",
    region: "Maharashtra"
  },
  {
    groupNo: 413,
    groupName: "Sanskar - Jaora",
    region: "M.P."
  },
  {
    groupNo: 414,
    groupName: "Bhilwara Main",
    region: "Mewar"
  },
  {
    groupNo: 415,
    groupName: "Crystal Pune",
    region: "Maharashtra"
  },
  {
    groupNo: 416,
    groupName: "Pune Parshwa",
    region: "Maharashtra"
  },
  {
    groupNo: 417,
    groupName: "Pune Icon",
    region: "Maharashtra"
  },
  {
    groupNo: 418,
    groupName: "\"Subhash\" Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 419,
    groupName: "Up to Date",
    region: "Northern"
  },
  {
    groupNo: 420,
    groupName: "Bagwada",
    region: "Gujarat"
  },
  {
    groupNo: 421,
    groupName: "Kalanagari \"Vadodara\"",
    region: "Gujarat"
  },
  {
    groupNo: 422,
    groupName: "Statue of Unity \"Vadodara\"",
    region: "Gujarat"
  },
  {
    groupNo: 423,
    groupName: "Jinshasan \"Himatnagar\"",
    region: "Gujarat"
  },
  {
    groupNo: 424,
    groupName: "Vadodara Sakshar Nagari",
    region: "Gujarat"
  },
  {
    groupNo: 425,
    groupName: "Vadodara Sanskar Nagari",
    region: "Gujarat"
  },
  {
    groupNo: 426,
    groupName: "Surnagari Vadodara",
    region: "Gujarat"
  },
  {
    groupNo: 427,
    groupName: "Pune Jewels",
    region: "Maharashtra"
  },
  {
    groupNo: 428,
    groupName: "Pune Udaan",
    region: "Maharashtra"
  },
  {
    groupNo: 429,
    groupName: "Pune Infinity",
    region: "Maharashtra"
  },
  {
    groupNo: 430,
    groupName: "Universe Jaipur",
    region: "Northern"
  },
  {
    groupNo: 431,
    groupName: "Rajkot Prime",
    region: "Saurashtra"
  },
  {
    groupNo: 432,
    groupName: "Elegent Entrepreneurs Ujjain",
    region: "M.P."
  },
  {
    groupNo: 433,
    groupName: "Pune, Celebrations",
    region: "Maharashtra"
  },
  {
    groupNo: 434,
    groupName: "Diamond, Satana",
    region: "Maharashtra"
  },
  {
    groupNo: 435,
    groupName: "Pune Navkar",
    region: "Maharashtra"
  },
  {
    groupNo: 436,
    groupName: "Ratlam Elite",
    region: "M.P."
  },
  {
    groupNo: 437,
    groupName: "Indore Sky",
    region: "Indore"
  },
  {
    groupNo: 438,
    groupName: "Yuva Shakti Balotra",
    region: "Northern"
  },
  {
    groupNo: 439,
    groupName: "Bhiwandi Platinum",
    region: "Bombay"
  },
  {
    groupNo: 440,
    groupName: "Indore Arham",
    region: "Indore"
  },
  {
    groupNo: 441,
    groupName: "Pune Synergy",
    region: "Maharashtra"
  },
  {
    groupNo: 442,
    groupName: "Pratapgarh",
    region: "Mewar"
  },
  {
    groupNo: 443,
    groupName: "Indore Krystal",
    region: "Indore"
  },
  {
    groupNo: 444,
    groupName: "Crown, Indore",
    region: "Indore"
  },
  {
    groupNo: 445,
    groupName: "Indore Sapphire",
    region: "Indore"
  },
  {
    groupNo: 446,
    groupName: "Marvels Ajmer",
    region: "Northern"
  },
  {
    groupNo: 447,
    groupName: "Icon, Jhabua",
    region: "Indore"
  },
  {
    groupNo: 448,
    groupName: "Dungarpur",
    region: "Mewar"
  },
  {
    groupNo: 449,
    groupName: "Siddjam, Udaipur",
    region: "Mewar"
  },
  {
    groupNo: 450,
    groupName: "Sanksar",
    region: "Mewar"
  },
  {
    groupNo: 451,
    groupName: "Pune Sparsh",
    region: "Maharashtra"
  },
  {
    groupNo: 452,
    groupName: "(Glory) Jaipur",
    region: "Northern"
  },
  {
    groupNo: 453,
    groupName: "Kheroda",
    region: "Mewar"
  },
  {
    groupNo: 454,
    groupName: "Pune Pro",
    region: "Maharashtra"
  },
  {
    groupNo: 455,
    groupName: "Karad Platinum",
    region: "Maharashtra"
  },
  {
    groupNo: 456,
    groupName: "Pune Arham",
    region: "Maharashtra"
  },
  {
    groupNo: 457,
    groupName: "Advitiyah",
    region: "Mewar"
  },
  {
    groupNo: 458,
    groupName: "Indore Divine",
    region: "Indore"
  },
  {
    groupNo: 459,
    groupName: "Indore Queen's",
    region: "Indore"
  },
  {
    groupNo: 460,
    groupName: "Ojas Indore",
    region: "Indore"
  },
  {
    groupNo: 461,
    groupName: "Iconic",
    region: "Mewar"
  },
  {
    groupNo: 462,
    groupName: "Bhilwara Star",
    region: "Mewar"
  },
  {
    groupNo: 463,
    groupName: "Indore Pearl",
    region: "Indore"
  },
  {
    groupNo: 464,
    groupName: "Indore Ruby",
    region: "Indore"
  },
  {
    groupNo: 465,
    groupName: "Indore Emerald",
    region: "Indore"
  }
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
