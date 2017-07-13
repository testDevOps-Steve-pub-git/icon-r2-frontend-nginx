/* @ngInject */
function editImmunization$ctrl (moment, ImmunizationRecordService, GatingQuestionService) {
  this.$onInit = () => {
    this.gatingQuestion = GatingQuestionService.getGatingQuestion()
    this.immunization = this.resolve.immunization
    this.isDuplicateImmunization = this.resolve.onIsDuplicateImmunization(this.immunization)
    this.patient = ImmunizationRecordService.getPatient()
    this.minDate = this.patient.dateOfBirth

    this.close = this.resolve.onClose

    this.save = (immunization, form) => {
      if (form.$invalid || !this.immunization.agent.snomed) {
        if (form.immunizationGroupDate) form.immunizationGroupDate.$setTouched('', false)
        if (form.selectedVaccine) form.selectedVaccine.$setTouched('', false)
      } else {
        immunization.date = this.formatDate(immunization.date)
        Object.assign(this.resolve.immunization, immunization)
        this.resolve.onSave(this.immunization)
        this.resolve.onClose()
      }
    }

    this.formatDate = (date) => { return new moment(date).format('YYYY-MM-DD') }

    this.afterSelectDate = (date) => {
      this.immunization.date = this.formatDate(date)
      this.setIsDuplicateImmunization()
    }

    this.setIsDuplicateImmunization = () => {
      this.isDuplicateImmunization = this.resolve.onIsDuplicateImmunization(this.immunization)
    }

    /**
     *  Scroll buttons up and down on Ont Imms schedule
     */
    let container = angular.element(document.getElementById('ontario-vertical-schedule-container'))
    let currentPos = 0
    this.scrollUp = () => {
      currentPos = container.scrollTop()
      return container.scrollTo(0, currentPos - 220, [500])
        .catch(angular.noop)
    }

    this.scrollDown = () => {
      currentPos = container.scrollTop()
      return container.scrollTo(0, currentPos + 220, [500])
        .catch(angular.noop)
    }
  }
}

export default {
  name: 'editImmunization',
  component: {
    bindings: { resolve: '=' },
    controller: editImmunization$ctrl,
    templateUrl: './components/immunization/editImmunization/editImmunization.template.html'
  }
}
