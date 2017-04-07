(function () {
'use strict';

  module.exports = {
    bindings: {
      immunizations:  '<',
      add:            '&',
      update:         '&',
      onRemove:       '&',
      openModal:      '<',
    },
    controller: immunizationDisplayByDateController,
    templateUrl: './components/immunization/byDate/immunizationDisplayByDate/immunizationDisplayByDate.template.html'
  };

  immunizationDisplayByDateController.$inject = ['ImmunizationRecordService', 'Immunization'];
  function immunizationDisplayByDateController (ImmunizationRecordService, Immunization) {
    this.$onInit = () => {
      this.remove = this.onRemove;

      this.patient = ImmunizationRecordService.getPatient();

      this.edit = (immunization) => {
        let save = (immunization) => {
                this.update({
                  newImmunization: immunization,
                  oldImmunization: this.immunization,
                });
        };

        this.openModal(immunization, save)
      };

      this.addImmunization = (immunization) => {
        let save = (immunization) => {
          this.add({ immunization: immunization });
        };
        
        let candidateImmunization = new Immunization();
        candidateImmunization.date = immunization.date;
        candidateImmunization.isDateApproximate = immunization.isDateApproximate;

        this.openModal(candidateImmunization, save)
      };
    };

    this.$onChanges = (changes) => {
      if (changes.immunizations.currentValue) {
        this.immunizations = changes.immunizations.currentValue;
      }
    };
  }
}());
