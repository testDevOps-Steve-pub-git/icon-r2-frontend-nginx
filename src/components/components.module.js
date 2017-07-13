/* Welcome import */
import WelcomeImports from './welcome/welcome.components.module'
/* End Welcome import */

/* Immunization imports */
import ImmunizationImports from './immunization/immunization.components.module'
/* End Immunization imports */

/* Retrieval imports */
import authSurvey from './retrieval/authModalSurvey/authModalSurvey.component.js'
import patientAuthDisplay from './retrieval/patientAuthDisplay/patientAuthDisplay.component.js'
import yellowCardDisplay from './retrieval/yellowCardDisplay/yellowCardDisplay.component.js'
import yellowCardRecommendations from './retrieval/yellowCardRecommendations/yellowCardRecommendations.component.js'
/* End Retrieval imports */

/* Address imports */
import addressCapture from './address/addressCapture/addressCapture.component.js'
import addressDisplay from './address/addressDisplay/addressDisplay.component.js'
import addressPoBox from './address/addressPOBox/addressPOBox.component.js'
import addressRural from './address/addressRural/addressRural.component.js'
import addressStreet from './address/addressStreet/addressStreet.component.js'
import addressToggle from './address/addressToggle/addressToggle.component.js'
import addressTypeahead from './address/addressTypeahead/addressTypeahead.component.js'
/* End Address imports */

/* Patient imports */
import authSelfPatientContainer from './patient/authSelfPatientContainer/authSelfPatientContainer.component.js'
import authOtherPatientContainer from './patient/authOtherPatientContainer/authOtherPatientContainer.component.js'
import patientCapture from './patient/patientCapture/patientCapture.component.js'
import patientOtherDisplay from './patient/patientOtherDisplay/patientOtherDisplay.component.js'
import patientSelfDisplay from './patient/patientSelfDisplay/patientSelfDisplay.component.js'
import authSchoolDaycare from './patient/authSchoolDaycareCapture/authSchoolDaycareCapture.component.js'
/* End Patient imports */

/* Submitter imports */
import submitterEmail from './submitter/submitterContactCapture/submitterContactEmail.component.js'
import submitterPhone from './submitter/submitterContactCapture/submitterPhoneCapture.component.js'
import submitterDemographicCapture from './submitter/submitterDemographicsCapture/submitterCapture.component.js'
import submitterDisplay from './submitter/submitterDisplay/submitterDisplay.component.js'
/* End Submitter imports */

/* Document components */
import documentUploadCapture from './documents/documentUploadCapture/documentUploadCapture.component.js'
import documentUploadDisplay from './documents/documentUploadDisplay/documentUploadDisplay.component.js'
/* End Document components */

/* Review imports */
import editButton from './review/editButton/editButton.component.js'
import submitImmunizations from './review/submitImmunizations/submitImmunizations.component.js'
/* End Review imports */

/* Confirmation imports */
import confirmationMessage from './confirmation/confirmationMessage/confirmationMessage.component.js'
import survey from './confirmation/confirmationSurvey/survey.component.js'
import submitAnother from './confirmation/confirmationSubmitAnother/submitAnother.component.js'
/* End Confirmation imports */

/* Index imports */
import returnHomeModal from './index/returnHomeModal/returnHomeModal.component.js'

/* Phu Header imports */
import languageSelector from './index/phuHeader/languageSelector/languageSelector.component.js'
import phuHeader from './index/phuHeader/phuHeader/phuHeader.component.js'
/* End Phu Header imports */

import browserSupport from './index/browserSupport/browserSupport.component.js'
import phuFooter from './index/phuFooter/phuFooter.component.js'
import skipToContent from './index/skipToContent/skipToContent.component.js'
/* End Index imports */

/* Progress Bar components */
import progressBar from './progressBar/progressBar.component.js'
/* End Progress Bar components */

/* Form imports */
import datepicker from './form/datepicker/datepicker.component.js'
import actionButton from './form/actionButton/actionButton.component.js'
import nextPrevButtons from './form/nextPrevButtons/nextPrevButtons.component.js'
import emailCapture from './form/emailCapture/emailCapture.component.js'
import hcnCapture from './form/hcnCapture/hcnCapture.component.js'
import oiidCapture from './form/oiidCapture/oiidCapture.component.js'
import oiidDisplay from './form/oiidDisplay/oiidDisplay.component.js'
import pinCapture from './form/pinCapture/pinCapture.component.js'
import roleCapture from './form/roleCapture/roleCapture.component.js'
import noHealthCardModal from './form/noHealthCardModal/noHealthCardModal.component.js'
/* End Form imports */

/* Notification components */
import notification from './notification/notification.component.js'
import dismissableInfoNotification from './notification/dismissableInfoNotification.component.js'
import inactivityTimeoutNotification from './notification/inactivityTimeoutNotification.component.js'
import sessionExpiredNotification from './notification/sessionExpiredNotification.component.js'
import staticProgressNotification from './notification/staticProgressNotification.component.js'
/* End Notification components */

import oiidStatus from './oiidStatus/oiidStatus.component'

const MODULE = angular.module('icon.components', [])
WelcomeImports(MODULE)
ImmunizationImports(MODULE)

MODULE.component(oiidStatus.name, oiidStatus.component)

/* Retrieval components */
  .component(authSurvey.name, authSurvey.component)
  .component(patientAuthDisplay.name, patientAuthDisplay.component)
  .component(yellowCardDisplay.name, yellowCardDisplay.component)
  .component(yellowCardRecommendations.name, yellowCardRecommendations.component)
/* End Retrieval components */

/* Address components */
  .component(addressCapture.name, addressCapture.component)
  .component(addressDisplay.name, addressDisplay.component)
  .component(addressPoBox.name, addressPoBox.component)
  .component(addressRural.name, addressRural.component)
  .component(addressStreet.name, addressStreet.component)
  .component(addressToggle.name, addressToggle.component)
  .component(addressTypeahead.name, addressTypeahead.component)
/* End Address components */

/* Patient components */
  .component(authSelfPatientContainer.name, authSelfPatientContainer.component)
  .component(authOtherPatientContainer.name, authOtherPatientContainer.component)
  .component(patientCapture.name, patientCapture.component)
  .component(patientOtherDisplay.name, patientOtherDisplay.component)
  .component(patientSelfDisplay.name, patientSelfDisplay.component)
  .component(authSchoolDaycare.name, authSchoolDaycare.component)
/* End Patient components */

/* Submitter components */
  .component(submitterEmail.name, submitterEmail.component)
  .component(submitterPhone.name, submitterPhone.component)
  .component(submitterDemographicCapture.name, submitterDemographicCapture.component)
  .component(submitterDisplay.name, submitterDisplay.component)
/* End Submitter components */

/* Document components */
  .component(documentUploadCapture.name, documentUploadCapture.component)
  .component(documentUploadDisplay.name, documentUploadDisplay.component)
/* End Document components */

/* Review components */
  .component(editButton.name, editButton.component)
  .component(submitImmunizations.name, submitImmunizations.component)
/* End Review components */

/* Confirmation components */
  .component(confirmationMessage.name, confirmationMessage.component)
  .component(survey.name, survey.component)
  .component(submitAnother.name, submitAnother.component)
/* End Confirmation components */

/* Index components */
  .component(returnHomeModal.name, returnHomeModal.component)

/* Phu Header components */
  .component(languageSelector.name, languageSelector.component)
  .component(phuHeader.name, phuHeader.component)
/* End Phu Header components */

  .component(browserSupport.name, browserSupport.component)
  .component(phuFooter.name, phuFooter.component)
  .component(skipToContent.name, skipToContent.component)
/* End Index components */

/* Progress Bar components */
  .component(progressBar.name, progressBar.component)
/* End Progress Bar components */

/* Form components */
  .component(datepicker.name, datepicker.component)
  .component(nextPrevButtons.name, nextPrevButtons.component)
  .component(actionButton.name, actionButton.component)
  .component(emailCapture.name, emailCapture.component)
  .component(hcnCapture.name, hcnCapture.component)
  .component(oiidCapture.name, oiidCapture.component)
  .component(oiidDisplay.name, oiidDisplay.component)
  .component(pinCapture.name, pinCapture.component)
  .component(roleCapture.name, roleCapture.component)
  .component(noHealthCardModal.name, noHealthCardModal.component)
/* End Form components */

/* Notification components */
  .component(notification.name, notification.component)
  .component(dismissableInfoNotification.name, dismissableInfoNotification.component)
  .component(inactivityTimeoutNotification.name, inactivityTimeoutNotification.component)
  .component(sessionExpiredNotification.name, sessionExpiredNotification.component)
  .component(staticProgressNotification.name, staticProgressNotification.component)
/* End Notification components */
