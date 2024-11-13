const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT;

const signup = async (req, res) => {
        
        try {
        console.log('signup function in controller');
        console.log(req.body);
        const {userName, mobile, email, password} = req.body;
        let user = await userModel.findOne({email})
        console.log("User Exist : ",user);
        if (user) return res.status(400).send("This email is already used.");

        const hashPass = await bcrypt.hash(password, 10);
        console.log('hashed password', hashPass);

        const userData = new userModel({
                userName,
                mobile,
                email,
                password: hashPass,
                isAdmin:'false'

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
                        name: userData.name,
                        email: userData.email,
                        mobile: userData.mobile,
                        // image: userData.imagePath,
                        createdAt: userData.createdAt,
                        }
                        const token = jwt.sign(userDetails, process.env.JWT_SCRECT)
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











module.exports = {signup, login};