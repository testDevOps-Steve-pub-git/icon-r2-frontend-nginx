/** Contains the profiles of DHIR error responses. */
const ICON_NOTIFICATION = require('./ICON_NOTIFICATION.js');

const ResponseProfile = (status, issue, notification) => ({ status, issue, notification });

const DHIR_ERROR = {
  RETRIEVAL: {
    CONSENT_BLOCK_SEARCH:       ResponseProfile(200,   `suppressed`, ICON_NOTIFICATION.WARN_RETRIEVAL_CONSENT_BLOCK),
    CONSENT_BLOCK_BY_ID:        ResponseProfile(403,   `suppressed`, ICON_NOTIFICATION.WARN_RETRIEVAL_CONSENT_BLOCK),
    INVALID_PATIENT_IDENTIFIER: ResponseProfile(400,   `value`,      ICON_NOTIFICATION.WARN_RETRIEVAL_NETWORK_PROBLEM),
    REQUEST_INVALID:            ResponseProfile(400,   `invalid`,    ICON_NOTIFICATION.WARN_RETRIEVAL_NETWORK_PROBLEM),
    REQUEST_MALFORMED:          ResponseProfile(400,   `required`,   ICON_NOTIFICATION.WARN_RETRIEVAL_NETWORK_PROBLEM),
    NOT_FOUND:                  ResponseProfile(404,   `not-found`,  ICON_NOTIFICATION.WARN_RETRIEVAL_NETWORK_PROBLEM),
    FAILED_AUTHENTICATION:      ResponseProfile(401,   `security`,   ICON_NOTIFICATION.WARN_RETRIEVAL_SECURITY_LOCK_OUT),
    NO_MATCHES:                 ResponseProfile(200,   `not-found`,  ICON_NOTIFICATION.WARN_RETRIEVAL_BAD_OIID),
    RATE_LIMIT:                 ResponseProfile(429,   `*`,          ICON_NOTIFICATION.WARN_RETRIEVAL_TOO_MANY_FAILED_ATTEMPTS),
    SERVER_INTERNAL_ERROR:      ResponseProfile(500,   `*`,          ICON_NOTIFICATION.WARN_RETRIEVAL_UNKNOWN),
  },
  SUBMISSION: {
    INVALID_RESOURCE:           ResponseProfile(400,   `invalid`,    ICON_NOTIFICATION.WARN_SUBMISSION_INVALID_FHIR),
    INVALID_CODE:               ResponseProfile(422,   `code`,       ICON_NOTIFICATION.WARN_SUBMISSION_INVALID_FHIR),
    REFERENCE_NOT_FOUND:        ResponseProfile(422,   `not-found`,  ICON_NOTIFICATION.WARN_SUBMISSION_INVALID_FHIR),
    MISSING_REQUIRED_ELEMENT:   ResponseProfile(422,   `required`,   ICON_NOTIFICATION.WARN_SUBMISSION_INVALID_FHIR),
    INVALID_VALUE:              ResponseProfile(422,   `value`,      ICON_NOTIFICATION.WARN_SUBMISSION_NETWORK_PROBLEM),
    RATE_LIMIT:                 ResponseProfile(429,   `*`,          ICON_NOTIFICATION.WARN_SUBMISSION_NETWORK_PROBLEM),
    SERVER_INTERNAL_ERROR:      ResponseProfile(500,   `*`,          ICON_NOTIFICATION.WARN_SUBMISSION_UNKNOWN),
  },
};

module.exports = DHIR_ERROR;
