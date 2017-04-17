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

  browserSupportController.$inject = ['$translate', 'BrowserChecker', 'Multitenancy'];
  function browserSupportController ($translate, BrowserChecker, Multitenancy) {

    this.$onInit = ()=> {
      this.currentBrowser =  BrowserChecker.browser;
      this.supportedBrowsers = BrowserChecker.getSupportedBrowsers();

      /** Multitenancy Init */
      Multitenancy
        .getPhuKeys()
        .then((phuAssets) => { this.multitenancy = phuAssets; });

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
            .map((a) => browserLinks[this.supportedBrowsers[a]] = 'browserSupport.LINKS.' + this.supportedBrowsers[a].toUpperCase());

      this.getBrowserImage = (browserName) => {
        return browserImages[browserName];
      };

      this.getUpdateBrowserLink = (browserName) => {
        return browserLinks[browserName];
      };
    };
  }
})();
