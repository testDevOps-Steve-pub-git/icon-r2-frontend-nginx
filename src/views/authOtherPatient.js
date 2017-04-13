/**
 * Created on 2017-02-24.
 * View for immunization submission, oiid and pin, patient info where patient is a dependent
 */
AuthOtherPatientController.$inject = ['ImmunizationRecordService', 'Multitenancy'];
function AuthOtherPatientController (ImmunizationRecordService, Multitenancy) {

  this.$onInit = ()=> {
    this.localPatient = ImmunizationRecordService.getPatient();
    this.localSubmitter = ImmunizationRecordService.getSubmitter();

    this.patientName = this.localPatient.firstName;


    /** Validation for next Prev buttons */
    this.validateForm = (form) => {
      if (!form.$valid) {
        form.$error.required.forEach((field) => { field.$setTouched(); });
      }
      else {
        ImmunizationRecordService.setPatient(this.localPatient);

        this.localSubmitter.relationshipToPatient = 'GUARD';
        ImmunizationRecordService.setSubmitter(this.localSubmitter);
      }
      return form.$valid;
    }
  };


}

module.exports = {
  bindings: { data: '<' },
  controller: AuthOtherPatientController,
  template: `
    <h1>{{$ctrl.patientName}}'s Info</h1>
    <form class="form form-container" name="authOtherPatientForm" novalidate autocomplete="off">
      <auth-other-patient-container
        form="authOtherPatientForm"
        local-patient="$ctrl.localPatient">
      </auth-other-patient-container>

      <next-prev-buttons
        on-next="$ctrl.validateForm(authOtherPatientForm)">
      </next-prev-buttons>
    </form>
  `
};
