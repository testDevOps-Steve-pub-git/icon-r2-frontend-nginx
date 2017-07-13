/* @ngInject */
function immunizationDisplayByAgent$ctrl (ImmunizationRecordService, Immunization) {
  this.$onInit = () => {
    this.removeImmunization = () => {
      this.onRemoveImmunization({ immunization: this.immunization })
    }
    this.patient = ImmunizationRecordService.getPatient()

    this.openEditImmunization = () => {
      this.onOpenEditImmunization({ immunization: this.immunization })
    }
  }
}

export default {
  name: 'immunizationDisplayByAgent',
  component: {
    bindings: {
      immunization: '<',
      onRemoveImmunization: '&',
      onOpenEditImmunization: '&'
    },
    controller: immunizationDisplayByAgent$ctrl,
    templateUrl: './components/immunization/byAgent/immunizationDisplayByAgent/immunizationDisplayByAgent.template.html',
    transclude: true
  }
}
