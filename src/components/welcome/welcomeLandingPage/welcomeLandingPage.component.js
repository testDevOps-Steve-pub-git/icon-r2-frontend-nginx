/**
 * Created on 2017-01-31.
 * Component for welcome screen where a user decides whether to authenticate or submit anonymously
 */
(function() {
'use strict';

  module.exports = {
    templateUrl: './components/welcome/welcomeLandingPage/welcomeLandingPage.template.html',
    bindings: {},
    controller: welcomeLandingPageController
  };

  welcomeLandingPageController.$inject = ['Multitenancy'];
  function welcomeLandingPageController (Multitenancy) {
    let $ctrl = this;

    Multitenancy.getPhuKeys()
    .then((phuKeys) => {
      $ctrl.multitenancy = phuKeys;
    })
  }

})();
