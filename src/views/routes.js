const WELCOME = {
  url:         '/welcome',
  component:   'welcome'
};

const AUP = {
  url: '/aup?action',
  component: 'aup',
  params :{
    action: null
  }
};

const AUTH = {
  url:        '/auth',
  component:  'auth'
};

const ANON = {
  url:        '/anon',
  component:  'anon'
};

const SELF = {
  url:        '/self',
  abstract:   true,
  component:  'self'
};

const OTHER = {
  url:        '/other',
  abstract:   true,
  component:  'other'
};

const SUBMISSION = {
  url:        '/submission?action',
  component:  'submission'
};

const progress = require('./progressStates.js');

const ANON_SELF_SUBMISSION = {
  url:        '/submission',
  component:  'anonSelfSubmission',
  data: {
    navStates: [
      //------------------------PREVIOUS STATE----------------NEXT STATE------------------CURRENT STATE-------------
      Object.assign({ previous: null,                   next: progress.ADDRESS        },  progress.PATIENT        ),
      Object.assign({ previous: progress.PATIENT,       next: progress.IMMUNIZATIONS  },  progress.ADDRESS        ),
      Object.assign({ previous: progress.ADDRESS,       next: progress.DOCUMENTS      },  progress.IMMUNIZATIONS  ),
      Object.assign({ previous: progress.IMMUNIZATIONS, next: progress.REVIEW         },  progress.DOCUMENTS      ),
      Object.assign({ previous: progress.DOCUMENTS,     next: progress.CONFIRMATION   },  progress.REVIEW         ),
      Object.assign({ previous: progress.REVIEW,        next: null                    },  progress.CONFIRMATION   ),
    ],
    baseState: 'anon.self.submission',
  }
};

const ANON_OTHER_SUBMISSION = {
  url:        '/submission',
  component:  'anonOtherSubmission',
  data: {
    navStates: [
      //------------------------PREVIOUS STATE----------------NEXT STATE------------------CURRENT STATE-------------
      Object.assign({ previous: null,                   next: progress.ADDRESS        },  progress.PATIENT        ),
      Object.assign({ previous: progress.PATIENT,       next: progress.IMMUNIZATIONS  },  progress.ADDRESS        ),
      Object.assign({ previous: progress.ADDRESS,       next: progress.DOCUMENTS      },  progress.IMMUNIZATIONS  ),
      Object.assign({ previous: progress.IMMUNIZATIONS, next: progress.SUBMITTER      },  progress.DOCUMENTS      ),
      Object.assign({ previous: progress.DOCUMENTS,     next: progress.REVIEW         },  progress.SUBMITTER      ),
      Object.assign({ previous: progress.SUBMITTER,     next: progress.CONFIRMATION   },  progress.REVIEW         ),
      Object.assign({ previous: progress.REVIEW,        next: null                    },  progress.CONFIRMATION   ),
    ],
    baseState: 'anon.other.submission',
  }
};

const AUTH_SELF_SUBMISSION = {
  url:        '/submission',
  component:  'authSelfSubmission',
  data: {
    navStates: [
      //------------------------PREVIOUS STATE----------------NEXT STATE------------------CURRENT STATE-------------
      Object.assign({ previous: null,                   next: progress.DOCUMENTS      },  progress.IMMUNIZATIONS  ),
      Object.assign({ previous: progress.IMMUNIZATIONS, next: progress.PATIENT        },  progress.DOCUMENTS      ),
      Object.assign({ previous: progress.DOCUMENTS,     next: progress.REVIEW         },  progress.PATIENT      ),
      Object.assign({ previous: progress.PATIENT,       next: progress.CONFIRMATION   },  progress.REVIEW         ),
      Object.assign({ previous: progress.REVIEW,        next: null                    },  progress.CONFIRMATION   ),
    ],
    baseState: 'auth.self.submission'
  }
};

const AUTH_OTHER_SUBMISSION = {
  url:        '/submission',
  component:  'authOtherSubmission',
  data: {
    navStates: [
      //------------------------PREVIOUS STATE----------------NEXT STATE------------------CURRENT STATE-------------
      Object.assign({ previous: null,                   next: progress.DOCUMENTS      },  progress.IMMUNIZATIONS  ),
      Object.assign({ previous: progress.IMMUNIZATIONS, next: progress.PATIENT        },  progress.DOCUMENTS      ),
      Object.assign({ previous: progress.DOCUMENTS,     next: progress.SUBMITTER      },  progress.PATIENT      ),
      Object.assign({ previous: progress.PATIENT,       next: progress.REVIEW         },  progress.SUBMITTER      ),
      Object.assign({ previous: progress.SUBMITTER,     next: progress.CONFIRMATION   },  progress.REVIEW         ),
      Object.assign({ previous: progress.REVIEW,        next: null                    },  progress.CONFIRMATION   ),
    ],
    baseState: 'auth.other.submission'
  }
};

const AUTH_PATIENT = {
    url:        '/patient',
    component:  'authPatient'
};

const AUTH_SELF_PATIENT = {
  url:        '/patient',
  component:  'authSelfPatient'
};

const AUTH_OTHER_PATIENT = {
  url:        '/patient',
  component:  'authOtherPatient'
};

const ANON_SELF_PATIENT = {
    url:        '/patient',
    component:  'anonSelfPatient'
};

const ANON_OTHER_PATIENT = {
    url:        '/patient',
    component:  'anonOtherPatient'
};

const ADDRESS = {
    url:        '/address',
    component:  'patientAddress'
};

const ANON_IMMUNIZATIONS = {
    url:        '/immunizations',
    component:  'anonImmunizations'
};

const AUTH_IMMUNIZATIONS = {
    url:        '/immunizations',
    component:  'authImmunizations'
};

const DOCUMENTS = {
    url:        '/documents',
    component:  'documents'
};

const SUBMITTER = {
    url:        '/submitter',
    component:  'submitter'
};

const ANON_SELF_REVIEW = {
    url:        '/review',
    component:  'anonSelfReview'
};

const ANON_OTHER_REVIEW = {
    url:        '/review',
    component:  'anonOtherReview'
};

const AUTH_SELF_REVIEW = {
    url:        '/review',
    component:  'authSelfReview'
};

const AUTH_OTHER_REVIEW = {
    url:        '/review',
    component:  'authOtherReview'
};

const ANON_CONFIRMATION = {
  url:        '/confirmation',
  component:  'anonConfirmation'
};

const AUTH_CONFIRMATION = {
    url:        '/confirmation',
    component:  'authConfirmation'
};

const VERIFICATION = {
  url:        '/verification?action&relationship&lang',
  component:  'verification'
};

const NEW_PIN = {
  url:        '/new-pin',
  component:  'newPin'
};

const SET_PIN = {
  url:        '/set-pin',
  component:  'setPin'
};

const SET_PIN_CONFIRMATION = {
  url:        '/set-pin-confirmation',
  component:  'setPinConfirmation'
};

const ENTER_PIN = {
  url:        '/enter-pin',
  component:  'enterPin'
};

const FORGOT_PIN = {
  url:        '/forgot-pin',
  component:  'forgotPin'
};

const EMAIL_CONFIRMATION = {
  url:        '/email-confirmation',
  component:  'emailConfirmation'
};

const RESET_PIN = {
  url:        '/reset-pin/{token:[%0-9a-zA-Z]{1,}}',
  component:  'resetPin'
};

const SEND_ANOTHER_EMAIL = {
  url:        '/send-another-email',
  component:  'sendAnotherEmail'
};

const RESET_PIN_CONFIRMATION = {
  url:        '/reset-pin-confirmation',
  component:  'resetPinConfirmation'
};

const DISPATCH_AFTER_VERIFICATION = {
  url:        '/dispatch-after-verification',
  component:  'dispatchAfterVerification'
};

module.exports = {
  WELCOME:                WELCOME,
  AUP:                    AUP,
  AUTH:                   AUTH,
  ANON:                   ANON,
  SELF:                   SELF,
  OTHER:                  OTHER,

  AUTH_PATIENT:           AUTH_PATIENT,           // In authorized submission, both tracks
  AUTH_SELF_PATIENT:      AUTH_SELF_PATIENT,      // In authorization submission, patient information for self
  AUTH_OTHER_PATIENT:     AUTH_OTHER_PATIENT,     // In authorization submission, patient information for a dependent
  ANON_SELF_PATIENT:      ANON_SELF_PATIENT,      // In anonymous submission for self
  ANON_OTHER_PATIENT:     ANON_OTHER_PATIENT,     // In anonymous submission for other

  ADDRESS:                ADDRESS,                // In anonymous submission for self and other

  AUTH_IMMUNIZATIONS:     AUTH_IMMUNIZATIONS,
  ANON_IMMUNIZATIONS:     ANON_IMMUNIZATIONS,

  DOCUMENTS:              DOCUMENTS,

  SUBMITTER:              SUBMITTER,              // In anonymous, and authorized submission for other

  AUTH_SELF_REVIEW:       AUTH_SELF_REVIEW,       // Cannot change demographics, no edit button
  AUTH_OTHER_REVIEW:      AUTH_OTHER_REVIEW,      // Cannot change demographics, no edit button
  ANON_SELF_REVIEW:       ANON_SELF_REVIEW,       // Can change demographics, display edit button
  ANON_OTHER_REVIEW:      ANON_OTHER_REVIEW,      // Can change demographics, display edit button

  AUTH_CONFIRMATION:      AUTH_CONFIRMATION,
  ANON_CONFIRMATION:      ANON_CONFIRMATION,

  SUBMISSION:             SUBMISSION,
  ANON_OTHER_SUBMISSION:  ANON_OTHER_SUBMISSION,
  ANON_SELF_SUBMISSION:   ANON_SELF_SUBMISSION,
  AUTH_OTHER_SUBMISSION:  AUTH_OTHER_SUBMISSION,
  AUTH_SELF_SUBMISSION:   AUTH_SELF_SUBMISSION,

  VERIFICATION:                 VERIFICATION,           // First input, user enters (OIID)
  NEW_PIN:                      NEW_PIN,                  // One-time pin set, user enters (HCN)
  SET_PIN:                      SET_PIN,                  // Set one-time pin, user enters (email, PIN)
  SET_PIN_CONFIRMATION:         SET_PIN_CONFIRMATION,     // Confirmation PIN was set, call to action
  ENTER_PIN:                    ENTER_PIN,              // PIN is already set, user enters (PIN)
  FORGOT_PIN:                   FORGOT_PIN,               // Reset forgotten PIN, user enters (email)
  EMAIL_CONFIRMATION:           EMAIL_CONFIRMATION,       // Confirmation e-mail was triggered
  RESET_PIN:                    RESET_PIN,                  // Destination from e-mail link, user enters (OIID, role, PIN)
  RESET_PIN_CONFIRMATION:       RESET_PIN_CONFIRMATION,     // Confirmation PIN was successfully reset, call to action
  SEND_ANOTHER_EMAIL:           SEND_ANOTHER_EMAIL,
  DISPATCH_AFTER_VERIFICATION:  DISPATCH_AFTER_VERIFICATION,
};
