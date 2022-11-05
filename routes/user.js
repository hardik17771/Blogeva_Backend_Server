const express = require('express');
const User= require("../models/users.model");
const config= require("../config");
const jwt= require("jsonwebtoken");
const router = express.Router();
const middleware= require("../middleware");

router.route("/:username").get(middleware.checkToken, (req, res) => {
  User.findOne({ username: req.params.username }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    return res.json({
      data: result,
      username: req.params.username,
    });
  });
});

router.route("/login").post((req, res) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result === null) {
      return res.status(403).json("Username incorrect");
    }
    if (result.password === req.body.password) {
      
      let token = jwt.sign({ username: req.body.username }, config.key,
        
         {
        expiresIn: "24h"
      });
      
      res.json({
        token: token,
        msg: "success",
      });
    } else {
      res.status(403).json("password is incorrect");
    }
  });
});

router.post('/register',async(req, res) => {
    console.log(req.body);
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
   await user
      .save()
      .then(() => {
        console.log("user registered");
        return res.status(200).json({ msg: "User Successfully Registered" });
      })
      .catch((err) => {
        res.redirect('/');

        return res.status(403).json({ msg: err });
        
      });

      console.log(user);

     
     
  });
  


router.get('/register',(req,res,next)=>{
 res.render('register')
 
})
router.route("/update/:username").patch(middleware.checkToken,(req,res)=>
{
  User.findOneAndUpdate(
    {
      username:req.params.username},
{
  $set:{ password:
  req.body.password}},
  (err, result) => {
    if(err) return res.status(500).json({msg: err});
    const msg={
      msg: "Password successfully updated",
      username: req.params.username,
    };
    return res.json(msg);
  }
  );
    }
);
router.route("/delete/:username").delete(middleware.checkToken,(req,res)=>
{
  User.findOneAndDelete(
    {
      username:req.params.username},

  (err, result) => {
    if(err) return res.status(500).json({msg: err});
    const msg={
      msg: "Blogeva User deleted successfully",
      username: req.params.username,
    };
    return res.json(msg);
  }
  );
    }
);

  module.exports =  router;