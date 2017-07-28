/* @ngInject */
function newPin$ctrl (
  ImmunizationRecordService,
  $uibModal,
  $state,
  Endpoint,
  Notify,
  Utility,
  ICON_NOTIFICATION,
  DHIR) {
  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient()
    this.submitterInfo = ImmunizationRecordService.getSubmitter()

    /* Func dec */
    this.openHelpModal = () => Notify.publish(ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID)
    this.openHCNHelpModal = openHCNHelpModal
    this.goToSetPin = goToSetPin
    this.validateForm = validateForm
  }

  /**
   * Go to set PIN page, if user completes form correctly
   * @param form
   */
  function goToSetPin () {
    Endpoint.ValidateHCN(this.patientInfo.oiid, this.patientInfo.healthCardNumber)
      .then(() => {
        ImmunizationRecordService.setPatient(this.patientInfo)
        ImmunizationRecordService.setSubmitter(this.submitterInfo)
        $state.go('^.set-pin', { relationship: this.submitterInfo.relationshipToPatient })
      })
      .catch((errorId) => {
        switch (errorId) {
          case DHIR.error.ValidateHCN.LOCKED_OUT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.ValidateHCN.RATE_LIMIT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

          case DHIR.error.ValidateHCN.HCN_NOT_AVAILABLE:
          case DHIR.error.ValidateHCN.HCN_ALREADY_USED:
          case DHIR.error.ValidateHCN.HCN_AND_OIID_DONT_MATCH:
            Notify.publish(ICON_NOTIFICATION.INFO_MISMATCH)
            break

          case DHIR.error.ValidateHCN.RESOURCE_NOT_FOUND:
          case DHIR.error.ValidateHCN.MALFORMED_REQUEST:
          case DHIR.error.ValidateHCN.SERVER_INTERNAL_ERROR:
          case DHIR.error.ValidateHCN.MALFORMED_MISSING_REQUIRED_DATA:
          case DHIR.error.ValidateHCN.MALFORMED_INVALID_VALUE:
          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break
        }
      })
  }

  function validateForm (form) {
    if (form.$valid) this.goToSetPin()
    else Utility.focusFirstInvalidField(form)
  }

  /**
   * Opens odal windoe for information on HCN
   */
  function openHCNHelpModal () {
    $uibModal.open({
      animation: true,
      template: '<no-health-card-modal $close="$close(result)"></no-health-card-modal>',
      controller: () => {},
      size: 'sm'
    }).result
      .catch(angular.noop)
  }
}

export default {
  name: 'newPin',
  view: {
    controller: newPin$ctrl,
    template: `
      <div class="row">
        <div class="col-xs-12">
          <h1 translate="newPin.TITLE"></h1>
        </div>
      </div>

      <form class="form form-container" id="newPinForm" name="newPinForm" autocomplete="off" novalidate>
        <oiid-display
          oiid="$ctrl.patientInfo.oiid">
        </oiid-display>
        <br aria-hidden="true" />

        <role-capture
          role="$ctrl.submitterInfo.relationshipToPatient"
          form="newPinForm">
        </role-capture>

        <hcn-capture
          health-card-number="$ctrl.patientInfo.healthCardNumber"
          form="newPinForm"
          display-image="false"
          is-optional="false">

          <hint>
            <span translate="newPin.HC_HINT_PARA"></span>
            <br aria-hidden='true' />
            <button translate="newPin.HC_HINT_LINK"
              type="button"
              class="icon-btn-link text-left"
              ng-click='$ctrl.openHCNHelpModal()'
              id="noHealthCardNumberButton">
            </button>
          </hint>

        </hcn-capture>

         <button class="btn btn-primary"
              id="newPinButton"
              type="submit"
              translate="newPin.VERIFY_BUTTON"
              ng-click="$ctrl.validateForm(newPinForm)">
          </button>

      </form>

      <br aria-hidden="true" />
      <p translate="newPin.HINT" translate-compile></p>
    `
  }
}
