import Ember from 'ember';
import User from '../models/user';

function setServiceProperties(session) {
  var user = new User(session.get('data.authenticated'));
  user.set('isAuthenticated', true);
  this.set('currentUser', user);
}

export default Ember.Service.extend({
  currentUser: null,

  load (session) {
    return session.authenticate('authenticator:custom', {}).then(function () {
      setServiceProperties.call(this, session);
    }.bind(this));
  }
});
