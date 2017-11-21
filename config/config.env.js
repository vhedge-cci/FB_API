/*
  Description : Add all the app related configuration data in this file. DO NOT ADD project functionality specific settings here.
  Note :
  Important links :
*/

module.exports = {
    ports: [9902],
    //Database Configs
    mongoUrl: "mongodb://localhost:27017/TestAppCollections",
    dataLimit: "50mb",
    envDevelopment: "development"

};
