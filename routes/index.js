'use strict';

module.exports = (app) => {
  app.use('/sample', require('./sample'));
  app.use('/main', require('./main'));
  app.use('/', require('./page'));
  app.use('/auth', require('./auth'));
  app.use('/reserve', require('./reserve'));
  app.use('/push', require('./firebase/push'));
}
