var express = require('express');
var router = express.Router();
var usersRouter = require("./users");
var studentRouter = require("./student");
var facultyRouter = require("./faculty");

const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IE' });
});

router.use("/users", usersRouter);
router.use("/student", passport.checkStudent, studentRouter);
router.use("/faculty", passport.checkFaculty, facultyRouter);

module.exports = router;
