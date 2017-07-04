authSelfPatientController.$inject = ['ImmunizationRecordService', 'Multitenancy'];
function authSelfPatientController (ImmunizationRecordService, Multitenancy) {

  this.$onInit = ()=> {
    this.localPatient = ImmunizationRecordService.getPatient();
    this.localSubmitter = ImmunizationRecordService.getSubmitter();


    /** Validation for next Prev buttons */
    this.validateForm = (form) => {
      if (!form.$valid && form.$error.required) {
        form.$error.required.forEach((field) => { field.$setTouched(); });
      } else {
        ImmunizationRecordService.setPatient(this.localPatient);

        this.localSubmitter.firstName = this.localPatient.firstName;
        this.localSubmitter.lastName = this.localPatient.lastName;
        this.localSubmitter.relationshipToPatient = 'ONESELF';
        ImmunizationRecordService.setSubmitter(this.localSubmitter);
      }
      return form.$valid;
    }
  };


}

module.exports = {
  bindings: { data: '<' },
  controller: authSelfPatientController,
  template: `
    <h1>{{ 'authSelfPatient.INFO_TITLE' | translate }}</h1>
    <form class="form form-container" name="authSelfPatientForm" novalidate autocomplete="off">

      <auth-self-patient-container
        form="authSelfPatientForm"
        local-patient="$ctrl.localPatient"
        local-submitter="$ctrl.localSubmitter">
      </auth-self-patient-container>

      <hr />

      <next-prev-buttons
        on-next="$ctrl.validateForm(authSelfPatientForm)">
      </next-prev-buttons>
    </form>
  `
};
