import anon                                  from './anon.view'
import anonConfirmation                      from './anonConfirmation.view'
import anonImmunizations                     from './anonImmunizations.view'
import anonOtherPatient                      from './anonOtherPatient.view'
import anonOtherReview                       from './anonOtherReview.view'
import anonOtherSubmission                   from './anonOtherSubmission.view'
import anonSelfPatient                       from './anonSelfPatient.view'
import anonSelfReview                        from './anonSelfReview.view'
import anonSelfSubmission                    from './anonSelfSubmission.view'
import aup                                   from './aup.view'
import auth                                  from './auth.view'
import authConfirmation                      from './authConfirmation.view'
import authImmunizations                     from './authImmunizations.view'
import authOtherPatient                      from './authOtherPatient.view'
import authOtherReview                       from './authOtherReview.view'
import authOtherSubmission                   from './authOtherSubmission.view'
import authPatient                           from './authPatient.view'
import authSelfPatient                       from './authSelfPatient.view'
import authSelfReview                        from './authSelfReview.view'
import authSelfSubmission                    from './authSelfSubmission.view'
import dispatchAfterVerification             from './dispatchAfterVerification.view'
import documents                             from './documents.view'
import emailConfirmation                     from './emailConfirmation.view'
import enterPin                              from './enterPin.view'
import forgotPin                             from './forgotPin.view'
import newPin                                from './newPin.view'
import other                                 from './other.view'
import patientAddress                        from './patientAddress.view'

import resetPin                              from './resetPin.view'
import resetPinConfirmation                  from './resetPinConfirmation.view'

import self                                  from './self.view'
import sendAnotherEmail                      from './sendAnotherEmail.view'
import setPin                                from './setPin.view'
import setPinConfirmation                    from './setPinConfirmation.view'
import submission                            from './submission.view'
import submitter                             from './submitter.view'
import verification                          from './verification.view'
import welcome                               from './welcome.view'

angular.module('icon.views', [])
  .component(anon.name,                       anon.view)
  .component(anonConfirmation.name,           anonConfirmation.view)
  .component(anonImmunizations.name,          anonImmunizations.view)
  .component(anonOtherPatient.name,           anonOtherPatient.view)
  .component(anonOtherReview.name,            anonOtherReview.view)
  .component(anonOtherSubmission.name,        anonOtherSubmission.view)
  .component(anonSelfPatient.name,            anonSelfPatient.view)
  .component(anonSelfReview.name,             anonSelfReview.view)
  .component(anonSelfSubmission.name,         anonSelfSubmission.view)
  .component(aup.name,                        aup.view)
  .component(auth.name,                       auth.view)
  .component(authConfirmation.name,           authConfirmation.view)
  .component(authImmunizations.name,          authImmunizations.view)
  .component(authOtherPatient.name,           authOtherPatient.view)
  .component(authOtherReview.name,            authOtherReview.view)
  .component(authOtherSubmission.name,        authOtherSubmission.view)
  .component(authPatient.name,                authPatient.view)
  .component(authSelfPatient.name,            authSelfPatient.view)
  .component(authSelfReview.name,             authSelfReview.view)
  .component(authSelfSubmission.name,         authSelfSubmission.view)
  .component(dispatchAfterVerification.name,  dispatchAfterVerification.view)
  .component(documents.name,                  documents.view)
  .component(emailConfirmation.name,          emailConfirmation.view)
  .component(enterPin.name,                   enterPin.view)
  .component(forgotPin.name,                  forgotPin.view)
  .component(newPin.name,                     newPin.view)
  .component(other.name,                      other.view)
  .component(patientAddress.name,             patientAddress.view)

  .component(resetPin.name,                   resetPin.view)
  .component(resetPinConfirmation.name,       resetPinConfirmation.view)

  .component(self.name,                       self.view)
  .component(sendAnotherEmail.name,           sendAnotherEmail.view)
  .component(setPin.name,                     setPin.view)
  .component(setPinConfirmation.name,         setPinConfirmation.view)
  .component(submission.name,                 submission.view)
  .component(submitter.name,                  submitter.view)
  .component(verification.name,               verification.view)
  .component(welcome.name,                    welcome.view)
