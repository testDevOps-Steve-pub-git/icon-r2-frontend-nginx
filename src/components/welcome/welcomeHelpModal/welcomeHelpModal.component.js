/**
 * Created on 2017-02-03.
 * Component for modal window with help information
 */
(function(){
'use strict';

  module.exports = {
    templateUrl: './components/welcome/welcomeHelpModal/welcomeHelpModal.template.html',
    bindings: {
      $close: '&',
    },
    controller: welcomeHelpModalController
  };

  welcomeHelpModalController.$inject = ['$state', 'Multitenancy'];
  function welcomeHelpModalController ($state, Multitenancy) {
    this.$onInit = () => {
      Multitenancy.getPhuKeys()
                  .then((phuAssets) => { this.multitenancy = phuAssets; });
                };
    this.ok = (modalData) => {
      this.$close({
        result: modalData
      });
    };
  }
})();
