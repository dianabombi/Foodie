import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Navbar() {

  const navigate = useNavigate();
  let token;
  let decoded;
  token = localStorage.getItem("auth-token");
 
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

function handleLogout () {
  if (localStorage.getItem("auth-token")) {
    localStorage.removeItem("auth-token");
    navigate("/login");
  }
}


  // "link to" works the same way like href in html 
  return ( 
    <div style={{display: "flex", justifyContent: "space-around", padding: "50px" }}>
      
      {token? ( 
      <>
       <h4>Welcome {decoded.email}</h4>
       <Link to="/newListing">Add your favorite restaurant</Link>
       <Link to="/restaurants">Restaurants</Link> 
       <Link to="/login" onClick={handleLogout}>Log out</Link> 
      </>
       ) : (
      <>  
       <Link to="/register">Register</Link>
       <Link to="/login">Log in</Link> 
      </> 
    
    )}
    </div>
  );
}
export default Navbar;