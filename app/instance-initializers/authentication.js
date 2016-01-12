import Authenticator from '../auth/authenticator';

export function initialize(application) {
  application.register('authenticator:custom', Authenticator);
}

export default {
  name: 'authentication',
  initialize: initialize
};
