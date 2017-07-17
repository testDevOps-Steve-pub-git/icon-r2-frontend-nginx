/* @ngInject */
function anonSelfPatient$ctrl (ImmunizationRecordService, Utility) {
  this.$onInit = () => {
    this.localPatient = ImmunizationRecordService.getPatient()
    this.localSubmitter = ImmunizationRecordService.getSubmitter()

    this.validateForm = (form) => {
      if (!form.$valid) {
        Utility.focusFirstInvalidField(form)
      } else {
        ImmunizationRecordService.setPatient(this.localPatient)
        this.localSubmitter.firstName = this.localPatient.firstName
        this.localSubmitter.lastName = this.localPatient.lastName
        this.localSubmitter.relationshipToPatient = 'ONESELF'
        ImmunizationRecordService.setSubmitter(this.localSubmitter)
      }
      return form.$valid
    }
  }
}

export default {
  name: 'anonSelfPatient',
  view: {
    controller: anonSelfPatient$ctrl,
    template: `
      <div>
        <h2>{{ 'patientCapture.YOUR_INFO' | translate }}</h2>
        <form class="form form-container" name="anonSelfPatientForm" novalidate autocomplete="off">

          <patient-capture
            local-patient="$ctrl.localPatient"
            local-submitter-info="$ctrl.localSubmitter"
            form="anonSelfPatientForm">
          </patient-capture>

          <div class="row">
            <div class="col-xs-12 col-md-6">
              <submitter-email
                local-submitter-info="$ctrl.localSubmitter"
                form="anonSelfPatientForm">
              </submitter-email>
            </div>
          </div>

          <hr />
          <next-prev-buttons
          on-next="$ctrl.validateForm(anonSelfPatientForm)">
          </next-prev-buttons>
        </form>
      </div>
    `
  }
}
