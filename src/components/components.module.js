angular.module('icon.components', [])
/* Welcome components */
  .component('welcomeLandingPage',          require('./welcome/welcomeLandingPage/welcomeLandingPage.component.js'))
  .component('ontarioImmunizationSchedule', require('./welcome/ontarioImmunizationSchedule/ontarioImmunizationSchedule.component.js'))
  .component('welcomeLogin',                require('./welcome/welcomeLogin/welcomeLogin.component.js'))
  .component('welcomeModal',                require('./welcome/welcomeSubmitterModal/welcomeSubmitterModal.component.js'))
  .component('welcomeHelpModal',            require('./welcome/welcomeHelpModal/welcomeHelpModal.component.js'))
  .component('welcomeAup',                  require('./welcome/welcomeAUP/welcomeAUP.component.js'))
/* End Welcome components */

/* Login components */
  .component('login',                       require('./login/login.component.js'))
/* End Login components */

/* Retrieval components */
  .component('patientAuthDisplay',          require('./retrieval/patientAuthDisplay/patientAuthDisplay.component.js'))
  .component('authSurvey',                  require('./retrieval/authModalSurvey/authModalSurvey.component.js'))
  .component('yellowCardDisplay',           require('./retrieval/yellowCardDisplay/yellowCardDisplay.component.js'))
  .component('yellowCardRecommendations',   require('./retrieval/yellowCardRecommendations/yellowCardRecommendations.component.js'))
/* End Retrieval components */

/* Address components */
  .component('addressTypeahead',            require('./address/addressTypeahead/addressTypeahead.component.js'))
  .component('addressToggle',               require('./address/addressToggle/addressToggle.component.js'))
  .component('addressStreet',               require('./address/addressStreet/addressStreet.component.js'))
  .component('addressRural',                require('./address/addressRural/addressRural.component.js'))
  .component('addressPoBox',                require('./address/addressPOBox/addressPOBox.component.js'))
  .component('addressCapture',              require('./address/addressCapture/addressCapture.component.js'))
  .component('addressDisplay',              require('./address/addressDisplay/addressDisplay.component.js'))
/* End Address components */

/* Patient components */
  .component('authSelfPatientContainer',    require('./patient/authSelfPatientContainer/authSelfPatientContainer.component.js'))
  .component('authOtherPatientContainer',   require('./patient/authOtherPatientContainer/authOtherPatientContainer.component.js'))
  .component('patientCapture',              require('./patient/patientCapture/patientCapture.component.js'))
  .component('patientOtherDisplay',         require('./patient/patientOtherDisplay/patientOtherDisplay.component.js'))
  .component('patientSelfDisplay',          require('./patient/patientSelfDisplay/patientSelfDisplay.component.js'))
/* End Patient components */

/* Submitter components */
  .component('submitterEmail',              require('./submitter/submitterContactCapture/submitterContactEmail.component.js'))
  .component('submitterPhone',              require('./submitter/submitterContactCapture/submitterPhoneCapture.component.js'))
  .component('submitterDemographicCapture', require('./submitter/submitterDemographicsCapture/submitterCapture.component.js'))
  .component('submitterDisplay',            require('./submitter/submitterDisplay/submitterDisplay.component.js'))
/* End Submitter components */

/* Immunization components */
  .component('ageDisplay',                  require('./immunization/ageDisplay/ageDisplay.component.js'))
  .component('diseasesDisplay',             require('./immunization/diseasesDisplay/diseasesDisplay.component.js'))
  .component('immunizationDisplay',         require('./immunization/immunizationDisplay/immunizationDisplay.component.js'))
  .component('immunizationInput',           require('./immunization/immunizationInput/immunizationInput.component.js'))
  .component('immunizationTypeahead' ,      require('./immunization/immunizationTypeahead/immunizationTypeahead.component.js'))
  .component('tradeLotDisplay',             require('./immunization/tradeLotDisplay/tradeLotDisplay.component.js'))
  .component('immunizationGating',          require('./immunization/immunizationGating/immunizationGating.component.js'))
  .component('immunizationReviewContainer', require('./immunization/immunizationReviewDisplay/immunizationReviewContainer.component.js'))
  .component('immunizationLotInput',        require('./immunization/immunizationLotInput/immunizationLotInput.component.js'))
  .component('editImmunization',            require('./immunization/editImmunization/editImmunization.component.js'))
// by Agent
  .component('immunizationsByAgent',        require('./immunization/byAgent/immunizationsByAgent/immunizationsByAgent.component.js'))
  .component('immunizationsGroupedByAgent',  require('./immunization/byAgent/immunizationsGroupedByAgent/immunizationsGroupedByAgent.component.js'))
  .component('immunizationDisplayByAgent',  require('./immunization/byAgent/immunizationDisplayByAgent/immunizationDisplayByAgent.component.js'))
  .component('immunizationReviewDisplayAgent', require('./immunization/immunizationReviewDisplay/immunizationReviewDisplayAgent/immunizationReviewDisplayAgent.component.js'))
// by Date
  .component('immunizationsByDate',         require('./immunization/byDate/immunizationsByDate/immunizationsByDate.component.js'))
  .component('immunizationsGroupedByDate',  require('./immunization/byDate/immunizationsGroupedByDate/immunizationsGroupedByDate.component.js'))
  .component('immunizationDisplayByDate',   require('./immunization/byDate/immunizationDisplayByDate/immunizationDisplayByDate.component.js'))
  .component('immunizationReviewDisplayDate', require('./immunization/immunizationReviewDisplay/immunizationReviewDisplayDate/immunizationReviewDisplayDate.component.js'))
/* End immunization components */

/* Document components */
  .component('documentUploadCapture',       require('./documents/documentUploadCapture/documentUploadCapture.component.js'))
  .component('documentUploadDisplay',       require('./documents/documentUploadDisplay/documentUploadDisplay.component.js'))
/* End Document components */

/* Review components */
  .component('editButton',                  require('./review/editButton/editButton.component.js'))
  .component('submitImmunizations',         require('./review/submitImmunizations/submitImmunizations.component.js'))
/* End Review components */

/* Confirmation components */
  .component('confirmationMessage',         require('./confirmation/confirmationMessage/confirmationMessage.component.js'))
  .component('survey',                      require('./confirmation/confirmationSurvey/survey.component.js'))
  .component('submitAnother',               require('./confirmation/confirmationSubmitAnother/submitAnother.component.js'))
/* End Confirmation components */

/* Index components */
  .component('returnHomeModal',             require('./index/returnHomeModal/returnHomeModal.component.js'))

/* Phu Header components */
  .component('languageSelector',            require('./index/phuHeader/languageSelector/languageSelector.component.js'))
  .component('phuHeader',                   require('./index/phuHeader/phuHeader/phuHeader.component.js'))
/* End Phu Header components */

/* Toast components */
  .component('toastContainer',              require('./index/toastComponents/toastContainer/toastContainer.component.js'))
  .component('clearInfoToast',              require('./index/toastComponents/clearInfoToast/clearInfoToast.component.js'))
  .component('errorToast',                  require('./index/toastComponents/errorToast/errorToast.component.js'))
  .component('extendSessionToast',          require('./index/toastComponents/extendSessionToast/extendSessionToast.component.js'))
  .component('loadingToast',                require('./index/toastComponents/loadingToast/loadingToast.component.js'))
/* End Toast components */

/* Session Expiration components */
  .component('sessionExpirationModal',      require('./index/sessionExpirationModal/sessionExpirationModal.component.js'))
  .component('sessionContinaer',            require('./index/sessionExpirationModal/sessionExpirationContainer.component.js'))
/* End Session Expiration components */

  .component('browserSupport',              require('./index/browserSupport/browserSupport.component.js'))
  .component('phuFooter',                   require('./index/phuFooter/phuFooter.component.js'))
  .component('skipToContent',               require('./index/skipToContent/skipToContent.component.js'))
/* End Index components */

/* Progress Bar components */
  .component('progressBar',                 require('./progressBar/progressBar.component.js'))
/* End Progress Bar components */

/* Form components */
  .component('datepicker',                  require('./form/datepicker/datepicker.component.js'))
  .component('nextPrevButtons',             require('./form/nextPrevButtons/nextPrevButtons.component.js'))
  .component('actionButton',                require('./form/actionButton/actionButton.component.js'))
/* End Form components */

/* Notification components */
  .component('notification',                  require('./notification/notification.component.js'))
  .component('dismissableInfoNotification',   require('./notification/dismissableInfoNotification.component.js'))
  .component('inactivityTimeoutNotification', require('./notification/inactivityTimeoutNotification.component.js'))
  .component('sessionExpiredNotification',    require('./notification/sessionExpiredNotification.component.js'))
  .component('staticProgressNotification',    require('./notification/staticProgressNotification.component.js'))
/* End Notification components */
