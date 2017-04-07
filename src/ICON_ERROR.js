module.exports = {
  RETRIEVAL: {
    FHIR_INVALID:           `FHIR Message is invalid.`,
    OUTCOME_BAD_OIID:       `Ontario Immunization ID (OIID) is missing or incorrect.`,
    OUTCOME_BAD_PIN:        `PIN is missing or incorrect.`,
    OUTCOME_CONSENT_BLOCK:  `Resource matching search parameters not found.`,
    OUTCOME_OTHER:          `An unknown outcome occurred.`,
    OUTCOME_UNKOWN:         `Response was not a valid resource type.`,
  },
  SUBMISSION: { /* TODO: */ },
  NOTIFICATION: { DOES_NOT_EXIST: `Notification type does not exist.` },
};
