(function () {
'use strict';

  module.exports = {
    bindings: {
      immunization:  '<',
      onRemoveImmunization: '&',
      onOpenEditImmunization: '&',
    },
    controller: immunizationDisplayByDateController,
    templateUrl: './components/immunization/byDate/immunizationDisplayByDate/immunizationDisplayByDate.template.html',
    transclude: true,
  };

  immunizationDisplayByDateController.$inject = ['ImmunizationRecordService', 'Immunization'];
  function immunizationDisplayByDateController (ImmunizationRecordService, Immunization) {
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
