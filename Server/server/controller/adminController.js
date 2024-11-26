const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const login = async (req, res) => {
    try {
        console.log('adminLoginPost enter');
        console.log(req.body)
        const adminData = await userModel.findOne({ email: req.body.email });
        if (adminData) {
            const passwordMatch = await bcrypt.compare(req.body.password, adminData.password)
            if (passwordMatch) {
                if (adminData.isAdmin) {
                    const Data = {
                        userName: adminData.name,
                        email: adminData.email,
                        mobile: adminData.mobile,
                        image: adminData.imagePath,
                        createdAt: adminData.createdAt,
                    }
                    const token = jwt.sign(Data, process.env.ADMIN_JWT_SCRECT)
                    res.json({ success: true, token: token })
                } else {
                    res.json({ success: false, message: 'you or not otherized' })
                }
            } else {
                res.json({ success: false, message: "invalid password" });
            }
        } else {
            res.json({ success: false, message: "invalid email address" })
        }
    } catch (e) {
        console.log('error in the adminLoginPost : ', e);
    }
};



const adminVerification = async (req, res, next) => {
    const headers = req.headers.authorization;
    const token = headers && headers.split(' ')[1];

    if (!token) {
        return res.json({ success: false, message: "No token provided. Please log in." });
    }

    jwt.verify(token, process.env.ADMIN_JWT_SCRECT, async (err, data) => {
        if (err) {
            return res.json({ success: false, message: "Invalid token." });
        }

        const adminData = await userModel.findOne({ email: data.email });

        if (!adminData || !adminData.isAdmin) {

            return res.json({ success: false, message: "Unauthorized. Admin access required." });
        }

        req.admin = adminData;

        next();
    });
};


const home = async (req, res) => {
    try {
        console.log('adminHome');
        const userData = await userModel.find({ isAdmin: false });
        console.log(userData)
        res.json({ success: true, userData: userData })
    } catch (e) {
        console.log('error in the adminhome :', e)
    }
}

const deleteUser = async (req, res) => {
    try {
        console.log('deleteUser entered')
        console.log(req.body)
        await userModel.deleteOne({ email: req.body.email })
        res.json({ success: true, data: 'email got' })
    } catch (e) {
        console.log('error in the deleteUser : ', e);
    }
}

const adminLogot = (req, res) => {
    try {
        console.log('adminLogot');
        res.send('adminLogot');
    } catch (e) {
        console.log('error in the adminLogout : ', e);
    }
}


module.exports = {login, adminVerification, home, deleteUser, adminLogot};
