var _ = require('lodash');

var authorizedRoles = ['super-admin', 'admin', 'manager'];

function allowAPIAccess (req) {
  var user = req.session.passport.user;
  var allow = _.contains(authorizedRoles, user.role);
  if (req.params.entity === 'users' && user.role === 'contributor') {
    allow = true;
  }
  return allow;
}

module.exports = function(req, res, next) {
  if (req.session.passport && req.session.passport.user) {
    if (!allowAPIAccess(req)) {
      return res.status(403).json({
        message: 'You do not have sufficient privileges to access this functionality.'
      });
    }
  }
  next();
};
