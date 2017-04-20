(function () {
'use strict';

  module.exports = {
    bindings: { onOpenNewImmunizationModal: '&' },
    controller: immunizationsByDateController,
    templateUrl: './components/immunization/byDate/immunizationsByDate/immunizationsByDate.template.html',
    transclude: true,
  };

  immunizationsByDateController.$inject = ['Immunization'];
  function immunizationsByDateController (Immunization) {

    this.$onInit = () => {
      this.openNewImmunizationModal = () => {
        this.onOpenNewImmunizationModal({ immunization: new Immunization()});
      };
    };

  }

}());
