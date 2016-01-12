var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var config = require('config');
var _ = require('lodash');

module.exports = function (req, res, next) {
  var options = {
    url: config.get('api') + '/api/permissions/' + req.user._id,
    method: 'GET',
    json: true,
    headers: {
      'access-token': req.user.accesstoken || null
    }
  };
  request(options)
    .then(function (result) {
      req.user.permissions = _.last(result).permissions;
      next();
    })
    .catch(function () {
      next();
    });
}
