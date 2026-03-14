require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wingmann';

const dummyUsers = [
  {
    name: "Alex",
    gender: "Male",
    phone: "111-222-3333",
    answers: {
      q1: 1, q2: 1, q3: 1, q4: 1, q5: "I believe in honesty and full transparency.",
      q6: 1, q7: 1, q8: 1, q9: 1, q10: 1,
      q11: 1, q12: 1, q13: 1, q14: 1, q15: 1,
      q16: 1, q17: 4, q18: 2, q19: 1, q20: 1,
      q21: 4, q22: 4, q23: 1, q24: 1, q25: 1
    }
  },
  {
    name: "Benjamin",
    gender: "Male",
    phone: "111-222-3344",
    answers: {
      q1: 3, q2: 3, q3: 3, q4: 3, q5: "Adventure and sharing experiences is key to me.",
      q6: 3, q7: 3, q8: 3, q9: 3, q10: 3,
      q11: 3, q12: 3, q13: 3, q14: 3, q15: 3,
      q16: 3, q17: 3, q18: 4, q19: 3, q20: 3,
      q21: 3, q22: 3, q23: 3, q24: 3, q25: 3
    }
  },
  {
    name: "Sarah",
    gender: "Female",
    phone: "444-555-6666",
    answers: {
      q1: 1, q2: 1, q3: 1, q4: 1, q5: "Loyalty and faithfulness above all else.", // Should match Alex closely
      q6: 1, q7: 1, q8: 1, q9: 1, q10: 1,
      q11: 1, q12: 1, q13: 1, q14: 1, q15: 1,
      q16: 1, q17: 4, q18: 2, q19: 1, q20: 1,
      q21: 4, q22: 4, q23: 1, q24: 1, q25: 1
    }
  },
  {
    name: "Riya",
    gender: "Female",
    phone: "444-555-7777",
    answers: {
      q1: 2, q2: 4, q3: 2, q4: 5, q5: "Having fun, great chemistry and lots of humor.", 
      q6: 2, q7: 4, q8: 2, q9: 5, q10: 2,
      q11: 5, q12: 2, q13: 4, q14: 2, q15: 4,
      q16: 5, q17: 2, q18: 3, q19: 5, q20: 2,
      q21: 1, q22: 2, q23: 4, q24: 2, q25: 4
    }
  },
  {
    name: "Emma",
    gender: "Female",
    phone: "444-555-8888",
    answers: {
      q1: 4, q2: 2, q3: 4, q4: 2, q5: "Deep emotional connection, warmth, and compassion.",
      q6: 4, q7: 2, q8: 4, q9: 2, q10: 4,
      q11: 2, q12: 4, q13: 2, q14: 4, q15: 2,
      q16: 2, q17: 5, q18: 1, q19: 4, q20: 5,
      q21: 5, q22: 5, q23: 2, q24: 4, q25: 2
    }
  },
  {
    name: "Jessica",
    gender: "Female",
    phone: "444-555-9999",
    answers: {
      q1: 3, q2: 3, q3: 3, q4: 3, q5: "Stability and a safe environment matter most.",
      q6: 3, q7: 3, q8: 3, q9: 3, q10: 3,
      q11: 3, q12: 3, q13: 3, q14: 3, q15: 3,
      q16: 3, q17: 2, q18: 2, q19: 3, q20: 3,
      q21: 2, q22: 2, q23: 3, q24: 3, q25: 3
    }
  },
  {
    name: "Olivia",
    gender: "Female",
    phone: "444-555-0000",
    answers: {
      q1: 2, q2: 1, q3: 4, q4: 2, q5: "Growth and building a foundation together.",
      q6: 2, q7: 1, q8: 4, q9: 2, q10: 1,
      q11: 4, q12: 2, q13: 1, q14: 4, q15: 2,
      q16: 1, q17: 4, q18: 3, q19: 2, q20: 1,
      q21: 4, q22: 3, q23: 2, q24: 1, q25: 4
    }
  },
  {
    name: "Sophia",
    gender: "Female",
    phone: "444-555-1111",
    answers: {
      q1: 4, q2: 4, q3: 1, q4: 1, q5: "Honesty, loyalty, and a strong sense of truth.",
      q6: 4, q7: 4, q8: 1, q9: 1, q10: 4,
      q11: 1, q12: 1, q13: 4, q14: 1, q15: 4,
      q16: 4, q17: 1, q18: 1, q19: 4, q20: 4,
      q21: 1, q22: 1, q23: 4, q24: 4, q25: 1
    }
  },
  {
    name: "Mia",
    gender: "Female",
    phone: "444-555-2222",
    answers: {
      q1: 1, q2: 2, q3: 3, q4: 4, q5: "Adventure and exploring new places together.",
      q6: 1, q7: 2, q8: 3, q9: 4, q10: 1,
      q11: 2, q12: 3, q13: 4, q14: 1, q15: 2,
      q16: 3, q17: 4, q18: 1, q19: 2, q20: 3,
      q21: 4, q22: 1, q23: 2, q24: 3, q25: 4
    }
  },
  {
    name: "Ava",
    gender: "Female",
    phone: "444-555-3333",
    answers: {
      q1: 2, q2: 2, q3: 2, q4: 2, q5: "Open communication and expressing feelings.",
      q6: 2, q7: 2, q8: 2, q9: 2, q10: 2,
      q11: 2, q12: 2, q13: 2, q14: 2, q15: 2,
      q16: 2, q17: 2, q18: 2, q19: 2, q20: 2,
      q21: 2, q22: 2, q23: 2, q24: 2, q25: 2
    }
  }
];

async function seedDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');
    
    await User.deleteMany({});
    console.log('Cleared existing users');
    
    await User.insertMany(dummyUsers);
    console.log('Inserted dummy users successfully');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDB();
