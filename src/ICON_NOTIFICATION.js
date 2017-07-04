/** Enumerator used to identify end user notification types. */
const ICON_NOTIFICATION = {
  // NOTE: Progress modals are NOT dismissable, therefore push (opening),
  //       and pop (closing) must be done programatically.
  PUSH_SUBMISSION_PROGRESS:         '$pushProgressSubmission',
  PUSH_RETRIEVAL_PROGRESS:          '$pushProgressRetrieval',
  PUSH_YELLOW_CARD_PDF_PROGRESS:    '$pushProgressYellowCardPdf',
  PUSH_CONFIRMATION_PDF_PROGRESS:   '$pushProgressConfirmationPdf',

  POP_SUBMISSION_PROGRESS:          '$popProgressSubmission',
  POP_RETRIEVAL_PROGRESS:           '$popProgressRetrieval',
  POP_YELLOW_CARD_PDF_PROGRESS:     '$popProgressYellowCardPdf',
  POP_CONFIRMATION_PDF_PROGRESS:    '$popProgressConfirmationPdf',

  // NOTE: Modals are dismissable by the user taking an action,
  //       or programatically.
  PUSH_TRANSACTION_TOKEN_TIMEOUT:   '$pushTransactionTokenTimeout',
  POP_TRANSACTION_TOKEN_TIMEOUT:    '$popTransactionTokenTimeout',

  // NOTE: Informational and error notifications are user dismissable.
  INVALID_DATE_ERROR:               '$invalidDateError',
  INFO_PATIENT_DATA_CLEARED:        '$infoPatientDataCleared',
  INFO_SESSION_EXPIRED:             '$infoSessionExpired',
  INFO_OIID_HINT:                   '$infoOiidHint',

  WARN_DOCUMENT_FILE_BAD_TYPE:      '$warnDocumentFileBadType',
  WARN_DOCUMENT_FILE_TOO_LARGE:     '$warnDocumentFileTooLarge',
  WARN_DOCUMENT_FILE_DUPLICATE:     '$warnDocumentFileDuplicate',
  WARN_DOCUMENT_FILE_QUEUE_LIMIT:   '$warnDocumentFileQueueLimit',

  WARN_RETRIEVAL_CONSENT_BLOCK:     '$warnRetrievalConsentBlock',
  WARN_RETRIEVAL_BAD_OIID:          '$warnRetrievalBadOiid',
  // WARN_RETRIEVAL_BAD_PIN:           '$warnRetrievalBadPin',   /* Redundant, WARN_RETRIEVAL_BAD_OIID covers both cases. */
  WARN_RETRIEVAL_NETWORK_PROBLEM:   '$warnRetrievalNetworkProblem',
  WARN_RETRIEVAL_SECURITY_LOCK_OUT: '$warnRetrievalSecurityLockOut',
  WARN_RETRIEVAL_TOO_MANY_FAILED_ATTEMPTS: '$warnRetrievalTooManyFailedAttempts',
  WARN_RETRIEVAL_UNKNOWN:           '$warnRetrievalUnknown',

  WARN_SUBMISSION_INVALID_FHIR:     '$warnSubmissionInvalidFhir',
  WARN_SUBMISSION_NETWORK_PROBLEM:  '$warnSubmissionNetworkProblem',
  WARN_SUBMISSION_UNKNOWN:          '$warnSubmissionUnkown',

  WARN_GENERAL_NETWORK_PROBLEM:     '$warnGeneralNetworkProblem',
};

module.exports = ICON_NOTIFICATION;
