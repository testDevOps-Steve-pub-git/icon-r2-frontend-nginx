(function () {
'use strict';

  module.exports = {
    controller: immunizationsGroupedByDateController,
    templateUrl: './components/immunization/byDate/immunizationsGroupedByDate/immunizationsGroupedByDate.template.html',
    bindings: {
      immunizations: '<',
      onOpenAddImmunizationSameDate: '&',
      onRemoveImmunizationGroup: '&',
    },
    transclude: true,
  };

  immunizationsGroupedByDateController.$inject = ['ImmunizationRecordService', 'Immunization'];
  function immunizationsGroupedByDateController (ImmunizationRecordService, Immunization) {

    this.$onInit = () => {
      this.patient = ImmunizationRecordService.getPatient();

      this.openAddImmunizationSameDate = () => {
        let candidateImmunization = new Immunization();
        candidateImmunization.date = this.immunizations[0].date;
        this.onOpenAddImmunizationSameDate({ immunization: candidateImmunization });
      }

      this.removeImmunizationGroup = () => {
        this.onRemoveImmunizationGroup({ immunization: this.immunizations[0] });
      }
    };

  }

}());
