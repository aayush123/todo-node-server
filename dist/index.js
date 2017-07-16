'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _appConfig = require('./config/appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _dao = require('./dao/dao');

var _dao2 = _interopRequireDefault(_dao);

var _ApiRoutes = require('./routes/ApiRoutes');

var _ApiRoutes2 = _interopRequireDefault(_ApiRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dao2.default.connect(_appConfig2.default.mongoURI);
var server = (0, _express2.default)();
server.use('/api', _ApiRoutes2.default);

server.listen(_appConfig2.default.port, function (err) {
  if (!err) {
    console.log("server listening on " + _appConfig2.default.port);
  }
});