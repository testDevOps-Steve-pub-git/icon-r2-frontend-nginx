/* @ngInject */
function setPinController (
  $q,
  $state,
  DhirErrorHandler,
  Endpoint,
  ImmunizationRecordService,
  FhirRecordConverter,
  Notify,
  Utility,
  ICON_NOTIFICATION,
  DHIR
) {
  this.$onInit = () => {
    this.pin=""
    this.pinConfirm = ""

    this.patientInfo = ImmunizationRecordService.getPatient()
    this.submitterInfo = ImmunizationRecordService.getSubmitter()

    this.submit = submit
    this.setTouched = setTouched
    this.retreiveRecord = retreiveRecord
    this.setPin = setPin
  }

  /*
    Set the pin for specific OIID and handle routing, errors after submit button is clicked
  */
  function submit(form) {
      if (form.$valid) this.setPin()
      else Utility.focusFirstInvalidField(form)
  }
  /*
    Setting the pin and calling retreive immunization
  */
  function setPin () {
    Endpoint.SetPIN(this.patientInfo.oiid, this.pin, this.submitterInfo.email, this.patientInfo.healthCardNumber, this.submitterInfo.relationshipToPatient)
      .then(() => this.retreiveRecord(this.patientInfo.oiid, this.pin))
      .catch((errorId) => {
        switch(errorId) {
          case DHIR.error.SetPIN.LOCKED_OUT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.SetPIN.RATE_LIMIT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

          case DHIR.error.SetPIN.HCN_NOT_AVAILABLE:
          case DHIR.error.SetPIN.HCN_ALREADY_USED:
          case DHIR.error.SetPIN.HCN_OIID_MISMATCH:
            Notify.publish(ICON_NOTIFICATION.INFO_MISMATCH)
            break

          case DHIR.error.SetPIN.RESOURCE_NOT_FOUND:
          case DHIR.error.SetPIN.MALFORMED_REQUEST:
          case DHIR.error.SetPIN.SERVER_INTERNAL_ERROR:
          case DHIR.error.SetPIN.MALFORMED_MISSING_REQUIRED_DATA:
          case DHIR.error.SetPIN.MALFORMED_INVALID_VALUE:
          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break
        }
      })
  }

  /**
   * Retreives a patient IHR based on OIID and PIN,
   * NOTE: caller must catch errors.
   * @param {string} oiid - patient OIID (Ontario Immunization ID)
   * @param {string} pin - PIN for patient OIID
   */
  function retreiveRecord (oiid, pin) {
    Notify.publish(ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS)
    Endpoint.retrieveImmunizationRecord(oiid.toUpperCase(), pin)
      .then(FhirRecordConverter.convert)
      .then(FhirRecordConverter.populateConvertedData)
      .then((retrievedRecord) => {
          ImmunizationRecordService.setPatient(retrievedRecord.patient)
          ImmunizationRecordService.setRetrievedImmunizations(retrievedRecord.retrievedImmunizations)
          ImmunizationRecordService.setRecommendations(retrievedRecord.recommendations)
      })
      .then(() => {
        Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS)
        Notify.publish(ICON_NOTIFICATION.INFO_PIN_SET_SUCCESS)
        $state.go(
          'verification.dispatch-after-verification',
          { relationship: this.submitterInfo.relationshipToPatient }
        )
      })
      .catch((fhirErrorResponse) => {
        // TODO: Add retrieval DHIR response condition identifiers to DHIR service.
        switch (DHIR.identifySetPINError(fhirErrorResponse)) {
          case DHIR.error.SetPIN.CONSENT_BLOCK_INOFORMATIONAL:
          case DHIR.error.SetPIN.CONSENT_BLOCK_INFORMATIONAL_IN_BUNDLE:
          case DHIR.error.SetPIN.CONSENT_BLOCK_ERROR:
          case DHIR.error.SetPIN.CONSENT_BLOCK_ERROR_IN_BUNDLE:
            Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS)
            Notify.publish(ICON_NOTIFICATION.WARN_RETRIEVAL_CONSENT_BLOCK)
            break

          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break
        }
      })
  }

  /*
    Called if form is not valid.
  */
  function setTouched (form) {
    form.pin.$setTouched()
    form.email.$setTouched()
    form.pinConfirm.$setTouched()
    form.emailConfirm.$setTouched()
  }
}

export default {
  name: "setPin",
  view: {
    controller: setPinController,
    template: `
      <div class="col-xs-12" style="padding:0">
        <h2>{{ 'setPin.TITLE' | translate }}</h2>
        <p>{{ 'setPin.BODY' | translate }}</p>
        <form name="setPinForm" class="form form-container" id="setPinForm" autocomplete="off">
          <pin-capture pin="$ctrl.pin"
                       pin-confirm='$ctrl.pinConfirm'
                       form="setPinForm">
            <hint>{{ 'pinCapture.PIN_HINT' | translate }}</hint>
          </pin-capture>

          <email-capture email="$ctrl.submitterInfo.email"
                         email-confirm='$ctrl.submitterInfo.emailConfirm'
                         form="setPinForm">
            <hint>{{ 'emailCapture.EMAIL_HINT' | translate }}</hint>
          </email-capture>
          <button class="col-xs-4 btn btn-primary"
                  ng-disabled="$ctrl.form.$invalid"
                  ng-click="$ctrl.submit(setPinForm)"
                  id="set-pin-button">

            {{ 'setPin.SET_PIN' | translate }}

          </button>
        </form>
      </div>
      `
  }
}
