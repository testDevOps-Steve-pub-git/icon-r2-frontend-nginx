/**
 *  Component controller for the anon self patient route, in the anon self workflow
 *  Bindings:
 *    record: ImmunizationRecordService to set and get immunization record
 */
anonSelfPatientController.$inject = ['ImmunizationRecordService'];
function anonSelfPatientController (ImmunizationRecordService) {
  this.$onInit = () => {
    this.localPatient = ImmunizationRecordService.getPatient();
    this.localSubmitter = ImmunizationRecordService.getSubmitter();

    this.validateForm = (form) => {
      if (!form.$valid) {
        form.$error.required.forEach((field) => { field.$setTouched(); });
      }
      else {
        ImmunizationRecordService.setPatient(this.localPatient);

        this.localSubmitter.firstName = this.localPatient.firstName;
        this.localSubmitter.lastName = this.localPatient.lastName;
        this.localSubmitter.relationshipToPatient = 'ONESELF';
        ImmunizationRecordService.setSubmitter(this.localSubmitter);
      }
      return form.$valid;
    }
  }
}

module.exports = {
  controller: anonSelfPatientController,
  template: `
    <div>
      <h2>{{ 'patientCapture.YOUR_INFO' | translate }}</h2>
      <form class="form form-container" name="anonSelfPatientForm" novalidate autocomplete="off">
        <patient-capture
          local-patient="$ctrl.localPatient"
          local-submitter-info="$ctrl.localSubmitter"
          form="anonSelfPatientForm">
        </patient-capture>

        <submitter-email
          local-submitter-info="$ctrl.localSubmitter"
          form="anonSelfPatientForm">
        </submitter-email>

        <hr />

        <next-prev-buttons
        on-next="$ctrl.validateForm(anonSelfPatientForm)">
        </next-prev-buttons>
      </form>
    </div>
  `
};
