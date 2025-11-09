const mongoose = require('mongoose');

const connectDatabase = () => {
  const MONGO_URI = process.env.MONGO_URI;
  
  if (!MONGO_URI) {
    console.error('❌ ERROR: MONGO_URI is not defined in .env file!');
    console.log('⚠️ Please create a .env file with MONGO_URI. See .env.example for reference.');
    return;
  }

  console.log('✅ Connecting to MongoDB...');
  
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully!'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('⚠️ Server will continue but database operations will fail.');
    });
};

module.exports = connectDatabase;
