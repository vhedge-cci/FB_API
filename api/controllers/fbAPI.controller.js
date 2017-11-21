/*
  Description : This controller will have methods to retrive data from facebook public pages.
*/

var FbAPI = function () {
    var async = require('async');
    var mongoose = require('mongoose');
    var HttpStatus = require('http-status-codes');
    var FB = require('fb');
    var http = require('http');
    this.params = {};
    this.config = require('../../config/config.js');
    var self = this;

    
    //steps to run
    //Generate user access token https://developers.facebook.com/tools/explorer/
    //select manage_pages and pages_show_list permissions while generating token.
    //use that token in config.js file and replace user_access_token value.
    //run these commands
    //1. mongod
    //2. node host/bin/www
    //and then run this get API.
    //http://localhost:9902/api/fbAPI
    this.fbAPI = function (req, res) { 
        var newsChannels = self.config.req_inputs
        var newsRatings = [];
        async.each(newsChannels, function (newsChannel, callback) {
            FB.api(
                newsChannel,
                self.config.getAPI,
                {
                    fields: self.config.req_fields,
                    access_token: self.config.user_access_token
                },
                function (res) {
                    newsRatings.push(res)
                    callback(null,newsRatings)
                }
            );

        }, function (err) {
            if (err) {
            } else {
                return res.status(HttpStatus.OK).json({ "Sorted by fan count(likes) ": newsRatings.sort(function(a, b){return b.fan_count-a.fan_count}) })
            }
        });
    }

}

module.exports.FbAPI = FbAPI;