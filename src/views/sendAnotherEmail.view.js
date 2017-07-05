/* @ngInject */
function sendAnotherEmail$ctrl (
  ImmunizationRecordService,
  Multitenancy,
  Endpoint,
  $state,
  Notify,
  ICON_NOTIFICATION,
  DHIR
) {

  this.$onInit = ()=> {
    this.patientInfo = ImmunizationRecordService.getPatient()
    this.submitterInfo = ImmunizationRecordService.getSubmitter()

    Multitenancy.getPhuKeys()
      .then((phuAssets) => {
        this.multitenancy = phuAssets;
        this.phuId = this.multitenancy.PHIX_PHU_CODE
      })

    this.showOiidError = false
    this.resetShowOiidError = () => {
      this.showOiidError = false
    }

    /*Function Declaration*/
    this.forgotEmail = forgotEmail;
    this.validateFormAndSubmit = validateFormAndSubmit;
  }


  function forgotEmail() {
    Notify.publish(ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS)
    Endpoint.ResetAccess(this.patientInfo.oiid, this.submitterInfo.email, this.phuId)
      .then( ()=> { $state.go('^.email-confirmation'); })
      .then(() => Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS))
      .catch( (errorId)=> {
        Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS)
        switch(errorId) {

          case DHIR.error.ResetAccess.WRONG_EMAIL_PROVIDED:
            Notify.publish(ICON_NOTIFICATION.INFO_MISMATCH)
            break

          case DHIR.error.ResetAccess.NO_EMAIL_ON_FILE:
            Notify.publish(ICON_NOTIFICATION.NO_EMAIL_ON_FILE)
            break

          case DHIR.error.ResetAccess.LOCKED_OUT :
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.ResetAccess.RATE_LIMIT :
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

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


  function validateFormAndSubmit(form) {
    if(form.$valid) {
      this.forgotEmail();
    }
    else {
      form.OIID.$setTouched();
      form.email.$setTouched();
    }

  }
}

export default {
  name: 'sendAnotherEmail',
  view: {
    controller: sendAnotherEmail$ctrl,
    template: `
      <div class="row">
        <div class="col-xs-12">
          <h1 translate="pinEmailExpired.TITLE"></h1>
          <p translate="pinEmailExpired.PARA"></p>
          <hr />
        </div>
      </div>
      
      <div class="row">
        <div class="col-xs-12">
          <h1 translate="pinEmailExpired.SEND_ANOTHER_TITLE"></h1>
          <p translate="pinEmailExpired.SEND_ANOTHER_PARA"></p>
        </div>
      </div>
      
      <form class="form form-container" name="sendEmailAgainForm" id="sendEmailAgainForm" autocomplete="off">

        <oiid-capture
          form="sendEmailAgainForm"
          oiid="$ctrl.patientInfo.oiid"
          is-optional="false"
          on-oiid-change="$ctrl.resetShowOiidError()">
            <errors>
              <div ng-if="$ctrl.showOiidError" class="alert alert-danger col-xs-12" translate="oiidCapture.ERRORS.OIID_INVALID"></div>
            </errors>
        </oiid-capture>

        
        <email-capture
          email="$ctrl.submitterInfo.email"
          form="sendEmailAgainForm"
          is-optional="false">
        </email-capture>
        
        <button class="btn btn-primary"
          id="sendAnotherEmailButton"
          type="button"
          translate="pinForgot.BUTTON"
          ng-click="$ctrl.validateFormAndSubmit(sendEmailAgainForm)">
        </button>
      </form>
      
      
      <!-- TODO: remove testing values after QA -->
    <button class="btn btn-xs btn-info" ng-click="$ctrl.showQaValues = !$ctrl.showQaValues">QA Values</button>
    <pre ng-if="$ctrl.showQaValues">
OIID          Expected Response
---------------------------------
GM29BJXKBV    Successful request
8WMWH3L6BH    First Time Login (Set PIN with HCN)
ZPH6BL29BP    First time Login (Set PIN with HCN) also works on simulator for retrieval
GQNHDGMVBJ    Invalid resource
2RD35C2G24    Token is invalid
J2GKTFSSX2    Token has expired
N4J323QRN2    Resource is not
              associated to token
TG6LLNCDBG    Authorization is required
              for the interaction that
              was attempted
CRTX6N3BMS    Too many requests
X4T2W97MMM    Internal error
    </pre>
<!-- End TODO -->
    `
  },
}
