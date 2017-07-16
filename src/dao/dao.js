const Mongodb = require('mongodb');
const logger = require('../../Logs/logger');
const mongoURI = require('../config/appConfig').mongoURI;
let MongoClient = Mongodb.MongoClient;
let databaseObj;

function connect(uri) {
  return new Promise(function(resolve, reject) {
    MongoClient.connect(uri)
    .then((db) => {
      databaseObj = db;
      resolve('Connected to database');
    })
    .catch((err) => {
      reject(err)
    });
  });
}

function insert(dataObj, collection) {
  return new Promise(function(resolve, reject) {
    databaseObj.collection(collection).insertOne(dataObj)
    .then((result) => {
      resolve(result.insertedCount);
    })
    .catch((err) => {
      logger.error(err);
      reject('Error in inserting data');
    });
  });
}

function findOne(parameters, collection) {
  return new Promise(function(resolve, reject) {
    databaseObj.collection(collection).findOne(parameters)
    .then(resolve)
    .catch((err) => {
      logger.error(err);
      reject('Error in fetching data');
    });
  });
}

module.exports = {
  connect,
  insert,
  findOne
};
