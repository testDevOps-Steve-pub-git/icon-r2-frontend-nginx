(function () {
'use strict';

  module.exports = {
    controller: immunizationsGroupedByAgentController,
    templateUrl: './components/immunization/byAgent/immunizationsGroupedByAgent/immunizationsGroupedByAgent.template.html',
    bindings: {
      immunizations: '<',
      onOpenAddImmunizationSameAgent: '&',
      onRemoveImmunizationGroup: '&',
    },
    transclude: true,
  };

  immunizationsGroupedByAgentController.$inject = ['Immunization'];
  function immunizationsGroupedByAgentController (Immunization) {

    this.$onInit = () => {
      this.openAddImmunizationSameAgent = () => {
        let candidateImmunization = new Immunization();
        candidateImmunization.agent = this.immunizations[0].agent.clone();
        candidateImmunization.trade = this.immunizations[0].trade.clone();
        this.onOpenAddImmunizationSameAgent({ immunization: candidateImmunization });
      }

      this.removeImmunizationGroup = () => {
        this.onRemoveImmunizationGroup({ immunization: this.immunizations[0] });
      }
    };

  }

}());
