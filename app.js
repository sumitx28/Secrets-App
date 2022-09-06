const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const exp = require("constants");
const db = require("./database/database.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/" , function(req , res){
    res.render("home");
})


app.route("/login")
    .get(function(req , res){
        res.render("login");
    })
    .post(function(req , res){
        
        db.users.findOne({email : req.body.username} , function(err , foundUser){
            if(err){
                console.log(err);
            }
            else{
                if(foundUser){
                    bcrypt.compare(req.body.password , foundUser.password , function(err , result){
                        if(result){
                            res.render("secrets");
                        }
                        else{
                            res.redirect("/login");
                        }
                    })

                }
                else{
                    res.redirect("/login");
                }
            }
        })
    })

app.route("/register")
    .get(function(req , res){
        res.render("register");
    })
    .post(function(req , res){

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const User = new db.users({
                email : req.body.username,
                password : hash
            })

            User.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.render("secrets"); 
                }
            })

        });

    });



app.listen(3000 , function(){
    console.log("Server started");
})