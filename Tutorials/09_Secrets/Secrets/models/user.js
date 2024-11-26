const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Crea el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
