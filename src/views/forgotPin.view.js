/* @ngInject */
function forgotPin$ctrl (
  $state,
  Endpoint,
  ImmunizationRecordService,
  Multitenancy,
  Notify,
  Utility,
  DHIR,
  ICON_NOTIFICATION
) {
  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient()
    this.submitterInfo = ImmunizationRecordService.getSubmitter()

    Multitenancy.getPhuKeys()
    .then((phuAssets) => {
      this.multitenancy = phuAssets
      this.phuId = this.multitenancy.PHIX_PHU_CODE
    })

    /* Function Declaration */
    this.forgotEmail = forgotEmail
    this.validateFormAndSubmit = validateFormAndSubmit
  }

  function forgotEmail () {
    Notify.publish(ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS)
    Endpoint.ResetAccess(this.patientInfo.oiid, this.submitterInfo.email, this.phuId)
      .then(() => { $state.go('^.email-confirmation') })
      .then(() => Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS))
      .catch((errorId) => {
        Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS)
        switch (errorId) {
          case DHIR.error.ResetAccess.WRONG_EMAIL_PROVIDED:
            Notify.publish(ICON_NOTIFICATION.EMAIL_NOT_ON_FILE)
            break

          case DHIR.error.ResetAccess.NO_EMAIL_ON_FILE:
            Notify.publish(ICON_NOTIFICATION.NO_EMAIL_ON_FILE)
            break

          case DHIR.error.ResetAccess.LOCKED_OUT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.ResetAccess.RATE_LIMIT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

          case DHIR.error.ResetAccess.RESOURCE_NOT_FOUND:
          case DHIR.error.ResetAccess.MALFORMED_REQUEST:
          case DHIR.error.ResetAccess.SERVER_INTERNAL_ERROR:
          case DHIR.error.ResetAccess.MALFORMED_MISSING_REQUIRED_DATA:
          case DHIR.error.ResetAccess.MALFORMED_INVALID_VALUE:
          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break
        }
      })
  }

  function validateFormAndSubmit (form) {
    if (form.$valid) this.forgotEmail()
    else Utility.focusFirstInvalidField(form)
  }
}

export default {
  name: 'forgotPin',
  view: {
    controller: forgotPin$ctrl,
    template: `
      <div>
        <div class="row">
          <div class="col-xs-12">
            <h1 translate="pinForgot.TITLE"></h1>
            <p translate="pinForgot.PARA_1"></p>
          </div>
        </div>

        <form class="form form-container" name="forgotPinForm" id="forgotPinForm" autocomplete="off" novalidate>

          <div class = "form-group">
            <oiid-display
              oiid="$ctrl.patientInfo.oiid">
            </oiid-display>
          </div>

          <div class = "form-group">
            <email-capture
              email="$ctrl.submitterInfo.email"
              form="forgotPinForm"
              is-optional="false">
            </email-capture>
          </div>

          <button class="btn btn-primary"
            id="forgotPinButton"
            type="submit"
            translate="pinForgot.BUTTON"
            ng-click="$ctrl.validateFormAndSubmit(forgotPinForm)">
          </button>
        </form>
      </div>
    `
  }
}
