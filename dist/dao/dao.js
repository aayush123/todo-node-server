'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;

function connect(uri) {
  MongoClient.connect(uri, function (err, db) {
    if (err) {
      console.log(err);
    } else {
      db.close();
    }
  });
}

exports.default = {
  connect: connect
};