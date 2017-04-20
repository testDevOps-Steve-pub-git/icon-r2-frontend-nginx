(function () {
'use strict';

  var JSONReporter = require('jasmine-bamboo-reporter');
  var sauceLabsUserName = 'MohawkTester';
  var sauceLabsAccessKey = 'ef26abb7-6596-4fd8-aa2d-429016341106'

  exports.config = {
    rootElement: 'body',
    multiCapabilities: [
      {
         'browserName': 'chrome',
         'platform': 'Windows 10',
         'screenResolution': '1920x1080',
         'prerun': {
           'executable':'https://www.dropbox.com/s/umpvq8qm4rkt9v1/downloadexamplefiles.bat?dl=1',
           'background': true,
           'timeout': 300000
        }
      },
      // {
      //    'browserName': 'chrome',
      //    'prerun': {
      //      'executable':'https://www.dropbox.com/s/umpvq8qm4rkt9v1/downloadexamplefiles.bat?dl=1',
      //      'background': true,
      //      'timeout': 300000
      //   }
      // },
//      {
//         'browserName': 'firefox',
//         'version': '47.0',
//         'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//         'platform': 'Windows 10',
//         'screenResolution': '1920x1080',
//         'prerun': {
//           'executable':'https://www.dropbox.com/s/umpvq8qm4rkt9v1/downloadexamplefiles.bat?dl=1',
//           'background': true,
//           'timeout': 300000
//        }
//      },
//      {
//        'browserName': 'internet explorer',
//        'platform': 'Windows 10',
//        'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//        'version': 11,
//        'elementScrollBehavior': 1,
//        'ignoreZoomSetting': true,
//        'nativeEvents': false,
//        'enablePersistentHover': true,
//        javascriptEnabled: true,
//        'prerun': {
//            'executable':'https://www.dropbox.com/s/umpvq8qm4rkt9v1/downloadexamplefiles.bat?dl=1',
//            'background': true,
//            'timeout': 300000
//        }
//      },
//      {
//        'browserName': 'internet explorer',
//        'version': 10,
//        'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//        'elementScrollBehavior': 1,
//        'ignoreZoomSetting': true,
//        'nativeEvents': false,
//        'enablePersistentHover': true,
//        javascriptEnabled: true,
//        'prerun': {
//            'executable':'https://www.dropbox.com/s/umpvq8qm4rkt9v1/downloadexamplefiles.bat?dl=1',
//            'timeout': 300000
//        }
//      },
//      {
//        'browserName': 'MicrosoftEdge',
//        'platform': 'Windows 10',
//        'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//        'screenResolution': '2560x1600',
//      },
//      {
//        'browserName': 'safari',
//        'version': '9',
//        'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//      },
//      {
//        'browserName': 'safari',
//        'version': '8',
//        'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//      },
//      {        
//        'browserName': 'Browser',
//        'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//        'appiumVersion': '1.5.3',
//        'deviceName': 'Android GoogleAPI Emulator',
//        'deviceOrientation': 'portrait',
//        'platformVersion': '5.0',
//        'platformName': 'Android'
//      },
//      {
//        'browserName': 'Browser',
//        'tunnel-identifier': 'ICONTEST-E2E-TESTING',
//        'appiumVersion': '1.5.3',
//        'deviceName': 'Android GoogleAPI Emulator',
//        'deviceOrientation': 'portrait',
//        'platformVersion': '5.0',
//        'platformName': 'Android'
//      }
    ],
      maxSessions: 2,
      baseUrl: 'http://localhost:3001',
//      baseUrl: 'http://gbhu.vcap.me:3001',
   //   seleniumServerJar: 'selenium-server-standalone-3.0.1.jar',
      seleniumAddress: "http://169.46.30.64:4444/wd/hub",
      suites: {
        scenarios: [
          './e2e/scenarios/TC-ANON-OTHER-SUB.scenario.js',
        ]
      },
      /* Configuration for jasmine-bamboo-reporter. */
      framework: 'jasmine',
      jasmineNodeOpts: { 
         showColors : true,
         defaultTimeoutInterval: 360000,
      },
      onPrepare: () => {
        browser.driver.manage().window().maximize();
        return browser.driver.getCapabilities()
          .then((caps) => {
             browser.name = caps.get('browserName');
             browser.version = caps.get('version');
             browser.platform = caps.get('platform');
             jasmine.getEnv()
               .addReporter(new JSONReporter({
                 file : 'test/e2e/results/icon-e2e-test-report' + '-' + browser.name + '-' + browser.version + '.json',
                 beautify : true,
                 indentationLevel : 4
               }));
          });
      }
  };
}());
