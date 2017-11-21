var express = require("express");
var path = require('path');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var fbAPI = require('./routes/fbAPI.route');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, '../host/views'));
app.set('view engine', 'pug');

app.use('/fbAPI', fbAPI);

module.exports = app;
