var WELCOME = {
  url:         '/welcome',
  component:   'welcome'
};

var AUTH = {
  url:        '/auth',
  component:  'auth'
};

var ANON = {
  url:        '/anon',
  component:  'anon'
};

var SELF = {
  url:        '/self',
  abstract:   true,
  component:  'self'
};

var LOGIN = {
  url:        '/login',
  component:  'authLogin'
};

var OTHER = {
  url:        '/other',
  abstract:   true,
  component:  'other'
};

const progress = require('./progressStates.js');

var ANON_SELF_SUBMISSION = {
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

var ANON_OTHER_SUBMISSION = {
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

var AUTH_SELF_SUBMISSION = {
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

var AUTH_OTHER_SUBMISSION = {
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

var AUTH_PATIENT = {
    url:        '/patient',
    component:  'authPatient'
};

var AUTH_SELF_PATIENT = {
  url:        '/patient',
  component:  'authSelfPatient'
};

var AUTH_OTHER_PATIENT = {
  url:        '/patient',
  component:  'authOtherPatient'
};

var ANON_SELF_PATIENT = {
    url:        '/patient',
    component:  'anonSelfPatient'
};

var ANON_OTHER_PATIENT = {
    url:        '/patient',
    component:  'anonOtherPatient'
};

var ADDRESS = {
    url:        '/address',
    component:  'address'
};

var ANON_IMMUNIZATIONS = {
    url:        '/immunizations',
    component:  'anonImmunizations'
};

var AUTH_IMMUNIZATIONS = {
    url:        '/immunizations',
    component:  'authImmunizations'
};

var DOCUMENTS = {
    url:        '/documents',
    component:  'documents'
};

var SUBMITTER = {
    url:        '/submitter',
    component:  'submitter'
};

var ANON_SELF_REVIEW = {
    url:        '/review',
    component:  'anonSelfReview'
};

var ANON_OTHER_REVIEW = {
    url:        '/review',
    component:  'anonOtherReview'
};

var AUTH_SELF_REVIEW = {
    url:        '/review',
    component:  'authSelfReview'
};

var AUTH_OTHER_REVIEW = {
    url:        '/review',
    component:  'authOtherReview'
};

var ANON_CONFIRMATION = {
  url:        '/confirmation',
  component:  'anonConfirmation'
};

var AUTH_CONFIRMATION = {
    url:        '/confirmation',
    component:  'authConfirmation'
};


module.exports = {
  WELCOME:                WELCOME,
  AUTH:                   AUTH,
  ANON:                   ANON,
  LOGIN:                  LOGIN,
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

  ANON_OTHER_SUBMISSION:  ANON_OTHER_SUBMISSION,
  ANON_SELF_SUBMISSION:   ANON_SELF_SUBMISSION,
  AUTH_OTHER_SUBMISSION:  AUTH_OTHER_SUBMISSION,
  AUTH_SELF_SUBMISSION:   AUTH_SELF_SUBMISSION
};
