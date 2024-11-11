const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT;

const signup = async (req, res) => {
    
        console.log('signup function in controller');
        console.log(req.body);
        
        
    
}











module.exports = {signup};