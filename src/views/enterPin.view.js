/* @ngInject */
function enterPin$ctrl (
 ImmunizationRecordService,
 $uibModal,
 $state,
 $stateParams,
 Endpoint,
 FhirRecordConverter,
 Notify,
 DhirErrorHandler,
 ICON_NOTIFICATION,
 Utility
) {
  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient();
    this.submitterInfo = ImmunizationRecordService.getSubmitter();
    this.pin = '';

    /*Func dec*/
    this.openHelpModal = openHelpModal;
    this.verify = verify;
    this.goToForgotPin = goToForgotPin;
  }

  /**
   *  Opens modal window for information on OIID and PIN
   */
  function openHelpModal () {
    let modalInstance = $uibModal.open({
      animation: true,
      template: '<welcome-help-modal $close="$close(result)"></welcome-help-modal>',
      controller: () => {},
      size: 'md',
    }).result
      .catch((error)=>{console.log(error)});
  }

  /**
   * Go to forgot PIN page, if user clicks on "Forgot the PIN"
   * @param form
   */
  function goToForgotPin() {
    $state.go('^.forgot-pin')
  }

  /**
   * Go to post-validation dispatcher, if user completes form correctly
   * @param form
   */
  function verify (form) {
    if (form.$valid) {
      Notify.publish(ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS)
      Endpoint.retrieveImmunizationRecord(this.patientInfo.oiid, this.pin)
        .then(FhirRecordConverter.convert)
        .then(FhirRecordConverter.populateConvertedData)
        .then((retrievedRecord) => {
          ImmunizationRecordService.setPatient(retrievedRecord.patient);
          ImmunizationRecordService.setRetrievedImmunizations(retrievedRecord.retrievedImmunizations);
          ImmunizationRecordService.setRecommendations(retrievedRecord.recommendations);
        })
        .then(() => $state.go('verification.dispatch-after-verification', {relationship: this.submitterInfo.relationshipToPatient}))
        .then(() => Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS))
        .catch(DhirErrorHandler.notifyRetrievalError);
    }
    else {
      Utility.focusFirstInvalidField(form)
    }
  }
}

export default {
  name: 'enterPin',
  view: {
    controller: enterPin$ctrl,
    template: `
      <div class="row">
        <div class="col-xs-12">
          <h1 translate="enterPin.TITLE"></h1>
        </div>
      </div>

      <form class="form form-container" id="enterPinForm" name="enterPinForm" novalidate>
        <oiid-display
          oiid="$ctrl.patientInfo.oiid">
        </oiid-display>
        <br />

        <role-capture
          role="$ctrl.submitterInfo.relationshipToPatient"
          form="enterPinForm">
        </role-capture>

        <pin-capture pin="$ctrl.pin"
                     form="enterPinForm"
                     isOptional="false">
          <label>{{ 'pinCapture.YELLOWCARD_RETRIEVAL_LOGIN_PIN' | translate }}</label>
          <hint>
            <p>
              <button translate="enterPin.FORGOT_PIN"
                type = "button"
                class="icon-btn-link text-left"
                ng-click='$ctrl.goToForgotPin()'
                id="forgotPinButton">
              </button>
            </p>
          </hint>
        </pin-capture>

         <button class="btn btn-primary"
              type = "submit"
              id="enterPinButton"
              type="button"
              translate="enterPin.VERIFY_BUTTON"
              ng-click="$ctrl.verify(enterPinForm)">
          </button>

      </form>

      <br />
      <p translate="enterPin.HINT" translate-compile></p>
    `
  }
}
