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
                        isAdmin: adminData.isAdmin,
                    }
                    const token = jwt.sign(Data, process.env.ADMIN_JWT_SCRECT,{ expiresIn: '1h' } )
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
        console.log('deleteUser entered');
        const userEmail = req.body.email;

        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await userModel.deleteOne({ email: userEmail });
        res.json({ success: true, message: `User with email ${userEmail} deleted successfully.` });
    } catch (e) {
        console.log('Error in the deleteUser:', e);
        res.status(500).json({ success: false, message: 'An error occurred during user deletion.' });
    }
};


const adminLogot = (req, res) => {
    try {
        console.log('adminLogot');
        res.send('adminLogot');
    } catch (e) {
        console.log('error in the adminLogout : ', e);
    }
}


module.exports = {login, home, deleteUser, adminLogot};
