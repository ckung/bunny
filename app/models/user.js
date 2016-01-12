import Ember from 'ember';

export default Ember.Object.extend({
  isAuthenticated: false,
  uid: null,
  email: null,
  firstName: null,
  lastName: null,
  userName: null,
  brands: null,
  permissions: null,
  brandsMap: null
});
