const Restaurant = require("../models/restaurant"); // access to model itself

const getAllRestaurants = async (req, res) => {
    try {
       let restaurants = await Restaurant.find({}).populate("author");
       return res.send(restaurants);
    } catch (error) {
        return res.status(500).send ({msg: "Internal server error", error});
    }
};

const getRestaurantById = async (req, res) => {
    try {
        let restaurant = await Restaurant.findOne({_id: req.params.id});
        return res.send(restaurant);
    } catch (error){
        return res.status(500).send ({msg: "Internal server error", error});
    }
};

const createPostRestaurant = async (req, res) => {
    try {
        let newRestaurant = req.body;
        let newListing = await Restaurant.create(newRestaurant);
        return res.send({msg: "Created successfully", newListing});
    } catch (error){
        return res.status(500).send ({msg: "Internal server error", error});
    }
};

const updateRestaurant = async (req, res) => {
    try {
        let newValue = req.body;
        let id = req.params.id;
        let isRestaurantFound = await Restaurant.findOne ({_id: id});
        if (!isRestaurantFound) return res.send ({msg: "Restaurant not found"});
        let updateRestaurant = await Restaurant.findByIdAndUpdate (id, newValue, {new:true});
        return res.status(500).send ({msg: "Updated successfully", updateRestaurant});
    } catch (error){
        return res.status(500).send ({msg: "Internal server error", error});
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        let id = req.params.id;
        let isRestaurantFound = await Restaurant.findOne ({_id: id});
        if (!isRestaurantFound) return res.send ({msg: "Restaurant not found"});
        let deleteRestaurant = await Restaurant.findByIdAndDelete (id, {new:true});
        return res.status(500).send ({msg: "Deleted successfully", deleteRestaurant});
    } catch (error){
        return res.status(500).send ({msg: "Internal server error", error});
    }
};


module.exports = {
    getAllRestaurants, 
    getRestaurantById, 
    createPostRestaurant, 
    updateRestaurant, 
    deleteRestaurant, 
};