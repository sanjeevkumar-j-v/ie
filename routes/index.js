var express = require('express');
var router = express.Router();
var usersRouter = require("./users");
var studentRouter = require("./student");
var facultyRouter = require("./faculty");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IE' });
});

router.use("/users", usersRouter);
router.use("/student", studentRouter);
router.use("/faculty", facultyRouter);

module.exports = router;
