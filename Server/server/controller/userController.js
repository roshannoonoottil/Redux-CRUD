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











module.exports = {signup};