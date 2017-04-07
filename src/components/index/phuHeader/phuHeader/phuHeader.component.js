(function () {
'use strict';

  module.exports = {
    bindings: {
      baseState: '@',
      progressStates: '<',
    },
    templateUrl: './components/index/phuHeader/phuHeader/phuHeader.template.html',
    controller: phuHeaderController,
  };

  phuHeaderController.$inject = ['$state', 'Multitenancy'];
  function phuHeaderController ($state, Multitenancy) {
    this.$onInit = () => {
      Multitenancy.getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets; });

      this.isCurrentStateWelcome = () => { return $state.includes('welcome'); }
    };
  };

}());
