"use strict"
const express = require('express');
const router = express.Router();
const dbHelper = require('../database/database');
// for validation
const { check, validationResult } = require('express-validator');

const homeRouter = require("./routes/home.js")
const showsRouter = require("./routes/shows.js")
const loginRouter = require("./routes/login.js")

router.get('/', (req, res) => {
  res.render('index', {title: 'Homepage'});
});

router.use('/home', homeRouter);
router.use('/shows', showsRouter);
router.use('/login', loginRouter); // dunno if this is right


router.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// router.METHOD(route, (req, res) => {
//   // callback function
//      req is an object full of information that’s coming in (such as form data or query parameters)
//      res is an object full of methods for sending data back to the user
//        an optional next parameter, which is useful if you don’t actually want to send any data back, 
//         or if you want to pass the request off for something else to handle.
// });

module.exports = router;