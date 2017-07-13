/* @ngInject */
function immunizationsByAgent$ctrl (Immunization) {
  this.$onInit = () => {
    this.openNewImmunizationModal = () => {
      this.onOpenNewImmunizationModal({ immunization: new Immunization() })
    }
  }
}

export default {
  name: 'immunizationsByAgent',
  component: {
    bindings: { onOpenNewImmunizationModal: '&' },
    controller: immunizationsByAgent$ctrl,
    templateUrl: './components/immunization/byAgent/immunizationsByAgent/immunizationsByAgent.template.html',
    transclude: true
  }
}
