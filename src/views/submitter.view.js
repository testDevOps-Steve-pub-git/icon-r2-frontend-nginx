submitterController.$inject = ['ImmunizationRecordService'];
function submitterController (ImmunizationRecordService) {

  this.$onInit = ()=> {
    this.localSubmitter = ImmunizationRecordService.getSubmitter();

    this.validateForm = (form) => {
      if (!form.$valid && form.$error.required) {
        form.$error.required.forEach((field) => { field.$setTouched(); });
      } else {
        ImmunizationRecordService.setSubmitter(this.localSubmitter);
      }
      return form.$valid;
    };
  }
}

module.exports = {
  bindings: { },
  controller: submitterController,
  template: `
    <div>
      <form class="form form-container" name="anonOtherSubmitterForm" novalidate autocomplete="off">

        <submitter-demographic-capture
          local-submitter-info="$ctrl.localSubmitter"
          form="anonOtherSubmitterForm">
        </submitter-demographic-capture>

        <submitter-phone
          local-submitter-info="$ctrl.localSubmitter"
          form="anonOtherSubmitterForm">
        </submitter-phone>

        <div class="row">
          <div class="col-xs-12 col-md-6">
            <submitter-email
              local-submitter-info="$ctrl.localSubmitter"
              form="anonOtherSubmitterForm">
            </submitter-email>
          </div>
        </div>

        <hr \>
        <next-prev-buttons
        on-next="$ctrl.validateForm(anonOtherSubmitterForm)">
        </next-prev-buttons>
      </form>
    </div>
  `
};
