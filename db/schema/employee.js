const mongoose = require('mongoose');

// Define schema
const UserSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  hireDate: {
    type: Date,
    required: true
    // default: Date.now
  },
  position: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
module.exports = mongoose.model('User', UserSchema);

// module.exports = User;
