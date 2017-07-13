/* @ngInject */
function immunizationsGroupedByDate$ctrl (ImmunizationRecordService, Immunization) {
  this.$onInit = () => {
    this.patient = ImmunizationRecordService.getPatient()

    this.openAddImmunizationSameDate = () => {
      let candidateImmunization = new Immunization()
      candidateImmunization.date = this.immunizations[0].date
      this.onOpenAddImmunizationSameDate({ immunization: candidateImmunization })
    }

    this.removeImmunizationGroup = () => {
      this.onRemoveImmunizationGroup({ immunization: this.immunizations[0] })
    }
  }
}

export default {
  name: 'immunizationsGroupedByDate',
  component: {
    controller: immunizationsGroupedByDate$ctrl,
    templateUrl: './components/immunization/byDate/immunizationsGroupedByDate/immunizationsGroupedByDate.template.html',
    bindings: {
      immunizations: '<',
      onOpenAddImmunizationSameDate: '&',
      onRemoveImmunizationGroup: '&'
    },
    transclude: true
  }
}
