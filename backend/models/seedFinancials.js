const mongoose = require('mongoose');
const Financial = require('./financial_schema'); // Adjust the path if needed

mongoose.connect("mongodb+srv://202100378:iYWJm9cNC7z1tVaR@backend-app.l2zik.mongodb.net/?retryWrites=true&w=majority&appName=Backend-app", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedFinancials();
  })
  .catch(error => console.error('MongoDB connection error:', error));

const financialData = [
    {
        groupNo: 1,
        groupName: "Mumbai Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 2,
        groupName: "Rajkot Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 3,
        groupName: "Junior JSG",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 4,
        groupName: "Ghatkopar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 5,
        groupName: "Matunga",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 6,
        groupName: "Malad-Goregaon",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 7,
        groupName: "Pune Main",
        previousDues: 0,
        lessPaid: 100.0
    },
    {
        groupNo: 8,
        groupName: "Jamnagar Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 9,
        groupName: "Bangalore",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 10,
        groupName: "Parle Platinum",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 11,
        groupName: "Andheri",
        previousDues: 0,
        lessPaid: 855.0
    },
    {
        groupNo: 12,
        groupName: "Bhavnagar Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 13,
        groupName: "Vadodara Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 14,
        groupName: "Hyderabad",
        previousDues: 0,
        lessPaid: 88.0
    },
    {
        groupNo: 15,
        groupName: "Rajkot West",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 16,
        groupName: "Surendranagar Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 17,
        groupName: "Morbi",
        previousDues: 0,
        lessPaid: 505.0
    },
    {
        groupNo: 18,
        groupName: "Madras Main",
        previousDues: 0,
        lessPaid: 7936.0
    },
    {
        groupNo: 19,
        groupName: "Secunderabad",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 20,
        groupName: "Bombay Central",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 21,
        groupName: "Kolhapur Main",
        previousDues: 0,
        lessPaid: 159.0
    },
    {
        groupNo: 22,
        groupName: "Gandhinagar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 23,
        groupName: "Solapur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 24,
        groupName: "Surat Main ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 25,
        groupName: "Mulund",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 27,
        groupName: "Madurai",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 28,
        groupName: "Coimbatore",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 29,
        groupName: "Sangli",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 30,
        groupName: "Cochin",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 31,
        groupName: "Calicut",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 32,
        groupName: "Indore Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 33,
        groupName: "Wankaner",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 34,
        groupName: "Porbandar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 35,
        groupName: "Satara",
        previousDues: 0,
        lessPaid: 392.0
    },
    {
        groupNo: 36,
        groupName: "Bharuch",
        previousDues: 0,
        lessPaid: 1357.0
    },
    {
        groupNo: 37,
        groupName: "Rajkot Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 38,
        groupName: "Jamnagar West",
        previousDues: 31517.0,
        lessPaid: 0
    },
    {
        groupNo: 40,
        groupName: "Dhrangadhra",
        previousDues: 29500.0,
        lessPaid: 0
    },
    {
        groupNo: 41,
        groupName: "Madras Central",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 42,
        groupName: "Junagadh",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 43,
        groupName: "Valsad",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 44,
        groupName: "Palitana",
        previousDues: 29643.0,
        lessPaid: 0
    },
    {
        groupNo: 45,
        groupName: "Veraval",
        previousDues: 0,
        lessPaid: 236.0
    },
    {
        groupNo: 46,
        groupName: "Nashik",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 47,
        groupName: "Five Garden Dadar",
        previousDues: 29500.0,
        lessPaid: 0
    },
    {
        groupNo: 48,
        groupName: "Pune Central",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 49,
        groupName: "Bhiwandi",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 51,
        groupName: "Ujjain Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 52,
        groupName: "Anand V. V. Nagar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 53,
        groupName: "Himatnagar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 54,
        groupName: "Suryapur",
        previousDues: 11741.0,
        lessPaid: 0
    },
    {
        groupNo: 55,
        groupName: "Dewas",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 56,
        groupName: "Dhoraji",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 57,
        groupName: "Pune Mid Town",
        previousDues: 0,
        lessPaid: 2896.0
    },
    {
        groupNo: 59,
        groupName: "Navsari Main",
        previousDues: 11800.0,
        lessPaid: 0
    },
    {
        groupNo: 61,
        groupName: "Mehsana",
        previousDues: 0,
        lessPaid: 100.0
    },
    {
        groupNo: 62,
        groupName: "Ratlam Main",
        previousDues: 0,
        lessPaid: 2329.0
    },
    {
        groupNo: 63,
        groupName: "Mumbai Down Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 64,
        groupName: "Indore Greater",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 66,
        groupName: "Suvarnapuri",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 67,
        groupName: "Dhar Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 68,
        groupName: "Khandwa",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 69,
        groupName: "Jaora",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 70,
        groupName: "Latur",
        previousDues: 0,
        lessPaid: 86.0
    },
    {
        groupNo: 71,
        groupName: "Bhavnagar West",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 72,
        groupName: "Bhopal ",
        previousDues: 0,
        lessPaid: 877.0
    },
    {
        groupNo: 73,
        groupName: "Indore Malwa",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 74,
        groupName: "Vapi Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 75,
        groupName: "Palanpur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 77,
        groupName: "Thane",
        previousDues: 15340.0,
        lessPaid: 0
    },
    {
        groupNo: 78,
        groupName: "Narmadnagari",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 80,
        groupName: "Juhu Beach Centre ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 81,
        groupName: "Ratlam Greater",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 82,
        groupName: "Neemuch",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 83,
        groupName: "Pandharpur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 84,
        groupName: "Chittorgarh",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 85,
        groupName: "Khachrod",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 86,
        groupName: "Vadodara Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 87,
        groupName: "Indore Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 88,
        groupName: "Idar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 89,
        groupName: "Indore Down Town",
        previousDues: 10325.0,
        lessPaid: 0
    },
    {
        groupNo: 90,
        groupName: "Nagda",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 91,
        groupName: "Shujalpur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 92,
        groupName: "Badnawar",
        previousDues: 6053.0,
        lessPaid: 0
    },
    {
        groupNo: 94,
        groupName: "Jabalpur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 95,
        groupName: "Mandsaur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 96,
        groupName: "Ankleshwar Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 97,
        groupName: "Thangadh",
        previousDues: 7967.0,
        lessPaid: 0
    },
    {
        groupNo: 99,
        groupName: "Pink City Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 100,
        groupName: "Bhuj-Kutch",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 101,
        groupName: "Kolhapur Mid Town ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 102,
        groupName: "Pune Paschim",
        previousDues: 900.0,
        lessPaid: 0
    },
    {
        groupNo: 103,
        groupName: "Jamnagar Down Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 104,
        groupName: "Rajkot Down Town",
        previousDues: 0,
        lessPaid: 12272.0
    },
    {
        groupNo: 105,
        groupName: "Awantika Ujjain",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 106,
        groupName: "Indore City",
        previousDues: 0,
        lessPaid: 68.0
    },
    {
        groupNo: 107,
        groupName: "Bijapur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 108,
        groupName: "Malegaon",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 109,
        groupName: "Sion Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 110,
        groupName: "Jhabua ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 111,
        groupName: "Gandhidham-Kutchh",
        previousDues: 0,
        lessPaid: 1232.0
    },
    {
        groupNo: 112,
        groupName: "Ratlam Central",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 113,
        groupName: "Mehidpur City",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 114,
        groupName: "Airport",
        previousDues: 47872.0,
        lessPaid: 0
    },
    {
        groupNo: 115,
        groupName: "Borivali",
        previousDues: 69407.0,
        lessPaid: 0
    },
    {
        groupNo: 117,
        groupName: "Walkeshwar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 118,
        groupName: "Pune City",
        previousDues: 35550.0,
        lessPaid: 0
    },
    {
        groupNo: 120,
        groupName: "Nashik Road Deolali",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 121,
        groupName: "Jam Jodhpur",
        previousDues: 24780.0,
        lessPaid: 0
    },
    {
        groupNo: 122,
        groupName: "Kalyan",
        previousDues: 0,
        lessPaid: 178.0
    },
    {
        groupNo: 123,
        groupName: "Surendranagar Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 124,
        groupName: "Gulbarga",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 125,
        groupName: "Pune Dakshin",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 127,
        groupName: "Vijaywada (M-42)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 128,
        groupName: "Pune Greater",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 129,
        groupName: "Hawa Mahal Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 130,
        groupName: "Jaipur Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 131,
        groupName: "Aurangabad",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 132,
        groupName: "Vikram Ujjain",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 133,
        groupName: "Pimpri-Chinchwad",
        previousDues: 0,
        lessPaid: 3852.0
    },
    {
        groupNo: 134,
        groupName: "Balotra",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 135,
        groupName: "Pune Deccan",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 136,
        groupName: "Udaipur Main",
        previousDues: 0,
        lessPaid: 2949.0
    },
    {
        groupNo: 137,
        groupName: "Anjar-Kutch",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 138,
        groupName: "Rahpar-Kutchh",
        previousDues: 0,
        lessPaid: 3540.0
    },
    {
        groupNo: 139,
        groupName: "Worli",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 140,
        groupName: "Ratlam Ratnapuri",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 141,
        groupName: "Jaipur Capital",
        previousDues: 0,
        lessPaid: 531.0
    },
    {
        groupNo: 142,
        groupName: "Nimbahera",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 143,
        groupName: "Nadiad",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 144,
        groupName: "Krishnanagar-Ahmedabad",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 145,
        groupName: "Mandsaur Greater",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 147,
        groupName: "Central Sansthan Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 148,
        groupName: "Pune Aagam",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 149,
        groupName: "Vapi West ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 150,
        groupName: "Vadodara Sayajinagari",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 152,
        groupName: "Pune Down Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 153,
        groupName: "Indore Swagat",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 154,
        groupName: "Mahanagar Jaipur",
        previousDues: 0,
        lessPaid: 2950.0
    },
    {
        groupNo: 155,
        groupName: "Heritage City Jaipur",
        previousDues: 0,
        lessPaid: 1186.0
    },
    {
        groupNo: 156,
        groupName: "Airport Mumbai ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 157,
        groupName: "Pune Metrocity",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 158,
        groupName: "Koregaon",
        previousDues: 9440.0,
        lessPaid: 0
    },
    {
        groupNo: 159,
        groupName: "Emerald Jaipur",
        previousDues: 0,
        lessPaid: 22.0
    },
    {
        groupNo: 160,
        groupName: "Unhel",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 161,
        groupName: "Bhuj Mid Town",
        previousDues: 0,
        lessPaid: 97.0
    },
    {
        groupNo: 162,
        groupName: "Kota",
        previousDues: 0,
        lessPaid: 12626.0
    },
    {
        groupNo: 163,
        groupName: "Mewar Udaipur",
        previousDues: 0,
        lessPaid: 2714.0
    },
    {
        groupNo: 164,
        groupName: "Talod",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 165,
        groupName: "North Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 166,
        groupName: "Ajmer",
        previousDues: 0,
        lessPaid: 248.0
    },
    {
        groupNo: 167,
        groupName: "Ankleshwar Town",
        previousDues: 0,
        lessPaid: 90.0
    },
    {
        groupNo: 168,
        groupName: "Gem City Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 169,
        groupName: "Nawanagar Jamnagar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 170,
        groupName: "Arihant Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 171,
        groupName: "Pune Bibwewadi",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 173,
        groupName: "Phaltan",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 175,
        groupName: "Ujjain Maytree",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 176,
        groupName: "Nashik Grape City",
        previousDues: 0,
        lessPaid: 590.0
    },
    {
        groupNo: 177,
        groupName: "Silk City",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 178,
        groupName: "Samanvaya Surat",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 179,
        groupName: "Navkar Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 180,
        groupName: "Rajkot Royal",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 181,
        groupName: "Juhu Beach ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 182,
        groupName: "Surendranagar Silver",
        previousDues: 0,
        lessPaid: 2824.0
    },
    {
        groupNo: 183,
        groupName: "Bhavnagar East",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 184,
        groupName: "Kolhapur Yuva",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 185,
        groupName: "Lake City Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 186,
        groupName: "Sikar",
        previousDues: 0,
        lessPaid: 706.0
    },
    {
        groupNo: 187,
        groupName: "Indore Unique",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 188,
        groupName: "Rainbow Jaipur",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 189,
        groupName: "Jaipur Diamond",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 190,
        groupName: "Indore Navkar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 191,
        groupName: "Jaipur Sapphire",
        previousDues: 29500.0,
        lessPaid: 0
    },
    {
        groupNo: 192,
        groupName: "Bijainagar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 193,
        groupName: "Sion Jewel",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 194,
        groupName: "Matunga Gold",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 195,
        groupName: "Matunga Silver",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 196,
        groupName: "Jaipur Metro",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 197,
        groupName: "Jaipur Venus",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 198,
        groupName: "Jaipur Topaz",
        previousDues: 0,
        lessPaid: 118.0
    },
    {
        groupNo: 199,
        groupName: "Marble City Kishangarh",
        previousDues: 22597.0,
        lessPaid: 0
    },
    {
        groupNo: 200,
        groupName: "Navkar Beawar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 201,
        groupName: "Jaipur Tonk",
        previousDues: 14160.0,
        lessPaid: 0
    },
    {
        groupNo: 202,
        groupName: "Khachrod Metri",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 203,
        groupName: "Jaora Golden",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 204,
        groupName: "Bhavnagar (Youth)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 205,
        groupName: "Samanvaya Ujjain",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 206,
        groupName: "Ahmedabad Elite",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 207,
        groupName: "Bhamashah - Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 208,
        groupName: "Pune Nagar Road",
        previousDues: 23600.0,
        lessPaid: 0
    },
    {
        groupNo: 209,
        groupName: "Pune Youth Central",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 210,
        groupName: "Pune Platinum",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 211,
        groupName: "Pune Noble ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 212,
        groupName: "Chennai Elite",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 213,
        groupName: "Pratap Udaipur ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 214,
        groupName: "Uday Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 215,
        groupName: "Bhavnagar \"Gaurav\"",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 216,
        groupName: "Ratlam Classic",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 217,
        groupName: "Arihant Ujjain",
        previousDues: 10175.0,
        lessPaid: 0
    },
    {
        groupNo: 218,
        groupName: "Dhar City",
        previousDues: 0,
        lessPaid: 10.0
    },
    {
        groupNo: 220,
        groupName: "Udaipur Umang",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 221,
        groupName: "(Aravali) Udaipur",
        previousDues: 0,
        lessPaid: 47.0
    },
    {
        groupNo: 222,
        groupName: "Kota Maytree",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 223,
        groupName: "Jaora Maytree",
        previousDues: 0,
        lessPaid: 203.0
    },
    {
        groupNo: 224,
        groupName: "Pune Central Gold",
        previousDues: 23600.0,
        lessPaid: 0
    },
    {
        groupNo: 225,
        groupName: "Pune Elite",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 226,
        groupName: "(Royal) Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 227,
        groupName: "Surendranagar Royal",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 228,
        groupName: "Jaipur (Mansarovar) ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 229,
        groupName: "Neemuch Greater",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 230,
        groupName: "Ratlam Youth",
        previousDues: 0,
        lessPaid: 149.0
    },
    {
        groupNo: 231,
        groupName: "Bhilad-Sarigam-Fansa",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 232,
        groupName: "Vidisha",
        previousDues: 11800.0,
        lessPaid: 0
    },
    {
        groupNo: 233,
        groupName: "Ujjain Sagar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 234,
        groupName: "Dudu",
        previousDues: 34517.0,
        lessPaid: 0
    },
    {
        groupNo: 235,
        groupName: "Indore \"Udaan\"",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 236,
        groupName: "Sparkle Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 237,
        groupName: "\"Chambal City\" Kota",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 238,
        groupName: "Gadhavada (Satlasana)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 240,
        groupName: "Dahanu Road",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 241,
        groupName: "Malpura",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 242,
        groupName: "Amam-Krupa - Ahmedabad",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 243,
        groupName: "Nashik Platinum",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 244,
        groupName: "Dhulia",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 245,
        groupName: "Neemuch Unique",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 246,
        groupName: "Silver Leaf Kolhapur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 247,
        groupName: "Jhabua Maitree",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 248,
        groupName: "Jaora Central",
        previousDues: 0,
        lessPaid: 102.0
    },
    {
        groupNo: 249,
        groupName: "Baramati",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 250,
        groupName: "Shekhawati Sikar",
        previousDues: 30801.0,
        lessPaid: 0
    },
    {
        groupNo: 251,
        groupName: "Bhopal Rajdhani",
        previousDues: 29750.0,
        lessPaid: 0
    },
    {
        groupNo: 252,
        groupName: "Jawad",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 253,
        groupName: "Amalner ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 254,
        groupName: "Ananta Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 255,
        groupName: "Sion Emarald",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 256,
        groupName: "Emerald Beawar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 257,
        groupName: "Evergreen Kolhapur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 258,
        groupName: "Sunshine Beawar",
        previousDues: 0,
        lessPaid: 311.0
    },
    {
        groupNo: 259,
        groupName: "Jaora Muskan",
        previousDues: 0,
        lessPaid: 8.0
    },
    {
        groupNo: 260,
        groupName: "Diamond Pimpri-Chinchwad",
        previousDues: 0,
        lessPaid: 5900.0
    },
    {
        groupNo: 261,
        groupName: "Lotus Udaipur",
        previousDues: 0,
        lessPaid: 17750.0
    },
    {
        groupNo: 262,
        groupName: "Sunshine Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 263,
        groupName: "Pune Lotus",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 264,
        groupName: "Diamond Mandsaur",
        previousDues: 29425.0,
        lessPaid: 0
    },
    {
        groupNo: 265,
        groupName: "Blue Diamond Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 266,
        groupName: "Bhusawal",
        previousDues: 33405.0,
        lessPaid: 0
    },
    {
        groupNo: 267,
        groupName: "Nashik Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 268,
        groupName: "Ratlam Maitri",
        previousDues: 0,
        lessPaid: 10.0
    },
    {
        groupNo: 269,
        groupName: "Nakshatra",
        previousDues: 0,
        lessPaid: 989.0
    },
    {
        groupNo: 270,
        groupName: "Ujjain Muskan",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 271,
        groupName: "Vadodara Elite",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 272,
        groupName: "Vadodara Vibrant",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 273,
        groupName: "Ganj Basoda City",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 274,
        groupName: "Nashik Central",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 275,
        groupName: "(Pearl) Jaipur",
        previousDues: 29180.0,
        lessPaid: 0
    },
    {
        groupNo: 276,
        groupName: "Bundi",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 277,
        groupName: "Vapi Generation Next",
        previousDues: 0,
        lessPaid: 208.0
    },
    {
        groupNo: 278,
        groupName: "Young Dewas",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 279,
        groupName: "Janak",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 280,
        groupName: "Thandla",
        previousDues: 11800.0,
        lessPaid: 0
    },
    {
        groupNo: 281,
        groupName: "Davangere",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 282,
        groupName: "Indore Elite",
        previousDues: 0,
        lessPaid: 50.0
    },
    {
        groupNo: 283,
        groupName: "Nashik Metro",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 284,
        groupName: "Deoli",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 285,
        groupName: "Samta Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 286,
        groupName: "Sanskar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 287,
        groupName: "\"Ok\" Nimbahera",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 288,
        groupName: "Udaipur Vijay ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 289,
        groupName: "Udaipur Platinum",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 290,
        groupName: "Alote Young",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 291,
        groupName: "Petlawad Maitri",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 292,
        groupName: "Pune Smart City",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 293,
        groupName: "Pune Royals",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 294,
        groupName: "Kukreshwar",
        previousDues: 22125.0,
        lessPaid: 0
    },
    {
        groupNo: 295,
        groupName: "Ujjain Milan",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 296,
        groupName: "Sakri",
        previousDues: 28025.0,
        lessPaid: 0
    },
    {
        groupNo: 297,
        groupName: "Diamond Malegaon",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 298,
        groupName: "Indore Elegant",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 299,
        groupName: "Solitaire North Mumbai",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 300,
        groupName: "Youth Bijainagar",
        previousDues: 11800.0,
        lessPaid: 0
    },
    {
        groupNo: 301,
        groupName: "Star Udaipur (48+2)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 302,
        groupName: "Kota Aagam",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 303,
        groupName: "Udaipur Kalpataru ",
        previousDues: 0,
        lessPaid: 1475.0
    },
    {
        groupNo: 304,
        groupName: "Udaipur Navkar ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 305,
        groupName: "Bhopal Raja Bhoj",
        previousDues: 23698.0,
        lessPaid: 0
    },
    {
        groupNo: 306,
        groupName: "Bhopal Metro",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 307,
        groupName: "Rajkot Elite",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 308,
        groupName: "Bhopal Chandanbala",
        previousDues: 0,
        lessPaid: 3934.0
    },
    {
        groupNo: 309,
        groupName: "Bengaluru East",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 310,
        groupName: "Jaipur Triveni",
        previousDues: 17564.0,
        lessPaid: 0
    },
    {
        groupNo: 311,
        groupName: "Ratlam Shine",
        previousDues: 28025.0,
        lessPaid: 0
    },
    {
        groupNo: 312,
        groupName: "Jaipur Gold",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 313,
        groupName: "Delhi ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 314,
        groupName: "Pune Pearl",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 315,
        groupName: "Indapur",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 316,
        groupName: "Udaipur Arham",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 317,
        groupName: "Nashik Namo",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 318,
        groupName: "Islampur",
        previousDues: 33800.0,
        lessPaid: 0
    },
    {
        groupNo: 319,
        groupName: "Dharwad (Hubli)",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 320,
        groupName: "Indore Legend",
        previousDues: 0,
        lessPaid: 1710.0
    },
    {
        groupNo: 321,
        groupName: "Classic Ajmer",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 322,
        groupName: "Mandsaur Gold",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 323,
        groupName: "Sparkle Beawar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 324,
        groupName: "Venus (Youth) Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 325,
        groupName: "Sagar Main",
        previousDues: 35800.0,
        lessPaid: 0
    },
    {
        groupNo: 326,
        groupName: "Chhindwara",
        previousDues: 35800.0,
        lessPaid: 0
    },
    {
        groupNo: 327,
        groupName: "Jaora Navkar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 328,
        groupName: "Fort Jaipur ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 329,
        groupName: "Phulera (Dist. Jaipur)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 330,
        groupName: "Jalgaon Gold",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 331,
        groupName: "Vishad Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 332,
        groupName: "Jewels (Udaipur)",
        previousDues: 11800.0,
        lessPaid: 0
    },
    {
        groupNo: 333,
        groupName: "Royal Mumbai",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 334,
        groupName: "Royals Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 335,
        groupName: "Umang Elite",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 336,
        groupName: "Kirti Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 337,
        groupName: "Hiranandani Powai",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 338,
        groupName: "Khandwa Unique",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 339,
        groupName: "Unique Bamnia",
        previousDues: 28025.0,
        lessPaid: 0
    },
    {
        groupNo: 340,
        groupName: "Indore Exotic",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 341,
        groupName: "Petlawad Youth",
        previousDues: 23600.0,
        lessPaid: 0
    },
    {
        groupNo: 342,
        groupName: "Ujjain \"Sarthak\"",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 343,
        groupName: "Neemuch Sanskar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 344,
        groupName: "Singoli Dist. Neemuch",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 345,
        groupName: "Ujjain Udaan ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 346,
        groupName: "Mehidpur Sarthak",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 347,
        groupName: "Platinum Dhule",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 348,
        groupName: "Chennai Down Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 349,
        groupName: "Chennai Greater",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 350,
        groupName: "Chennai Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 351,
        groupName: "Chennai Classic",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 352,
        groupName: "Chennai Royal",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 353,
        groupName: "Ernakulam",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 357,
        groupName: "Jabalpur (Unique)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 358,
        groupName: "Indore Shourya",
        previousDues: 28025.0,
        lessPaid: 0
    },
    {
        groupNo: 359,
        groupName: "Ratlam Sanskar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 360,
        groupName: "Jaipur Surya",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 361,
        groupName: "Jaipur Star",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 362,
        groupName: "Jaipur Ruby Gold",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 363,
        groupName: "Jaipur Rays",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 364,
        groupName: "Jaipur Paras",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 365,
        groupName: "Jaipur Scorpio",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 366,
        groupName: "Jaipur Ruby",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 367,
        groupName: "Jaipur Rajdhani",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 368,
        groupName: "Jaipur Silver",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 369,
        groupName: "Jaipur Todaraisingh",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 370,
        groupName: "Jaipur Lotus",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 371,
        groupName: "Chomu Main",
        previousDues: 33925.0,
        lessPaid: 0
    },
    {
        groupNo: 372,
        groupName: "Fort Kuchaman City",
        previousDues: 11800.0,
        lessPaid: 0
    },
    {
        groupNo: 373,
        groupName: "Siddha",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 374,
        groupName: "Platinum Nandurbar ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 375,
        groupName: "Akluj",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 379,
        groupName: "Gwalior",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 380,
        groupName: "Swastik Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 381,
        groupName: "Jainam Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 382,
        groupName: "Rajkot Yuva",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 383,
        groupName: "Pune Anand",
        previousDues: 0,
        lessPaid: 60.0
    },
    {
        groupNo: 384,
        groupName: "Parle Gold",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 385,
        groupName: "Parle Santacurz",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 386,
        groupName: "Mumbai Westside",
        previousDues: 0,
        lessPaid: 59.0
    },
    {
        groupNo: 387,
        groupName: "Bombay North",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 388,
        groupName: "Andheri Mid Town",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 389,
        groupName: "Shaurya Nimbahera (Raj.)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 390,
        groupName: "Supreme Udaipur (Raj.)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 391,
        groupName: "Rajkot Central",
        previousDues: 0,
        lessPaid: 2655.0
    },
    {
        groupNo: 392,
        groupName: "Agra",
        previousDues: 17700.0,
        lessPaid: 0
    },
    {
        groupNo: 394,
        groupName: "Udaipur Arihant",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 395,
        groupName: "Siwanchi Malani Ahmedabad",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 396,
        groupName: "Vijaynagar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 397,
        groupName: "Udaipur Namokar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 398,
        groupName: "Udaipur Unique",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 400,
        groupName: "Pune Pride",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 401,
        groupName: "Ujjain 'JYC'",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 402,
        groupName: "Platinum Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 403,
        groupName: "Pune Sky",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 404,
        groupName: "Arham Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 405,
        groupName: "Pune Market Yard",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 406,
        groupName: "(Sheetal) Vidisha",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 407,
        groupName: "Neemuch Udan",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 408,
        groupName: "Classic Juhu",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 409,
        groupName: "Anuvrat (Rajsamand) ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 410,
        groupName: "Joy Udaipur ",
        previousDues: 0,
        lessPaid: 5.0
    },
    {
        groupNo: 411,
        groupName: "Manasa",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 412,
        groupName: "Shahpur - Surpur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 413,
        groupName: "Sanskar - Jaora",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 414,
        groupName: "Bhilwara Main",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 415,
        groupName: "Crystal, Pune ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 416,
        groupName: "Pune Parshwa",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 417,
        groupName: "Pune Icon",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 418,
        groupName: "\"Subhash\" Udaipur ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 419,
        groupName: "Up To Date",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 420,
        groupName: "Bagwada",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 421,
        groupName: "Kalanagari \"Vadodara\"",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 422,
        groupName: "Statue Of Unity \"Vadodara\"",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 423,
        groupName: "Jinshasan \"Himatnagar\"",
        previousDues: 11800.0,
        lessPaid: 0
    },
    {
        groupNo: 424,
        groupName: "Sakshar Nagari \"Vadodara\"",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 425,
        groupName: "Sanskar Nagari \"Vadodara\"",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 426,
        groupName: "Sur Nagari \"Vadodara\"",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 427,
        groupName: "Pune Jewels ",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 428,
        groupName: "Pune Udaan",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 429,
        groupName: "Pune Infinity",
        previousDues: 5900.0,
        lessPaid: 0
    },
    {
        groupNo: 430,
        groupName: "Universe Jaipur",
        previousDues: 0,
        lessPaid: 50.0
    },
    {
        groupNo: 431,
        groupName: "Rajkot Prime",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 432,
        groupName: "Elegant Entrepreneurs Ujjain",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 433,
        groupName: "Pune, Celebrations",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 434,
        groupName: "Diamond, Satana",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 435,
        groupName: "Pune Navkar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 436,
        groupName: "Ratlam Elite",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 437,
        groupName: "Indore Sky",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 438,
        groupName: "Yuva Shakti Balotra (35)",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 439,
        groupName: "Bhiwandi Platinum",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 440,
        groupName: "Indore Arham",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 441,
        groupName: "Pune Synergy",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 442,
        groupName: "Pratapgarh",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 443,
        groupName: "Indore Krystal",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 444,
        groupName: "Crown, Indore",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 445,
        groupName: "Indore Sapphire",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 446,
        groupName: "Marvels Ajmer",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 447,
        groupName: "Icon, Jhabua",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 448,
        groupName: "Dungarpur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 449,
        groupName: "Siddham, Udaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 450,
        groupName: "Sanskar",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 451,
        groupName: "Pune Sparsh",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 452,
        groupName: "(Glory) Jaipur",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 453,
        groupName: "Kheroda",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 454,
        groupName: "Pune Pro",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 455,
        groupName: "Karad Platinum",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 456,
        groupName: "Pune Arham",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 457,
        groupName: "Advitiyah",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 458,
        groupName: "Indore Divine",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 459,
        groupName: "Indore Queen's",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 460,
        groupName: "Ojas Indore",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 461,
        groupName: "Iconic",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 462,
        groupName: "Bhilwara Star",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 463,
        groupName: "Indore Pearl",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 464,
        groupName: "Indore Ruby",
        previousDues: 0,
        lessPaid: 0
    },
    {
        groupNo: 465,
        groupName: "Indore Emerald",
        previousDues: 0,
        lessPaid: 0
    }
]

async function seedFinancials() {
  try {
    await Financial.deleteMany(); // Clear existing data
    await Financial.insertMany(financialData);
    console.log('Financial data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Financial data:', error);
    process.exit(1);
  }
}
