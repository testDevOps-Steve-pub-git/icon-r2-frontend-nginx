/* @ngInject */
function newPinController (
  ImmunizationRecordService,
  $uibModal,
  $state,
  Endpoint,
  Notify,
  ICON_NOTIFICATION,
  DHIR) {

  this.$onInit = () => {
    this.patientInfo = ImmunizationRecordService.getPatient();
    this.submitterInfo = ImmunizationRecordService.getSubmitter();

    /*Func dec*/
    this.openHelpModal = openHelpModal;
    this.openHCNHelpModal = openHCNHelpModal;
    this.goToSetPin = goToSetPin;
    this.validateForm = validateForm;
  };


  /**
   * Go to set PIN page, if user completes form correctly
   * @param form
   */
  function goToSetPin() {
    Endpoint.ValidateHCN(this.patientInfo.oiid, this.patientInfo.healthCardNumber)
      .then( ()=> {
        ImmunizationRecordService.setPatient(this.patientInfo);
        ImmunizationRecordService.setSubmitter(this.submitterInfo);
        $state.go('^.set-pin', { relationship: this.submitterInfo.relationshipToPatient })
      })
      .catch( (errorId)=> {
        switch(errorId) {
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


  function validateForm(form) {
    if(form.$valid) {
      this.goToSetPin();
    }
    else {
      form.healthCardNumber.$setTouched();
      form.role.$setTouched();
    }
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
   * Opens odal windoe for information on HCN
   */
  function openHCNHelpModal () {
    let modalInstance = $uibModal.open({
      animation: true,
      template: '<no-health-card-modal $close="$close(result)"></no-health-card-modal>',
      controller: () => {},
      size: 'sm',
    }).result
      .catch((error)=>{console.log(error)});
  }
}

module.exports = {
  controller: newPinController,
  template: `
    <div class="row">
      <div class="col-xs-12">
        <h1 translate="newPin.TITLE"></h1>
      </div>
    </div>

    <form class="form form-container" id="newPinForm" name="newPinForm" autocomplete="off">
      <oiid-display
        oiid="$ctrl.patientInfo.oiid">
      </oiid-display>
      <br />

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
          <p>
          <button translate="newPin.HC_HINT_LINK"
            class="icon-btn-link text-left"
            ng-click='$ctrl.openHCNHelpModal()'
            id="noHealthCardNumberButton">
          </button>
          </p>
        </hint>

      </hcn-capture>

       <button class="btn btn-primary"
            id="newPinButton"
            type="button"
            translate="newPin.VERIFY_BUTTON"
            ng-click="$ctrl.validateForm(newPinForm)">
        </button>

    </form>

    <br />
    <p translate="newPin.HINT" translate-compile></p>
  `
};
