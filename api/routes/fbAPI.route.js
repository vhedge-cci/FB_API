/*
  Description : Use this route file for functionality related to a facebook API's.
*/


var express = require('express');
var router = express.Router();
var FbAPICtrl = new(require('../controllers/fbAPI.controller')).FbAPI();
this.config = require('../../config/config.js');

/*
  Description:  
    Get details of the requested pages sorted by their fan count(likes).
    http://localhost:9902/api/fbAPI
*/
router.get("/", FbAPICtrl.fbAPI);


module.exports = router;