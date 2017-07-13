/* @ngInject */
function immunizationDisplayByDateController (ImmunizationRecordService) {
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
  name: 'immunizationDisplayByDate',
  component: {
    bindings: {
      immunization: '<',
      onRemoveImmunization: '&',
      onOpenEditImmunization: '&'
    },
    controller: immunizationDisplayByDateController,
    templateUrl: './components/immunization/byDate/immunizationDisplayByDate/immunizationDisplayByDate.template.html',
    transclude: true
  }
}
