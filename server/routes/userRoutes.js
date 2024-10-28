import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Secret key for JWT; recommended to store in .env

// Helper function to create a JWT for authenticated sessions
const createToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email }, // Payload containing user ID and email
    JWT_SECRET,
    { expiresIn: '24h' } // Token expiration set to 24 hours
  );
};

// Register endpoint to create a new user account
router.post(['/register', '/api/register'], async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log('Registration attempt for email:', email);

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Normalize email to handle case-insensitivity
    const normalizedEmail = email.toLowerCase();

    // Check if email or username is already registered
    const existingUser = await User.findOne({ $or: [{ email: normalizedEmail }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already registered' });
    }

    // Create a new user with hashed password (handled in User model) and save
    const user = new User({ username, email: normalizedEmail, password });
    await user.save();
    console.log('User registered successfully:', normalizedEmail);

    // Generate a token to auto-login the user after registration
    const token = createToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      email: user.email,
      username: user.username
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login endpoint to authenticate an existing user
router.post(['/login', '/api/login'], async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt for email:', email);

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Normalize email to handle case-insensitivity
    const normalizedEmail = email.toLowerCase();

    // Find the user by email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log('User not found:', normalizedEmail);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Invalid password for email:', normalizedEmail);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login - generate token
    const token = createToken(user);
    console.log('Login successful for user:', normalizedEmail);

    // Send response with token, userId, email, and username
    res.json({
      message: 'Login successful',
      token,
      userId: user._id.toString(),
      email: user.email,
      username: user.username
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


router.get('/users', async (req, res) => {
  
  try {
    const users = await User.find({}, 'email username -_id'); // Fetch only email and username, excluding _id
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

export default router;
