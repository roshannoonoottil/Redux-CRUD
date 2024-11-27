const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT;

const signup = async (req, res) => {
        
        try {
        console.log('signup function in controller');
        console.log(req.body);
        console.log("image-->",req.file);
        
        const {userName, mobile, email, password} = req.body;
        let user = await userModel.findOne({email})
        console.log("User Exist : ",user);
        if (user) return res.status(400).send("This email is already used.");

        const hashPass = await bcrypt.hash(password, 10);
        console.log('hashed password', hashPass);

        const imagePath = `/images/${req.file.filename}`;

        const userData = new userModel({
                userName,
                mobile,
                email,
                password: hashPass,
                isAdmin:'false',
                image: imagePath

        });

        await userData.save();
        console.log("Saved data", userData);
        res.json({ data: "User data saved in database" });
        } catch(err){
                console.log("Error at user Register", err);
        }

};

const login = async (req, res)=>{

        try {

        const userData = await userModel.findOne({email: req.body.email})
        if(userData){
                const isValidPassword = await bcrypt.compare(req.body.password, userData.password);
                if(isValidPassword){
                        const userDetails = {
                        userId: userData._id,
                        name: userData.name,
                        email: userData.email,
                        mobile: userData.mobile,
                        image: userData.imagePath,
                        createdAt: userData.createdAt,
                        }
                        const token = jwt.sign(userDetails, process.env.USER_JWT_SCRECT,{ expiresIn: '1h' } )
                        res.json({ success: true, token: token, data: userDetails });
                        console.log('user signin');
                        
                } else {
                        res.json({ success: false, message: "Invalid password" });
                    }
        }  else {
                res.json({ success: false, message: 'Invalid email' });
            }
                
        } catch (error) {
                console.log("login error", error);
                
        }

}


const home = async (req, res) => {
        try {
            console.log("Welcome to home page");
    
            const userData = await userModel.findOne({ email: req.user.email }).select('-password');
    
            if (!userData) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
    
            res.json({
                success: true,
                message: "Token verification success",
                data: userData,
            });
        } catch (e) {
            console.log("Error in the home controller:", e);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    };
    

    const userEdit = async (req, res) => {
        try {

            const userId = req.user.userId;
    
            console.log('updating data => ', req.body);
            console.log('updating image => ', req.file);
    
            const { userName, email, mobile } = req.body;
    
            const updateData = { userName, mobile, email };
    
            if (req.file) {
                const imagePath = `/images/${req.file.filename}`;
                updateData.image = imagePath;
            }
    
            const updatedUser = await userModel.findOneAndUpdate(
                { _id: userId },
                { $set: updateData },
                { new: true, upsert: true }
            );
    
            console.log('Updated Data => ', updatedUser);
            res.json({ msg: 'Data updated successfully', data: updatedUser });
    
        } catch (err) {
            console.log('Error in user edit:', err);
            res.status(500).json({ msg: 'Internal server error' });
        }
    };
    

module.exports = {signup, login, home, userEdit};