/* @ngInject */
function resetPin$ctrl (
  $stateParams,
  $state,
  $translate,
  Endpoint,
  ImmunizationRecordService,
  Notify,
  ICON_NOTIFICATION,
  DHIR
) {
  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient()
    this.submitterInfo = ImmunizationRecordService.getSubmitter()
    this.pin = ''
    this.pinConfirm = ''

    this.token = $stateParams.token || ''
    this.isTokenValid = true

    if (!!$stateParams.lang && $stateParams.lang === 'FR') $translate.use('fr')
    if (!!$stateParams.relationship) submitter.relationshipToPatient = $stateParams.relationship

    Endpoint.ValidateToken(this.token)
      .catch((error) => {
        switch(error) {
          case DHIR.error.ValidateToken.TOKEN_EXPIRED :
            $state.go('verification.send-another-email')
            break

          case DHIR.error.ValidateToken.TOKEN_INVALID :
          default:
            this.isTokenValid = false // Triggers display of inline error.
            break
        }
      })

    /* Function Declaration */
    this.resetPin = resetPin
    this.validateForm = validateForm
  }

  function resetPin() {
    Endpoint.ResetPIN(this.token, this.patientInfo.oiid, this.submitterInfo.relationshipToPatient, this.pin)
      .then(() => {
        ImmunizationRecordService.setPatient(this.patientInfo)
        ImmunizationRecordService.setSubmitter(this.submitterInfo)
        $state.go('welcome')
      })
      .then(() => Notify.publish(ICON_NOTIFICATION.INFO_PIN_SET_SUCCESS))
      .catch( (errorId)=> {
        switch(errorId) {

          case DHIR.error.ResetAccess.LOCKED_OUT :
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.ResetAccess.RATE_LIMIT :
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

          /* Currently no different error messages on mockups for these */
          case DHIR.error.ResetAccess.OIID_AND_TOKEN_DONT_MATCH:
          case DHIR.error.ResetAccess.TOKEN_INVALID_FOR_PIN:
          case DHIR.error.ResetAccess.TOKEN_EXPIRED_FOR_PIN:
          case DHIR.error.ResetAccess.INVALID_RESOURCE:

          case DHIR.error.ResetAccess.RESOURCE_NOT_FOUND :
          case DHIR.error.ResetAccess.MALFORMED_REQUEST :
          case DHIR.error.ResetAccess.SERVER_INTERNAL_ERROR :
          case DHIR.error.ResetAccess.MALFORMED_MISSING_REQUIRED_DATA :
          case DHIR.error.ResetAccess.MALFORMED_INVALID_VALUE :
          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break
        }
      })
  }


  function validateForm(form) {
    if(form.$valid) {
      this.resetPin();
    }
    else {
      form.OIID.$setTouched()
      form.role.$setTouched()
      form.retrieverPin.$setTouched()
      form.pinConfirm.$setTouched()
    }
  }
}

export default {
  name: 'resetPin',
  view: {
    controller: resetPin$ctrl,
    template: `
       <div ng-if="$ctrl.isTokenValid">
        <div class="row">
          <div class="col-xs-12">
            <h1 translate="pinReset.TITLE"></h1>
          </div>

          <form class="form form-container" name="resetPinForm" id="resetPinForm">

            <oiid-capture
              oiid="$ctrl.patientInfo.oiid"
              form="resetPinForm"
              is-optional="false">
            </oiid-capture>
            <br />

            <role-capture
              role="$ctrl.submitterInfo.relationshipToPatient"
              form="resetPinForm">
            </role-capture>

            <pin-capture
              pin="$ctrl.pin"
              pin-confirm="$ctrl.pinConfirm"
              form="resetPinForm">
              <hint>
                <small translate="pinReset.HINT"></small>
              </hint>
            </pin-capture>

             <button class="btn btn-primary"
                id="resetPinButton"
                type="button"
                translate="pinReset.BUTTON"
                ng-click="$ctrl.validateForm(resetPinForm)">
            </button>
          </form>
        </div>
      </div>

      <div class="alert alert-danger" ng-if="!$ctrl.isTokenValid">
        Token not valid
      </div>

      <!-- TODO: remove testing values after QA -->
      <br />
    <button class="btn btn-xs btn-info" ng-click="$ctrl.showQaValues = !$ctrl.showQaValues">QA Values</button>
    <pre ng-if="$ctrl.showQaValues">
OIID Responses:
GM29BJXKBV - Successful request
GQNHDGMVBJ - Invalid resource
2RD35C2G24 - Token is invalid
J2GKTFSSX2 - Token has expired
N4J323QRN2 - Resource is not associated to token
TG6LLNCDBG - Authorization is required for the interaction that was attempted
CRTX6N3BMS - Too many requests
X4T2W97MMM - Internal error
Missing   - omit required fields
Invalid   - submitting a value that does not match the format
Not found - submit a valid OIID not listed above

TOKENS:
kSHZ1mMSvEJfiO7AltmlD9BXyRk20OjL5drouDCD9gwN - Successful request
DdWPl9F4Vuoq6y3Udc3zHvcOnKbKIXkhG5QSNbKH0Hw7 - Token has expired
NwDapOKwNU1hNRnSmVMoq3ZlNRZeNsb4dstSNsanZtgZ - Authorization is required for the interaction that was attempted
lhalN9HrT8eTwYc53ZKnhld9KYOPof6yIFFUsZ6pxmhP - Too many requests
gb7G3XvyTTo087ldACGkkjOpL9yMuhwXPAX3btTbv3ut - Internal error
    </pre>
<!-- End TODO -->
  </div>
</div>
    `
  },
}
