const mongoose = require('mongoose');

// SCHEMA

const userSchema = new mongoose.Schema ({
    userName: {type: String, required: true},
    email: {type: String, required: true, lowercase: true},
    password: {type: String, required: true},
  }, {timestamps: true}
);


// MODEL - always with capital letter in the beginning and singular 

const User = mongoose.model('User', userSchema);

module.exports = User;

