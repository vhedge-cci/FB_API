/*
  Description : Use this file for adding functions that will be widely used in the application.
  Important link : https://www.npmjs.com/package/encryptjs

*/
var Common = function () {
    const csv = require('csvtojson');
    var async = require('async');
    var encrypt = require('encryptjs');
    var jwt = require('express-jwt');
    var jsonwebtoken = require('jsonwebtoken');
    var constants = require('../libraries/constants');
    var scope = this;
    this.params = {};
    this.config = require('../config/config.js');

    var self = this;

    /*
         encrypt: Encrypt plaintext with AES algorithm with the plain text and the bits to get the cipher text.
       */
    this.encrypt = function (plainText) {
        var cipherText = encrypt.encrypt(plainText, this.config.encryptionSecret, this.config.encryptionBitLength);
        return cipherText;
    }

    /*
      decrypt: Decrypt cipherText with AES algorithm with the cipher text and the bits to get the plain text.
    */
    this.decrypt = function (cipherText) {
        var plainText = encrypt.decrypt(cipherText, this.config.encryptionSecret, this.config.encryptionBitLength);
        return plainText;
    }


    //Logging Function
    // this.logging = function (logData, bodyData) {
    //     if (logData.headers['authorization']) {
    //         var token = logData.headers['authorization'].replace('Bearer ', '');
    //         jsonwebtoken.verify(logData.headers['authorization'].replace('Bearer ', ''), self.config.secret, function (err, decoded) {
    //             var currentUserId = '';
    //             if (err) {
    //                 currentUserId = '';
    //             } else {
    //                 currentUserId = decoded._id
    //             }

    //             var requestData = {
    //                 headers: logData.headers['authorization'],
    //                 method: logData.method,
    //                 url: logData.url,
    //                 body: bodyData,
    //                 userId: currentUserId,
    //                 date: new Date()
    //             }

    //             // var addLog = new Logs({ requestData });
    //             console.log("requestData  1",requestData)
    //             // addLog.save(function (err3) {
    //                 return requestData;
    //             // })
    //         })
    //     } else {
    //         var requestData = {
    //             method: logData.method,
    //             url: logData.url,
    //             body: bodyData,
    //             date: new Date()
    //         }

    //         // var addLog = new Logs({ requestData });

    //         console.log("requestData 2",requestData)
    //         // addLog.save(function (err3) {
    //             return requestData;
    //         // })
    //     }
    // }

    //Error Logging Function
    // this.errorLogging = function (errText, currReq, currReqMethod, callback) {
    //     console.log(currReq, currReqMethod)
    //     var errorData = {
    //         currReq: currReq,
    //         currReqMethod: currReqMethod,
    //         message: errText.message,
    //         stack: errText.stack,
    //         date: new Date()
    //     }

    //     var addErrorLog = new ErrorLog({ errorData });

    //      console.log("errorData ",errorData)
    //     addErrorLog.save(function (err3) {
    //         callback(null, errorData);
    //     })
    // }
    
};

module.exports.Common = new Common();
