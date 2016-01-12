import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'bunny/config/environment';
import ajax from 'ic-ajax';

var getInstance = function () {
  return new Ember.RSVP.Promise(function (resolve, reject) {
    ajax({
      url: ENV.instanceUrl,
      type: 'GET',
      dataType: 'json'
    }).then(function (response) {
      resolve(response);
    }, function (err) {
      reject();
    }.bind(this));
  }.bind(this));
};

var Authenticator = Base.extend({

  restore: getInstance,

  authenticate: getInstance,

  invalidate: function (data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      ajax({
        url: ENV.logoutUrl,
        type: 'POST',
        data: data
      }).then(function () {
        resolve();
      }, function (err) {
        reject();
      }.bind(this));
    }.bind(this));
  }

});

export default Authenticator;
