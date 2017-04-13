/**
 * Created on 2017-04-03.
 * Modal that informs user they will lose unsaved information if they return to home without submitting
 */
(function() {
  'use strict';

  module.exports = {
    bindings: {
      $close: '&',
    },
    templateUrl: './components/index/returnHomeModal/returnHomeModal.template.html',
    controller: returnHomeModalController,
  };

  returnHomeModalController.$inject = ['$state'];
  function returnHomeModalController($state) {

    this.ok = (modalData) => {
      this.$close({
        result: modalData
      });
    };

  }
})();