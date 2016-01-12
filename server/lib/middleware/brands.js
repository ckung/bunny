var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var config = require('config');
var _ = require('lodash');

var brandsMap;

module.exports = function (req, res, next) {
  var options = {
    url: config.get('api') + '/api/brands',
    method: 'GET',
    json: true,
    headers: {
      'access-token': req.user.accesstoken || null
    }
  };

  if (brandsMap) {
    req.user.brandsMap = brandsMap;
    next();
  } else {
    request(options)
      .then(function (result) {
        var brands = _.last(result).brands || [];
        brandsMap = {};
        brands.forEach(function (brand) {
          brandsMap[brand.code] = {
            code: brand.code,
            id: brand._id,
            name: brand.name
          };
        });
        req.user.brandsMap = brandsMap;
        next();
      })
      .catch(function (err) {
        next(err);
      });
  }
}
