anonOtherPatientController.$inject = ['ImmunizationRecordService'];
function anonOtherPatientController (ImmunizationRecordService) {
  this.$onInit = ()=> {
    this.localPatient = ImmunizationRecordService.getPatient();

    this.validateForm = (form) => {
      if (!form.$valid) form.$error.required
                            .forEach((field) => { field.$setTouched(); });
      else ImmunizationRecordService.setPatient(this.localPatient);
      return form.$valid;
    }
  }
}

module.exports = {
  controller: anonOtherPatientController,
  template: `
    <div>
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
};
