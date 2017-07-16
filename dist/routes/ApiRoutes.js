'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dao = require('../dao/dao');

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// router.use(bodyParser.json());
router.use(_bodyParser2.default.urlencoded({ extended: true }));

router.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = _bcryptNodejs2.default.hashSync(req.body.password);
  var clientToken = _bcryptNodejs2.default.hashSync(username);
  res.send(clientToken);
});

router.post('/login', function (req, res) {});

exports.default = router;