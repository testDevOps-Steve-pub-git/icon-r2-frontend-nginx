/* @ngInject */
function resetPin$ctrl (
  $stateParams,
  $state,
  $translate,
  Endpoint,
  ImmunizationRecordService,
  Notify,
  Utility,
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
    if ($stateParams.relationship) this.submitterInfo.relationshipToPatient = $stateParams.relationship

    Endpoint.ValidateToken(this.token)
      .catch((error) => {
        switch (error) {
          case DHIR.error.ValidateToken.TOKEN_EXPIRED :
          case DHIR.error.ValidateToken.TOKEN_INVALID :
          default:
            $state.go('verification.send-another-email')
            break
        }
      })

    /* Function Declaration */
    this.resetPin = resetPin
    this.validateForm = validateForm
  }

  function resetPin () {
    Endpoint.ResetPIN(this.token, this.patientInfo.oiid, this.submitterInfo.relationshipToPatient, this.pin)
      .then(() => {
        ImmunizationRecordService.setPatient(this.patientInfo)
        ImmunizationRecordService.setSubmitter(this.submitterInfo)
        Notify.publish(ICON_NOTIFICATION.INFO_PIN_SET_SUCCESS)
        $state.go('welcome')
      })
      .catch((errorId) => {
        switch (errorId) {
          case DHIR.error.ResetAccess.LOCKED_OUT :
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.ResetAccess.RATE_LIMIT :
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

          /* Currently no different error messages on mockups for these */
          case DHIR.error.ResetAccess.OIID_AND_TOKEN_DONT_MATCH:
          case DHIR.error.ResetAccess.INVALID_RESOURCE:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break

          case DHIR.error.ResetAccess.TOKEN_EXPIRED_FOR_PIN:
          case DHIR.error.ResetAccess.TOKEN_INVALID_FOR_PIN:
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

  function validateForm (form) {
    if (form.$valid) this.resetPin()
    else Utility.focusFirstInvalidField(form)
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

          <form class="col-xs-12 form form-container" name="resetPinForm" id="resetPinForm" novalidate>

            <oiid-capture
              oiid="$ctrl.patientInfo.oiid"
              form="resetPinForm"
              is-optional="false">
            </oiid-capture>

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
  </div>
</div>
    `
  }
}
