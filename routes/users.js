var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require('../models/user');

router.get("/profile", passport.checkAuthentication, function (req, res) {
  return res.render("profile");
});

router.get("/sign-up", function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/student');
  }
  return res.render("signup");
});
router.get("/sign-in", function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/student');
  }
  return res.render("signin");
});

router.post("/create", function (req, res) {
  // if (req.body.password != req.body.confirm_password) {
  //   return res.redirect('back');
  // }
  User.findOne({userid: req.body.userid}, function(err, user){
      if(err){console.log('Error in finding user in signing up'); return;}

      if(!user) {
        User.create(req.body, function(err, user){
            if(err){console.log('Error in creating user in signing up: ', err); return;}
            console.log("User: ", user);
            return res.redirect('/users/sign-in');
        })
      }else{
          return res.redirect('back');
      }

  });
  // return res.redirect("/");
});
router.get("/sign-out", function (req, res) {
  req.logout();
  return res.redirect("/");
});

router.post(
  "/create-session",
  // use passport as middleware to authenticate
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  function (req, res) {
    // after login, redirect to faculty page by default
    // if the user is student it will be automatically redirected to student page
    return res.redirect('/faculty');
  }
);

module.exports = router;