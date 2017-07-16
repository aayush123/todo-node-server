const Express = require('express');
const config = require('./config/appConfig');
const dao = require('./dao/dao');
const apiRouter = require('./routes/ApiRoutes');
const logger = require('../Logs/logger');
const bcrypt = require('bcrypt-nodejs');

dao.connect(config.mongoURI).then((successMsg) => {
  logger.info(successMsg);
})
.catch((errorMsg) => {
  logger.error(errorMsg);
});

let server = Express();
server.use('/api', apiRouter);

server.listen(config.port, function(err) {
  if (!err) {
    logger.info("server listening on " + config.port);
  }
});
