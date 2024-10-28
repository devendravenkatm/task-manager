import { connect } from 'mongoose';
import { config } from 'dotenv';

// Load environment variables from .env file (e.g., MongoDB URI)
config();

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variables
    await connect(process.env.ATLAS_URI);
    console.log('MongoDB Connected'); // Log success message if connection is established
  } catch (error) {
    console.error('MongoDB connection error:', error); // Log error message if connection fails
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDB;
