import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import "/Users/diana/Desktop/Foodie Project/client/src/BlogForm.css";

import { useNavigate } from "react-router-dom";

let initialValue = {
    nameOfRestaurant: "",
    category: "",
    rating: "",
    address: "",
    imageUrl: "",
};

function BlogForm({ getAllRestaurants }) {
    const navigate = useNavigate();
    const [blogForm, setBlogForm] = useState(initialValue);
    const [selectedCategory, setSelectedCategory] = useState("");

    let decoded;
    const token = localStorage.getItem("auth-token");

    try {
        if (token) {
            decoded = jwtDecode(token);
            console.log("Decoded Token:", decoded);
        }
    } catch (error) {
        console.log(error);
    }

    function handleChange(e) {
        console.log(e.target);
        const { name, value } = e.target;

        // Update blogForm state
        setBlogForm({ ...blogForm, [name]: value });

        // Update selectedCategory if the category dropdown changes
        if (name === "category") {
            setSelectedCategory(value);
        }
    }

    async function handleCreateRestaurant(e) {
        e.preventDefault();
        try {
            let newRestaurant = {
                nameOfRestaurant: blogForm.nameOfRestaurant,
                category: selectedCategory || blogForm.category,
                author: decoded.userId,
                rating: blogForm.rating,
                address: blogForm.address,
                imageUrl: blogForm.imageUrl,
            };

            let res = await axios.post("https://foodie-s5wq.onrender.com/restaurants/create", newRestaurant);
            alert(res.data.msg);
            getAllRestaurants();
            setBlogForm(initialValue); // Reset form
            setSelectedCategory(""); // Reset dropdown
            navigate("/restaurants");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="BlogForm">
            <h1>🍱 New Restaurant</h1>
            <p>⭐ You can fill this form in order to add a new listing ⭐</p>
            <form onSubmit={handleCreateRestaurant}>
                <div>
                    <label htmlFor="restaurant-name">Name of Restaurant</label>
                    <input
                        id="restaurant-name"
                        type="text"
                        value={blogForm.nameOfRestaurant}
                        name="nameOfRestaurant"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        id="dropdown-category"
                        value={selectedCategory}
                        name="category"
                        onChange={handleChange}
                    >
                        <option value="">-- Select an option --</option>
                        <option value="asian">Asian</option>
                        <option value="italian">Italian</option>
                        <option value="mexican">Mexican</option>
                        <option value="japanese">Japanese</option>
                        <option value="indian">Indian</option>
                        <option value="mediterranean">Mediterranean</option>
                        <option value="traditional">Traditional</option>
                        <option value="sushi">Sushi</option>
                        <option value="cafe">Cafe</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="rating">Rating</label>
                    <input
                        id="rating"
                        type="text"
                        value={blogForm.rating}
                        name="rating"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        type="text"
                        value={blogForm.address}
                        name="address"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="imageUrl">Image</label>
                    <input
                        id="imageUrl"
                        type="text"
                        value={blogForm.imageUrl}
                        name="imageUrl"
                        onChange={handleChange}
                    />
                </div>

                <input type="submit" value="Add Listing" />
            </form>
        </div>
    );
}

export default BlogForm;
