const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel'); 

const verifyAdmin = async (req, res, next) => {
    try {
       
        const authHeader = req.headers.authorization;

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token missing. Please log in.' });
        }

        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SCRECT);
        console.log('Decoded Admin Token Data =>', decoded);

        const userData = await userModel.findOne({ email: decoded.email });
        
        if (!userData || !userData.isAdmin) {
            return res.status(403).json({ success: false, message: 'Unauthorized. Admin access required.' });
        }


        req.admin = userData;

        next();
    } catch (err) {
        console.error('Error in verifyAdmin middleware:', err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' });
        }

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }

        res.status(500).json({ success: false, message: 'An error occurred during token verification.' });
    }
};

module.exports = verifyAdmin;
