const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(
      "Connection established with userModel successful !!"
    );
  })
  .catch((error) => {
    console.log("Error while connecting mongodb", error);
  });

const userData = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },

  mobile: {
    type: Number,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type: String,
    trim: true,
  },

  isAdmin: {
    type: Boolean,
    trim: true,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

module.exports = mongoose.model("user", userData);