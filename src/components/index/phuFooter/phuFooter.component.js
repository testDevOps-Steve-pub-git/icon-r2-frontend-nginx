/**
 * Component displaying PHU footer information, and for a global scroll-to-top button.
 * @namespace phuFooter
 */
(function () {
'use strict';

  module.exports = {
    templateUrl: './components/index/phuFooter/phuFooter.template.html',
    controller: phuFooterController
  };

  phuFooterController.$inject = ['$state', 'Multitenancy'];
  function phuFooterController ($state, Multitenancy) {
    this.$onInit = () => {
      Multitenancy.getPhuKeys()
                  .then((phuAssets) => { this.multitenancy = phuAssets; });
    };
    this.scrollToTop = (offsetPx) => {
      document.body.scrollTop = document.documentElement.scrollTop = offsetPx;
      document.getElementById("content-skip").focus();
    }
  }

}());
