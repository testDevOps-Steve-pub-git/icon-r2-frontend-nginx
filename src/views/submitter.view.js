/* @ngInject */
function submitter$ctrl (ImmunizationRecordService, Utility) {
  this.$onInit = () => {
    this.localSubmitter = ImmunizationRecordService.getSubmitter()

    this.validateForm = (form) => {
      if (!form.$valid) Utility.focusFirstInvalidField(form)
      else ImmunizationRecordService.setSubmitter(this.localSubmitter)

      return form.$valid
    }
  }
}

export default {
  name: 'submitter',
  view: {
    bindings: { },
    controller: submitter$ctrl,
    template: `
      <div>
        <form class="form form-container" name="anonOtherSubmitterForm" novalidate autocomplete="off">

          <submitter-demographic-capture
            local-submitter-info="$ctrl.localSubmitter"
            form="anonOtherSubmitterForm">
          </submitter-demographic-capture>

          <div class="row">
            <div class="col-xs-12 col-md-6">
              <submitter-phone
                local-submitter-info="$ctrl.localSubmitter"
                form="anonOtherSubmitterForm">
              </submitter-phone>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-md-6">
              <submitter-email
                local-submitter-info="$ctrl.localSubmitter"
                form="anonOtherSubmitterForm">
              </submitter-email>
            </div>
          </div>

          <hr />
          <next-prev-buttons
          on-next="$ctrl.validateForm(anonOtherSubmitterForm)">
          </next-prev-buttons>
        </form>
      </div>
    `
  }
}
