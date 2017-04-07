(function () {
'use strict';

  module.exports = {
    bindings: {
      immunizations: '<',
      add:            '&',
      update:         '&',
      onRemove:       '&',
      openModal:      '<',
    },
    controller: immunizationDisplayByAgentController,
    templateUrl: './components/immunization/byAgent/immunizationDisplayByAgent/immunizationDisplayByAgent.template.html'
  };

  immunizationDisplayByAgentController.$inject = ['ImmunizationRecordService', 'Immunization'];
  function immunizationDisplayByAgentController (ImmunizationRecordService, Immunization) {
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

      this.addImmunization = function (immunization) {
        let save = (immunization) => {
          this.add({ immunization: immunization });
        }

        let candidateImmunization = new Immunization();
        candidateImmunization.agent = immunization.agent.clone();
        candidateImmunization.trade = immunization.trade.clone();
        candidateImmunization.provider = immunization.provider;
        candidateImmunization.location = immunization.location;

        this.openModal(candidateImmunization, save)
      }
    };

    this.$onChanges = (changes) => {
      if (changes.immunizations.currentValue) {
        this.immunizations = changes.immunizations.currentValue;
      }
    };
  }
}());
