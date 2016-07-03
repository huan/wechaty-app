// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

exports.config = {
  framework: 'jasmine'
  ,jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }

  // , seleniumAddress: 'http://localhost:4444/wd/hub'
  , specs: ['test-spec.js']

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  , suites: {
    test: 'e2e/test.spec.js'
    , homepage: 'e2e/homepage/**/*.spec.js'
    , search: [
      'e2e/contact_search/**/*.spec.js'
      , 'e2e/venue_search/**/*.spec.js'
    ]
  }
  // If you would like protractor to use a specific suite by default instead of
  // all suites, you can put that in the config file as well.
  , suite: null

  // , capabilities: {
  //   browserName: 'chrome'
  // }
  // , multiCapabilities: [{
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }]

  // ---- 5. To connect directly to Drivers ------------------------------------
  // Boolean. If true, Protractor will connect directly to the browser Drivers
  // at the locations specified by chromeDriver and firefoxPath. Only Chrome
  // and Firefox are supported for direct connect.
  , directConnect: false
  , capabilities: {
    'browserName': 'phantomjs',

    /*
     * Can be used to specify the phantomjs binary path.
     * This can generally be ommitted if you installed phantomjs globally.
     */
    // 'phantomjs.binary.path': require('phantomjs').path,

    /*
     * Command line args to pass to ghostdriver, phantomjs's browser driver.
     * See https://github.com/detro/ghostdriver#faq
     */
    // 'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  }

}
