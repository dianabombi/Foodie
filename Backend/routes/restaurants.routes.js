const express = require("express");
const router = express.Router();

// we are bringing the code from different block
const {
    getAllRestaurants, 
    getRestaurantById, 
    createPostRestaurant, 
    updateRestaurant, 
    deleteRestaurant, 
} = require ("../controller/restaurant.controller");


// CRUD operations = we will add different routes (we can create how many routes we want)

router.get ("/", getAllRestaurants);
router.get ("/:id", getRestaurantById); 
router.post ("/create", createPostRestaurant);
router.put ("/:id", updateRestaurant);
router.delete ("/:id", deleteRestaurant);

module.exports = router; // this is used for exporting model "router" object to the different files 
