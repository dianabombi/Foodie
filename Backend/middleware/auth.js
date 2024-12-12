// Token has no relationship with database, it is just generated with log in and sent back to the client
// when Token is expired, User is logged out from the webpage
// each time, when User is logged in to the Webpage, new token is generated

const jwt = require ("jsonwebtoken");

async function verifyToken (req, res, next) {
    let authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).send ({
            msg: "Unauthorized user, Token not found"
        });
    }

    // Split and get the token - will split token for two parts, with separator "space" and will retrieve 1st index value
    let clientToken = authHeader.split (" ")[1];

    try {
        // Verification of token
        let decoded = jwt.verify(clientToken, process.env.SECRET_KEY, {expiresIn: "1h"});

        // console.log(decoded);
        if (!decoded) {
            return res.send ({
                msg: "Invalid token"
            });
        }
        // Attach the decoded token data to the request object
        req.user = decoded;

        //Call the next middleware
        next ();
    } catch (error) {
        console.log ("error", error);

        //Send an error response if the token verification fails
        return res.status(401).send ({
            msg: "Invalid token", error
        })
    }
}

module.exports = verifyToken;