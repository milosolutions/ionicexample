
module.exports = function(config) {
  'use strict';
  config.set({
    basePath: '',


    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/ionic/release/js/ionic.js',
      'bower_components/ionic/release/js/ionic-angular.js',
      'www/js/**/*.js',
      'test/spec/controllers/*.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,


    browsers: ['PhantomJS'],


    singleRun: true
  });
};
