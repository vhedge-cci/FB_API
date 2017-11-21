/*
  Description : This file will modify all responses sent by all APIs.
  	This file will prefix ")]}" to all responses for JSON Vulnerability Protection.

  Link: https://docs.angularjs.org/api/ng/service/$http

*/

var modifyResponseBody = function(req, res, next) {
    var oldSend = res.send;
    res.send = function(data) {
        // arguments[0] contains the response body
        arguments[0] = ")]}',\n" + arguments[0];
        oldSend.apply(res, arguments);
    }
    next();
};


module.exports = modifyResponseBody;
