const mongoose = require('mongoose');

// SCHEMA

const restaurantSchema = new mongoose.Schema ({
    nameOfRestaurant: {type: String, required: true},
    category: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    rating: {type: String},
    address: {type: String, required: true},
    imageUrl: {type: String}
  });


// MODEL - always with capital letter in the beginning and singular 

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;