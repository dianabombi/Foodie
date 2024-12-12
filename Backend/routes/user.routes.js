const express = require("express");
const router = express.Router();

const {register, login} = require("../controller/user.controller")


// user Routes

router.post ("/register", register);
router.post ("/login", login);

module.exports = router;

// we need to user routes in the Server.js, in order to connect it through the server
// in part "handling different routes in server" + we need to require it also in the beginning of Server.js file

