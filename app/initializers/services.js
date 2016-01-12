import Ember from 'ember';
import UserService from '../services/user';

function initialize(application) {
  application.register('service:user', UserService, {
    singleton: true
  });

  application.inject('route', 'userService', 'service:user');
  application.inject('view', 'userService', 'service:user');
  application.inject('controller', 'userService', 'service:user');
}

export default {
  name: 'services',
  initialize: initialize
};
