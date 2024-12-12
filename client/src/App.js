import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from "./components/Register";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import RestaurantsList from "./components/RestaurantsList";
import Navbar from "./components/Navbar";

import "/Users/diana/Desktop/Foodie Project/client/src/BlogForm.css";

function App() {

const [restaurants, setRestaurants] = useState([]);

async function getAllRestaurants () {
  try {
      let res = await axios.get ("https://foodie-s5wq.onrender.com/restaurants/");
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

// Delete Restaurant

async function deleteRestaurant (id) {
  try {
    if (window.confirm ("Are you sure?")) {
    let res = await axios.delete (`https://foodie-s5wq.onrender.com/restaurants/${id}`);
    setRestaurants (restaurants.filter ((restaurant) => restaurant._id !== res.data.deleteRestaurant._id))
    }
  } catch (error) {
    console.log(error);
  }
}

// Edit Restaurant
async function editRestaurant (id, updatedData) {
  try {
    let res = await axios.put(`https://foodie-s5wq.onrender.com/restaurants/${id}`, updatedData);
    setRestaurants (restaurants.map ((restaurant) => restaurant._id === id ? res.data.updatedRestaurant : restaurant));
  } catch (error) {
    console.log(error);
  }

}

  return (
    
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/newListing" element={<BlogForm getAllRestaurants = {getAllRestaurants}/>}/>
        <Route path="/restaurants" element={<RestaurantsList restaurants = {restaurants} deleteRestaurant={deleteRestaurant} editRestaurant={editRestaurant}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
