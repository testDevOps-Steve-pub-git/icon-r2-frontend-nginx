/* @ngInject */
function immunizationsGroupedByAgent$ctrl (Immunization) {
  this.$onInit = () => {
    this.openAddImmunizationSameAgent = () => {
      let candidateImmunization = new Immunization()
      candidateImmunization.agent = this.immunizations[0].agent.clone()
      candidateImmunization.trade = this.immunizations[0].trade.clone()
      this.onOpenAddImmunizationSameAgent({ immunization: candidateImmunization })
    }

    this.removeImmunizationGroup = () => {
      this.onRemoveImmunizationGroup({ immunization: this.immunizations[0] })
    }
  }
}

export default {
  name: 'immunizationsGroupedByAgent',
  component: {
    controller: immunizationsGroupedByAgent$ctrl,
    templateUrl: './components/immunization/byAgent/immunizationsGroupedByAgent/immunizationsGroupedByAgent.template.html',
    bindings: {
      immunizations: '<',
      onOpenAddImmunizationSameAgent: '&',
      onRemoveImmunizationGroup: '&'
    },
    transclude: true
  }
}
