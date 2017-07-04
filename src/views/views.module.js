import sendAnotherEmail from './sendAnotherEmail.view'
import resetPin from './resetPin.view'
import dispatchAfterVerification from './dispatchAfterVerification.view'
import setPin from './setPin.view'
import submission from './submission.view'
import patientAddress from './patientAddress.view'

angular.module('icon.views', [])
  .component(sendAnotherEmail.name,           sendAnotherEmail.view)
  .component(resetPin.name,                   resetPin.view)
  .component(dispatchAfterVerification.name,  dispatchAfterVerification.view)
  .component(setPin.name,                     setPin.view)
  .component(submission.name,                 submission.view)

  .component('welcome',             require('./welcome.view.js'))
  .component('aup',                 require('./aup.view.js'))
  .component('auth',                require('./auth.view.js'))
  .component('anon',                require('./anon.view.js'))
  .component('self',                require('./self.view.js'))
  .component('other',               require('./other.view.js'))
  .component('authPatient',         require('./authPatient.view.js'))
  .component('anonSelfPatient',     require('./anonSelfPatient.view.js'))
  .component('anonOtherPatient',    require('./anonOtherPatient.view.js'))
  .component(patientAddress.name,             patientAddress.view)
  .component('authImmunizations',   require('./authImmunizations.view.js'))
  .component('anonImmunizations',   require('./anonImmunizations.view.js'))
  .component('documents',           require('./documents.view.js'))
  .component('submitter',           require('./submitter.view.js'))
  .component('authSelfReview',      require('./authSelfReview.view.js'))
  .component('authOtherReview',     require('./authOtherReview.view.js'))
  .component('anonSelfReview',      require('./anonSelfReview.view.js'))
  .component('anonOtherReview',     require('./anonOtherReview.view.js'))
  .component('anonConfirmation',    require('./anonConfirmation.view.js'))
  .component('authConfirmation',    require('./authConfirmation.view.js'))
  .component('anonOtherSubmission', require('./anonOtherSubmission.view.js'))
  .component('anonSelfSubmission',  require('./anonSelfSubmission.view.js'))
  .component('authOtherSubmission', require('./authOtherSubmission.view.js'))
  .component('authSelfSubmission',  require('./authSelfSubmission.view.js'))
  .component('authSelfPatient',     require('./authSelfPatient.view.js'))
  .component('authOtherPatient',    require('./authOtherPatient.view.js'))

  .component('verification',        require('./verification.view.js'))
  .component('newPin',              require('./newPin.view.js'))
  .component('setPinConfirmation',  require('./setPinConfirmation.view.js'))
  .component('enterPin',            require('./enterPin.view.js'))
  .component('forgotPin',           require('./forgotPin.view.js'))
  .component('emailConfirmation',   require('./emailConfirmation.view.js'))
  .component('resetPinConfirmation',require('./resetPinConfirmation.view.js'))
