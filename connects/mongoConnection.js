const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    console.log('successfully Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = {
  connectToMongo
};
