import Ember from 'ember';
import ENV from 'bunny/config/environment';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

var ApplicationRoute = Ember.Route.extend(ApplicationRouteMixin, {

  actions : {
    invalidateSession() {
      this.get('session').invalidate();
    }
  },

  beforeModel (transition) {
    var session = this.get('session');

    if (!session.get('currentUser.isAuthenticated')) {
      session.set('attemptedTransition', transition);
      return this.get('userService').load(session, transition)
        .catch(() => { window.location = ENV.authApp + '/login';});
    }

    return new Ember.RSVP.Promise(function (resolve, reject) {
      resolve();
  });
  },

  sessionInvalidated () {
    this._super(...arguments);
    window.location = ENV.authApp+ '/login';
  }

});

export default ApplicationRoute;
