const express = require('express');
const app = express();
const restaurantRoutes = require("./routes/restaurants.routes");
const userRoutes = require("./routes/user.routes")

// initializing the app with connecting the main server.js file with connection file of mongoose and mongoDB
const connection = require("./config/connection");

const cors = require("cors");
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(cors());


// handling different routes in server
app.use ("/restaurants", restaurantRoutes);
app.use ("/users", userRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})