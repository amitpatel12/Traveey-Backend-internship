const mongoose = require('mongoose');
  // _id: mongoose.Schema.Types.ObjectId,
// Define schema
const TaskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true
    // default: Date.now
  },
  employeeId: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
module.exports = mongoose.model('task', TaskSchema);

