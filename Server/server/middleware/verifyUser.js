const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ msg: "Authorization header missing." });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: "Token missing. Please log in." });
        }

        const decoded = jwt.verify(token, process.env.USER_JWT_SCRECT);

        console.log("Decoded Token Data =>", decoded);

        req.user = decoded;

        next(); 
        
    } catch (err) {
        console.error("Error in verifyUser middleware:", err);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token has expired. Please log in again." });
        }

        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ msg: "Invalid token. Please log in again." });
        }

        res.status(500).json({ msg: "An error occurred during token verification." });
    }
};

module.exports = verifyUser;
