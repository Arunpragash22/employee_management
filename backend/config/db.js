const mongoose = require('mongoose');

const connectDB = async () => {
  // Avoid reconnecting if already connected/connecting (important in
  // serverless environments where this can be called on every invocation)
  if (mongoose.connection.readyState !== 0) {
    return;
  }

  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/employee_management';
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    // Don't process.exit here — that would crash a serverless function.
    // Let the request fail naturally so the platform can retry.
    throw err;
  }
};

module.exports = connectDB;
