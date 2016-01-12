/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bunny',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development' || environment === 'test') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentApp = "http://copilot.local:4200/search",
    ENV.authApp = "http://copilot.local:4300";
    ENV.instanceUrl = '/auth/instance';
    ENV.logoutUrl = '/auth/logout';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.contentApp = 'https://copilot.aws.conde.io/search'
    ENV.authApp = "http://auth.aws.conde.io";
    ENV.instanceUrl = '/auth/instance';
    ENV.logoutUrl = '/auth/logout';
  }

  if (environment === 'staging') {
    ENV.contentApp = 'https://stg-copilot.aws.conde.io/search'
    ENV.authApp = "http://stg-auth.aws.conde.io";
    ENV.instanceUrl = '/auth/instance';
    ENV.logoutUrl = '/auth/logout';
  }


  if (environment === 'ci') {
    ENV.contentApp = 'https://ci-copilot.aws.conde.io/search'
    ENV.authApp = "http://ci-auth.aws.conde.io";
    ENV.instanceUrl = '/auth/instance';
    ENV.logoutUrl = '/auth/logout';
  }

  return ENV;
};
