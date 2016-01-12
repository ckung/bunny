/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var p = require('./node_modules/ember-cli/node_modules/ember-cli-preprocess-registry/preprocessors');
var preprocessTemplates = p.preprocessTemplates;

var upstreamMergeTrees = require('broccoli-merge-trees');

function mergeTrees(inputTree, options) {
  options = options || {};
  options.description = options.annotation;
  var tree = upstreamMergeTrees(inputTree, options);

  tree.description = options && options.description;

  return tree;
}

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      extensions: [
        'js',
        'css',
        'png',
        'jpg',
        'gif',
        'map',
        'eot',
        'svg',
        'otf',
        'ttf',
        'woff',
        'woff2'
      ]
    },
    hinting: false,
    sassOptions:  {
      includePaths: [
        'bower_components/bootstrap-sass-official/assets/stylesheets'
      ],
      outputFile: 'bunny.css'
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },
    vendorFiles: {
      'jquery.js': 'bower_components/jquery/dist/jquery.js'
    },
  });

  // Override upstream private method to ensure templates in /brands are included in build
  app._processedTemplatesTree = function () {
    var addonTrees = this.addonTreesFor('templates');
    var mergedTrees = this.trees.templates ? addonTrees.concat(this.trees.templates) : addonTrees;
    var mergedTemplates = mergeTrees(mergedTrees, {
      overwrite: true,
      annotation: 'TreeMerger (templates)'
    });

    var standardTemplates = new Funnel(mergedTemplates, {
      srcDir: '/',
      destDir: this.name + '/templates',
      annotation: 'ProcessedTemplateTree'
    });


    var templates = this.addonPreprocessTree('template', mergeTrees([
      standardTemplates
    ], {
      annotation: 'addonPreprocessTree(template)'
    }));

    return this.addonPostprocessTree('template', preprocessTemplates(templates, {
      registry: this.registry,
      description: 'TreeMerger (pod & standard templates)'
    }));
  };
  app.import({
    test: 'bower_components/babel-polyfill/browser-polyfill.js',
    prepend: true
  });
  app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');
  app.import('bower_components/select2/select2.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
