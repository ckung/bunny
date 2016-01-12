var url = require('url');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connectMongo = require('connect-mongo');
var errorHandler = require('errorhandler');

var config = require('config');

module.exports = function(app) {
  app.use(cookieParser());

  var MongoSessionStore = connectMongo(session);

  app.use(session({
    name: config.get('session.name'),
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: config.get('session.domain'),
      maxAge: config.get('session.maxAge')
    },
    store: new MongoSessionStore({
      url: config.get('session.mongoStore'),
      autoReconnect: true
    })
  }));

  app.get('/ping', function(req, res, next) {
    res.send({
      pong: new Date()
    });
  });

  // Use copilot-auth-connect for authentication
  require('./lib/auth-connect')(app);

  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
};
