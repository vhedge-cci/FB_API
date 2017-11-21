var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('express-cors');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var constants = require('../libraries/constants.js');
var CommonLib = require('../libraries/common').Common;
var responseModifier = require('../libraries/responseModifier.middleware');

//For Logging Purpose
var fs = require('fs');

var config = require('../config/config.js');
var envConfig = require('../config/config.env.js');
// [SH] Bring in the Passport config after model is defined
// require('../api/libraries/passport.js');

var cronjobs = require("../cronjobs/app");
var api = require("../api/app");
var setup = require("../setup/app");
var errors = require("./errors/app");

//It instantiates Express and assigns our app variable to it
var app = express();

// parse application/json
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    // CommonLib.logging(req, req.body)
    currReq = req.url;
    currReqMethod = req.method;
    console.log("\033[34m \033[1m" + req.method,
        "\033[36m \033[1m REQUEST URL: " + "\033[32m " + req.url,
        "\033[36m \033[1m REQUEST TIME: " + "\033[32m " + new Date() + "\033[31m ");
    next();
});

//app.use(logger('dev'));

app.use(bodyParser.json({ limit: envConfig.dataLimit }));
app.use(bodyParser.urlencoded({ limit: envConfig.dataLimit, extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(multer({ dest: '../public/temp/' }).single('file'));
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

//prefixing ")]}" to all responses for JSON Vulnerability Protection.
app.use(responseModifier); 

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

//Sub-Apps
app.use("/cronjob", cronjobs);
app.use("/api", api);
app.use("/setup", setup);
// app.use(errors);

module.exports = app;
