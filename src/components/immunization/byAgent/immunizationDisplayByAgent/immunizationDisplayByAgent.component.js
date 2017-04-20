(function () {
'use strict';

  module.exports = {
    bindings: {
      immunization: '<',
      onRemoveImmunization: '&',
      onOpenEditImmunization: '&',
    },
    controller: immunizationDisplayByAgentController,
    templateUrl: './components/immunization/byAgent/immunizationDisplayByAgent/immunizationDisplayByAgent.template.html',
    transclude: true,
  };

  immunizationDisplayByAgentController.$inject = ['ImmunizationRecordService', 'Immunization'];
  function immunizationDisplayByAgentController (ImmunizationRecordService, Immunization) {
    this.$onInit = () => {
      this.removeImmunization = () => {
        this.onRemoveImmunization({ immunization: this.immunization });
      }
      this.patient = ImmunizationRecordService.getPatient();

      this.openEditImmunization = () => {
        this.onOpenEditImmunization({ immunization: this.immunization });
      }
    };
  }
}());
