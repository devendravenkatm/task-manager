import express from 'express';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the configuration in connectDB function
connectDB();

const app = express();

// Apply security best practices with Helmet
app.use(helmet());

// Configure CORS to allow requests from the frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:4200', // Allow specific frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers for requests
  credentials: true, // Allow cookies and other credentials to be sent
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Use body-parser to handle JSON and URL-encoded data
app.use(json());
app.use(urlencoded({ extended: true }));

// Mount route handlers
app.use('/api/users', userRoutes); // Routes for user registration, login, etc.
app.use('/api/tasks', taskRoutes); // Routes for managing tasks

// Error handling middleware to catch server-side errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined // Detailed error in development
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path  // Helps in debugging missing routes
  });
});

// Set server port from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
