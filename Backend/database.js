const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURL = process.env.mongo;

const connection = async () => {
  try {
    await mongoose.connect(mongoURL); // Removed deprecated options
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connection;
