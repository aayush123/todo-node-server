const dao = require('./dao');

function createUser(userObj) {
  return new Promise(function(resolve, reject) {
    dao.insert(userObj, 'users')
    .then(resolve)
    .catch(reject);
  });
}

function createUserTodoList(username) {
  return new Promise(function(resolve, reject) {
    dao.insert({username, projects: [], tasks: []}, 'todoList')
    .then(resolve)
    .catch(reject);
  });
}

function createNewProject(username, projectName) {
  return new Promise(function(resolve, reject) {
    dao.findOne({username, projectName})
    .then((userObj) => {
      if (userObj) {
        reject({projectExists: true});
      } else {
        let operationObject = {
          '$push': {
            'projects': {projectName}
          }
        };
        dao.update({username}, operationObject,'todoList')
        .then(resolve)
      }
    })
    .catch(reject);
  });
}

module.exports = {
  createUser,
  createUserTodoList
};
