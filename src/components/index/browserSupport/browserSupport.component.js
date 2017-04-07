/**
 * Created on 2017-01-23.
 * Component that is displayed when user is using an unsupported browser 
 */
(function(){
'use strict';

  module.exports = {
    bindings: {},
    controller: browserSupportController,
    templateUrl: './components/index/browserSupport/browserSupport.template.html'
  };

  browserSupportController.$inject = ['$translate', 'deviceDetector', 'BrowserChecker'];
  function browserSupportController ($translate, deviceDetector, BrowserChecker) {

    this.$onInit = ()=> {
      this.currentBrowser =  BrowserChecker.browser;
      this.supportedBrowsers = BrowserChecker.getSupportedBrowsers();

      let browserImages = {
        'Chrome': 'chrome',
        'Firefox': 'firefox',
        'Explorer': 'internet-explorer',
        'Opera': 'opera',
        'Safari': 'safari',
        'Edge': 'edge',
        'Facebook Messanger': 'facebook-official',
        'Unknown': 'question-circle',
      };

      let browserLinks = {};
      Object.keys(this.supportedBrowsers)
            .map((a) => {
             $translate('browserSupport.LINKS.' + this.supportedBrowsers[a].toUpperCase())
              .then((value) => {
                browserLinks[this.supportedBrowsers[a]] = value;
              });
            });

      if (deviceDetector.device != 'unknown') {
        $translate('browserSupport.LINKS.SAFARI_MOBILE')
         .then((value) => {
           browserLinks['Safari'] = value;
         });
      }
    
      this.getBrowserImage = (browserName) => {
        return browserImages[browserName];
      };

      this.getUpdateBrowserLink = (browserName) => {
        return browserLinks[browserName];
      };
    };
  }
})();
