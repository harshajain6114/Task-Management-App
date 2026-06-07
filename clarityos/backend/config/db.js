// backend/config/db.js
// Establishes connection to MongoDB using Mongoose

const mongoose = require('mongoose');

// Force IPv4 for DNS resolution - fixes querySrv ECONNREFUSED on Windows/Node v20
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error('Make sure your IP is whitelisted in MongoDB Atlas Network Access.');
    process.exit(1);
  }
};

module.exports = connectDB;
