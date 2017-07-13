/* @ngInject */
function immunizationsByDate$ctrl (Immunization) {
  this.$onInit = () => {
    this.openNewImmunizationModal = () => {
      this.onOpenNewImmunizationModal({ immunization: new Immunization() })
    }
  }
}

export default {
  name: 'immunizationsByDate',
  component: {
    bindings: { onOpenNewImmunizationModal: '&' },
    controller: immunizationsByDate$ctrl,
    templateUrl: './components/immunization/byDate/immunizationsByDate/immunizationsByDate.template.html',
    transclude: true
  }
}
