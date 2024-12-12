const User = require("../models/user");
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

// first controller = REGISTER

const register = async (req, res) => {
    try {
        let {userName, email, password}= req.body;
        if (!userName || !email || !password) 
            return res.status(400).send({
            msg:"All information: username, email, password are required",
            status: false,
        });
        let oldUser = await User.findOne ({email});
        if (oldUser) 
            return res.send ({
            msg: "User already exists, please login or signup with new email",
        });
        
        const saltRounds = parseInt(process.env.SALT_ROUND, 10); 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        return res.send ({msg:"User has been successfully registered.", status: true});
    } catch (error) {
        return res.status(500).send ({msg: "Internal server error", error });
    }
};


// second controller  = LOGIN

const login = async (req, res) => {
    try {
        let {email, password}= req.body;
        if (!email || !password) {
            return res.status(400).send({
            msg: "For sign in process, email and password are required.",
        });

        }
        let registeredUser = await User.findOne ({email});
        if (!registeredUser) {
            return res.send ({
            msg: "User doesn't exist please sign up first",
        });
        }

        let isPasswordValid = await bcrypt.compare (
            password, // this password we have received from req.body
            registeredUser.password // and hashed password
        );
        if (!isPasswordValid) {
            return res.send ({ msg: "Invalid or wrong password", status: false });
        }

        // token 

        let payload = {
            userId: registeredUser._id,
            email: registeredUser.email,
        };

        let token = await jwt.sign (payload, process.env.SECRET_KEY); // sha@123456789 = secret key
        return res.send({
            msg: "Login successfully", 
            token,
            status: true,
        });

    } catch (error) {
        return res.status(500).send ({msg: "Internal server error", error, status: false });
    }
};

module.exports = { register, login };