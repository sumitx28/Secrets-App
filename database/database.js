const md5 = require("md5");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/userDB").then(function(){
    console.log("db connected");
});

const userSchema = new mongoose.Schema({
    email : String,
    password : String
})

// userSchema.plugin(encrypt , {secret : process.env.SECRET_KEY , encryptedFields : ["password"]});



const User = mongoose.model("User" , userSchema);

module.exports.users = User;