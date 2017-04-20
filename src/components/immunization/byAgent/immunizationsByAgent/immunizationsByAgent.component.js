(function () {
'use strict';

  module.exports = {
    bindings: { onOpenNewImmunizationModal: '&' },
    controller: immunizationsByAgentController,
    templateUrl: './components/immunization/byAgent/immunizationsByAgent/immunizationsByAgent.template.html',
    transclude: true,
  };

  immunizationsByAgentController.$inject = ['Immunization'];
  function immunizationsByAgentController (Immunization) {
    this.$onInit = () => {
      this.openNewImmunizationModal = () => {
        this.onOpenNewImmunizationModal({ immunization: new Immunization()});
      };
    };
  }

}());
