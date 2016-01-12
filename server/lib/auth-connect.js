'use strict';

var config = require('config');
var permissions = require('./middleware/permissions');
var brands = require('./middleware/brands');

module.exports = function (app) {
  var authConnect = require('@condenast/copilot-auth-connect')({
    host: {
      subdirectory: config.get('auth.subdirectory')
    },
    authserver: {
      baseurl: config.get('auth.server')
    },
    redirect: {
      login: {
        callback: config.get('auth.routes.logincallback'),
        path: config.get('auth.routes.login'),
        success: config.get('auth.redirect.login.success'),
        failure: config.get('auth.redirect.login.failure')
      },
      unauthorized: false // redirect on 401 false or path to redirect to
    },
    restrict: [
      '/api/*',
      '/admin/api*'
    ],
    allow: [
      config.get('auth.routes.login'),
      config.get('auth.routes.logincallback')
    ],
    clientid: config.get('auth.clientId'),
    clientsecret: config.get('auth.clientSecret')
  });

  app.use(authConnect.authenticate);
  app.use(config.get('auth.routes.login'), authConnect.login);
  app.use(config.get('auth.routes.logincallback'), authConnect.logincallback);
  app.use(config.get('auth.routes.logout'), authConnect.logout);
  app.use(config.get('auth.routes.instance'),
    authConnect.instance,
    permissions,
    brands,
    function (req, res, next) {
      res.json(req.user);
    });
}
