/* @ngInject */
function anonOtherPatient$ctrl (ImmunizationRecordService, $document, Utility) {
  this.$onInit = () => {
    this.localPatient = ImmunizationRecordService.getPatient()

    this.validateForm = (form) => {
      if (!form.$valid) {
        Utility.focusFirstInvalidField(form)
      } else {
        ImmunizationRecordService.setPatient(this.localPatient)
      }
      return form.$valid
    }
  }
}

export default {
  name: 'anonOtherPatient',
  view: {
    controller: anonOtherPatient$ctrl,
    template: `
      <div>
        <h2>{{ 'patientCapture.PATIENT_INFO' | translate }}</h2>
        <form class="form form-container" name="anonOtherPatientForm" novalidate autocomplete="off">
          <patient-capture
          local-patient="$ctrl.localPatient"
          form="anonOtherPatientForm">
          </patient-capture>

          <hr />

          <next-prev-buttons
          on-next="$ctrl.validateForm(anonOtherPatientForm)">
          </next-prev-buttons>
        </form>
      </div>
    `
  }
}
