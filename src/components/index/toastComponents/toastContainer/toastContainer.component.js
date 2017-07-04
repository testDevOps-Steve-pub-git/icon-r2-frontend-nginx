/**
 * Created on 2017-02-15.
 * Component to hold and display different toasts
 */
(function() {
'use strict';

  module.exports = {
    bindings: {
      selectedToast: '@',
    },
    template: `
      <!--
      <error-toast ng-if="$ctrl.selectedToast === 'error'"></error-toast>
      <clear-info-toast ng-if="$ctrl.selectedToast === 'clear'"></clear-info-toast>
      <loading-toast ng-if="$ctrl.selectedToast === 'loading'"></loading-toast>
      <extend-session-toast ng-if="$ctrl.selectedToast === 'session'"></extend-session-toast>
      -->
    `,
    controller: toastContainerController,
  };

  toastContainerController.$inject = [];
  function toastContainerController() {

    this.$onChanges = (changes) => {

    }
  }
})();
