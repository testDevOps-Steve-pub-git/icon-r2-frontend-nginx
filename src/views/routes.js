// Set this to true to see all routes reflected in URL.
const DEBUG_URL = true

const progress = {
  PATIENT: {
    title: 'progressBar.PATIENT',
    sref: '.patient',
    glyph: 'fa fa-user'
  },
  ADDRESS: {
    title: 'progressBar.ADDRESS',
    sref: '.address',
    glyph: 'fa fa-envelope'
  },
  IMMUNIZATIONS: {
    title: 'progressBar.IMMUNIZATIONS',
    sref: '.immunizations',
    glyph: 'fa fa-imm-vial'
  },
  DOCUMENTS: {
    title: 'progressBar.DOCUMENTS',
    sref: '.documents',
    glyph: 'fa fa-paperclip'
  },
  SUBMITTER: {
    title: 'progressBar.SUBMITTER',
    sref: '.submitter',
    glyph: 'fa fa-user'
  },
  REVIEW: {
    title: 'progressBar.REVIEW',
    sref: '.review',
    glyph: 'fa fa-eye'
  },
  CONFIRMATION: {
    title: 'progressBar.CONFIRMATION',
    sref: '.confirmation',
    glyph: 'fa fa-thumbs-up'
  }
}

const WELCOME = {
  component: `welcome`,
  url: (DEBUG_URL) ? `/welcome` : `/`
}

const AUP = {
  component: `aup`,
  url: `/aup?action`
}

const AUTH = {
  component: `auth`,
  url: `/auth`
}

const ANON = {
  component: `anon`,
  url: `/anon`
}

const SELF = {
  abstract: true,
  component: `self`,
  url: (DEBUG_URL) ? `/self` : ``
}

const OTHER = {
  abstract: true,
  component: `other`,
  url: (DEBUG_URL) ? `/other` : ``
}

const SUBMISSION = {
  component: `submission`,
  url: `/submission?action`
}

const ANON_SELF_SUBMISSION = {
  component: `anonSelfSubmission`,
  url: (DEBUG_URL) ? `/submission` : ``,
  data: {
    navStates: [
      /* ------CURRENT STATE-------------------PREVIOUS STATE----------------NEXT STATE------------ */
      { ...progress.PATIENT, previous: null, next: progress.ADDRESS },
      { ...progress.ADDRESS, previous: progress.PATIENT, next: progress.IMMUNIZATIONS },
      { ...progress.IMMUNIZATIONS, previous: progress.ADDRESS, next: progress.DOCUMENTS },
      { ...progress.DOCUMENTS, previous: progress.IMMUNIZATIONS, next: progress.REVIEW },
      { ...progress.REVIEW, previous: progress.DOCUMENTS, next: progress.CONFIRMATION },
      { ...progress.CONFIRMATION, previous: progress.REVIEW, next: null }
    ],
    baseState: `anon.self.submission`
  }
}

const ANON_OTHER_SUBMISSION = {
  component: `anonOtherSubmission`,
  url: (DEBUG_URL) ? `/submission` : ``,
  data: {
    navStates: [
      /* ------CURRENT STATE-------------------PREVIOUS STATE----------------NEXT STATE------------ */
      { ...progress.PATIENT, previous: null, next: progress.ADDRESS },
      { ...progress.ADDRESS, previous: progress.PATIENT, next: progress.IMMUNIZATIONS },
      { ...progress.IMMUNIZATIONS, previous: progress.ADDRESS, next: progress.DOCUMENTS },
      { ...progress.DOCUMENTS, previous: progress.IMMUNIZATIONS, next: progress.SUBMITTER },
      { ...progress.SUBMITTER, previous: progress.DOCUMENTS, next: progress.REVIEW },
      { ...progress.REVIEW, previous: progress.SUBMITTER, next: progress.CONFIRMATION },
      { ...progress.CONFIRMATION, previous: progress.REVIEW, next: null }
    ],
    baseState: `anon.other.submission`
  }
}

const AUTH_SELF_SUBMISSION = {
  component: `authSelfSubmission`,
  url: (DEBUG_URL) ? `/submission` : ``,
  data: {
    navStates: [
      /* ------CURRENT STATE-------------------PREVIOUS STATE----------------NEXT STATE------------ */
      { ...progress.IMMUNIZATIONS, previous: null, next: progress.DOCUMENTS },
      { ...progress.DOCUMENTS, previous: progress.IMMUNIZATIONS, next: progress.PATIENT },
      { ...progress.PATIENT, previous: progress.DOCUMENTS, next: progress.REVIEW },
      { ...progress.REVIEW, previous: progress.PATIENT, next: progress.CONFIRMATION },
      { ...progress.CONFIRMATION, previous: progress.REVIEW, next: null }
    ],
    baseState: `auth.self.submission`
  }
}

const AUTH_OTHER_SUBMISSION = {
  component: `authOtherSubmission`,
  url: (DEBUG_URL) ? `/submission` : ``,
  data: {
    navStates: [
      /* ------CURRENT STATE-------------------PREVIOUS STATE----------------NEXT STATE------------ */
      { ...progress.IMMUNIZATIONS, previous: null, next: progress.DOCUMENTS },
      { ...progress.DOCUMENTS, previous: progress.IMMUNIZATIONS, next: progress.PATIENT },
      { ...progress.PATIENT, previous: progress.DOCUMENTS, next: progress.SUBMITTER },
      { ...progress.SUBMITTER, previous: progress.PATIENT, next: progress.REVIEW },
      { ...progress.REVIEW, previous: progress.SUBMITTER, next: progress.CONFIRMATION },
      { ...progress.CONFIRMATION, previous: progress.REVIEW, next: null }
    ],
    baseState: `auth.other.submission`
  }
}

const AUTH_PATIENT = {
  component: `authPatient`,
  url: (DEBUG_URL) ? `/patient` : ``
}

const AUTH_SELF_PATIENT = {
  component: `authSelfPatient`,
  url: (DEBUG_URL) ? `/patient` : ``
}

const AUTH_OTHER_PATIENT = {
  component: `authOtherPatient`,
  url: (DEBUG_URL) ? `/patient` : ``
}

const ANON_SELF_PATIENT = {
  component: `anonSelfPatient`,
  url: (DEBUG_URL) ? `/patient` : ``
}

const ANON_OTHER_PATIENT = {
  component: `anonOtherPatient`,
  url: (DEBUG_URL) ? `/patient` : ``
}

const ADDRESS = {
  component: `patientAddress`,
  url: (DEBUG_URL) ? `/address` : ``
}

const ANON_IMMUNIZATIONS = {
  component: `anonImmunizations`,
  url: (DEBUG_URL) ? `/immunizations` : ``
}

const AUTH_IMMUNIZATIONS = {
  component: `authImmunizations`,
  url: (DEBUG_URL) ? `/immunizations` : ``
}

const DOCUMENTS = {
  component: `documents`,
  url: (DEBUG_URL) ? `/documents` : ``
}

const SUBMITTER = {
  component: `submitter`,
  url: (DEBUG_URL) ? `/submitter` : ``
}

const ANON_SELF_REVIEW = {
  component: `anonSelfReview`,
  url: (DEBUG_URL) ? `/review` : ``
}

const ANON_OTHER_REVIEW = {
  component: `anonOtherReview`,
  url: (DEBUG_URL) ? `/review` : ``
}

const AUTH_SELF_REVIEW = {
  component: `authSelfReview`,
  url: (DEBUG_URL) ? `/review` : ``
}

const AUTH_OTHER_REVIEW = {
  component: `authOtherReview`,
  url: (DEBUG_URL) ? `/review` : ``
}

const ANON_CONFIRMATION = {
  component: `anonConfirmation`,
  url: (DEBUG_URL) ? `/confirmation` : ``
}

const AUTH_CONFIRMATION = {
  component: `authConfirmation`,
  url: (DEBUG_URL) ? `/confirmation` : ``
}

const VERIFICATION = {
  component: `verification`,
  url: `/verification?action&relationship&lang`
}

const NEW_PIN = {
  component: `newPin`,
  url: (DEBUG_URL) ? `/new-pin` : ``
}

const SET_PIN = {
  component: `setPin`,
  url: (DEBUG_URL) ? `/set-pin` : ``
}

const SET_PIN_CONFIRMATION = {
  component: `setPinConfirmation`,
  url: (DEBUG_URL) ? `/set-pin-confirmation` : ``
}

const ENTER_PIN = {
  component: `enterPin`,
  url: (DEBUG_URL) ? `/enter-pin` : ``
}

const FORGOT_PIN = {
  component: `forgotPin`,
  url: (DEBUG_URL) ? `/forgot-pin` : ``
}

const EMAIL_CONFIRMATION = {
  component: `emailConfirmation`,
  url: (DEBUG_URL) ? `/email-confirmation` : ``
}

const RESET_PIN = {
  component: `resetPin`,
  url: (DEBUG_URL) ? `/reset-pin?token` : ``
}

const SEND_ANOTHER_EMAIL = {
  component: `sendAnotherEmail`,
  url: (DEBUG_URL) ? `/send-another-email` : ``
}

const RESET_PIN_CONFIRMATION = {
  component: `resetPinConfirmation`,
  url: (DEBUG_URL) ? `/reset-pin-confirmation` : ``
}

const DISPATCH_AFTER_VERIFICATION = {
  component: `dispatchAfterVerification`,
  url: (DEBUG_URL) ? `/dispatch-after-verification` : ``
}

export default {
  WELCOME,
  AUP,
  AUTH,
  ANON,
  SELF,
  OTHER,

  AUTH_PATIENT,           // In authorized submission, both tracks
  AUTH_SELF_PATIENT,      // In authorization submission, patient information for self
  AUTH_OTHER_PATIENT,     // In authorization submission, patient information for a dependent
  ANON_SELF_PATIENT,      // In anonymous submission for self
  ANON_OTHER_PATIENT,     // In anonymous submission for other

  ADDRESS,                // In anonymous submission for self and other

  AUTH_IMMUNIZATIONS,
  ANON_IMMUNIZATIONS,

  DOCUMENTS,

  SUBMITTER,              // In anonymous, and authorized submission for other

  AUTH_SELF_REVIEW,       // Cannot change demographics, no edit button
  AUTH_OTHER_REVIEW,      // Cannot change demographics, no edit button
  ANON_SELF_REVIEW,       // Can change demographics, display edit button
  ANON_OTHER_REVIEW,      // Can change demographics, display edit button

  AUTH_CONFIRMATION,
  ANON_CONFIRMATION,

  SUBMISSION,
  ANON_OTHER_SUBMISSION,
  ANON_SELF_SUBMISSION,
  AUTH_OTHER_SUBMISSION,
  AUTH_SELF_SUBMISSION,

  VERIFICATION,           // First input, user enters (OIID)
  NEW_PIN,                  // One-time pin set, user enters (HCN)
  SET_PIN,                  // Set one-time pin, user enters (email, PIN)
  SET_PIN_CONFIRMATION,     // Confirmation PIN was set, call to action
  ENTER_PIN,              // PIN is already set, user enters (PIN)
  FORGOT_PIN,               // Reset forgotten PIN, user enters (email)
  EMAIL_CONFIRMATION,       // Confirmation e-mail was triggered
  RESET_PIN,                  // Destination from e-mail link, user enters (OIID, role, PIN)
  RESET_PIN_CONFIRMATION,     // Confirmation PIN was successfully reset, call to action
  SEND_ANOTHER_EMAIL,
  DISPATCH_AFTER_VERIFICATION
}
