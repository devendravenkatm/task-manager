import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // User's username (required, unique, and trimmed)
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  
  // User's email (required, unique, trimmed, and validated)
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true, // Converts email to lowercase
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'], // Validates email format
  },
  
  // User's password (required and validated for minimum length)
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  
  // Date when the user was created, with a default value of the current date
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Array of task references associated with the user
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task' // Links each task to the Task model
  }]
});

// Middleware to hash the password before saving to the database
userSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it's new or modified
    if (!this.isModified('password')) {
      return next();
    }
    
    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error); // Passes any error to the next middleware
  }
});

// Method to compare input password with the hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password); // Returns true if passwords match
  } catch (error) {
    throw new Error('Error comparing passwords'); // Throws an error if comparison fails
  }
};

// Export the User model based on the schema
const User = mongoose.model('User', userSchema);
export default User;
