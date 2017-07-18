const Express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const dao = require('../dao/dao');
const logger = require('../../Logs/logger');
const helpers = require('../utilities/Helpers');
const dbOperations = require('../dao/DbOperations');

let router = Express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/signup', function (req, res) {
  let username = req.body.username;
  let password = bcrypt.hashSync(req.body.password);
  dao.findOne({username}, 'users')
  .then((userObj) => {
    if (userObj) {
      res.send({userExists: true});
    } else {
      dbOperations.createUser({username, password})
      .then((results) => {
        logger.debug(results);
        res.send({userCreated: true});
      })
      .then(dbOperations.createUserTodoList(username))
      .catch((err) => {
        logger.error(err);
        res.status(500);
        res.send({errorMsg: 'Error while signing up.'});
      });
    }
  })
  .catch((err) => {
    logger.error(err);
    res.status(500);
    res.send({errorMsg: 'Error while checking if user exists already.'});
  });
});

router.post('/login', function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  dao.findOne({username}, 'users')
  .then((userFromDB) => {
    if (!userFromDB) {
      logger.debug('Non existent user requested login.')
      res.send({userNotPresent: true});
    } else if (bcrypt.compareSync(password, userFromDB.password)){
      logger.debug('Logging in user: ' + username);
      let clientToken = bcrypt.hashSync(userFromDB._id);
      dao.findOne({username}, 'todoList')
      .then((todoData) => {
        res.send({todoData, clientToken});
      });
    } else {
      logger.debug('invalid password');
      res.send({invalidPassword: true});
    }
  })
  .catch((err) => {
    logger.error(err);
    res.status(500);
    res.send({errorMsg: 'Error while login.'});
  });
});

router.post('/newProject', function (req, res) {
  let clientToken = req.body.clientToken;
  let projectName = req.body.projectName;
  let username = req.body.username;
  helpers.validateRequest(username, clientToken)
  .then(dbOperations.createNewProject(username, projectName))
  .then(() => {
    logger.debug('Project ' + projectName + ' created successfully');
    res.send({
      projectCreated: true
    });
  })
  .catch((err) => {
    if (err.projectExists) {
      logger.debug('Project already exists for the user');
      res.send(err);
    } else {
      logger.error('Error while creating project');
      res.send({errorMsg: 'Error while creating project'});
    }
  });
});

module.exports = router;
