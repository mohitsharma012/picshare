import mongoose from 'mongoose';

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

