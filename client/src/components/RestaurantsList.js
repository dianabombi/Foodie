import React from "react";
import axios from "axios";
import {useState, useEffect, navigate} from "react";
import {jwtDecode} from "jwt-decode";
import "/Users/diana/Desktop/Foodie Project/client/src/RestaurantsList.css";


function RestaurantsList ({restaurant, deleteRestaurant, editRestaurant}) {

  let token =  localStorage.getItem("auth-token");
  let decoded;

  try {
    if (token) {
    decoded = jwtDecode(token);
    console.log("Decoded Token:", decoded);

    const currentTime = Date.now() / 1000; // Convert to seconds, if statement will check if the token is expired
    if (decoded.exp < currentTime) {
      console.log("Token expired. Logging out.");
      localStorage.removeItem("auth-token");
      navigate("/login");
    }}
  } catch (error) {
    console.log(error)
  }

const [restaurants, setRestaurants] = useState([]);
const [editingId, setEditingId] = useState(null);
const [editFormData, setEditFormData] = useState({});

const handleEditClick = (restaurant) => {
    setEditingId(restaurant._id);
    setEditFormData({
      nameOfRestaurant: restaurant.nameOfRestaurant,
      category: restaurant.category,
      author: restaurant.author,
      rating: restaurant.rating,
      address: restaurant.address,
      imageUrl: restaurant.imageUrl,
    });
  };


  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Save the updated data
  const handleSave = () => {
    editRestaurant(editingId, editFormData);
    setEditingId(null); // Exit edit mode
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };
    
async function getAllRestaurants () {
    try {
        let res = await axios.get ("http://localhost:8000/restaurants/");
        console.log(res.data);
        setRestaurants(res.data);
    } catch (error) {
        console.log(error);
    }
  }

// Use Effect is a hook, which is helping to perform side effects of components
  // to interact with API, fetch data, set up timers, subscriptions etc.

  useEffect (() => {
    getAllRestaurants();
}, []);

return (
  <div className="restaurant-page">
    <div className="restaurant-list">
    <h1>Your recommendations</h1>
    <div className="cards-container" >
     
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="restaurantCard">
          {editingId === restaurant._id ? (
            // Edit Form
            <div>
            <input
                name="nameOfRestaurant"
                value={editFormData.nameOfRestaurant}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <input
                name="category"
                value={editFormData.category}
                onChange={handleInputChange}
                placeholder="Category"
            />
            {/* <input
                name="author"
                value={editFormData.author}
                onChange={handleInputChange}
                placeholder="Author"
            /> */}
            <input
                name="rating"
                value={editFormData.rating}
                onChange={handleInputChange}
                placeholder="Rating"
            />
            <input
                name="address"
                value={editFormData.address}
                onChange={handleInputChange}
                placeholder="Address"
            />
            <input
                name="imageUrl"
                value={editFormData.imageUrl}
                onChange={handleInputChange}
                placeholder="Image URL"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
            </div>
                ):(
            // Restaurant Card
            <div key={restaurant._id} className = "restaurantCard">
                <h2>{restaurant.nameOfRestaurant}</h2>
                <img src={restaurant.imageUrl} alt="restaurant" width="300px" height="200px"/>
                <h4>{restaurant.author?.name || "Unknown Author"}</h4>
                <p>{restaurant.category}</p>
                <p><b>Rating: {restaurant.rating} ⭐</b></p>
                <p>{restaurant.address}</p>

                <div>
                  {token && restaurant.author && decoded?.userId && restaurant.author._id === decoded.userId ? (
                    <>
                      <button onClick={() => handleEditClick(restaurant)}>Edit</button>
                      <button onClick={() => deleteRestaurant(restaurant._id)}>Delete</button>
                    </>
                  ) : null}
                </div>
              </div>
            )}
      </div>  
    ))}
</div>   
</div>   
</div>
);
}

export default RestaurantsList;