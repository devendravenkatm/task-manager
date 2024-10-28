import mongoose from 'mongoose';
// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  // Title of the task (required field)
  title: {
    type: String,
    required: true,
  },
  
  dueDate: {
    type: Date,
    required: false,
  },
  
  description: {
    type: String,
    required: false,
  },
  
  category: {
    type: String,
    required: false,
  },
  
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'completed'],
    default: 'to-do',
  },
  
  // ID of the user who created this task, linking it to the User model
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Uses MongoDB ObjectId type
    required: true, // Ensures each task is linked to a user
    ref: 'User', // Reference to the User model if it exists
  },
});
// Export the Task model based on the schema
const Task = mongoose.model('Task', taskSchema);
export default Task;
