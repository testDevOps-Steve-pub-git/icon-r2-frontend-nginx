/*
 * A collection of DHIR response profiles with a matcher function, and an ID.
 * DHIR response profile matchers check the attributes in DHIR responses which
 * indicate conditions that the ICON front-end application should respond to.
 * For technical details on DHIR responses, please refer to:
 *    - "Panorama ICON Public FHIR Implementation Guide" (v2.0.2), and
 *    - "DHIR Administration API - Logical Application Design Document" (v1.1)
 */
/* @ngInject */
function DHIR (Is) {
/* Universal DHIR response profiles (private) *********************************/

  /* These responses are general, reused across almost all of the APIs. */
  const UNIVERSAL_DHIR_RESPONSES = {
    LOCKED_OUT: {
      isMatch: Is.Dhir.response.match({ status: 401 })
    },
    RESOURCE_NOT_FOUND: {
      isMatch: Is.Dhir.response.match({ status: 404 })
    },
    MALFORMED_REQUEST: {
      isMatch: Is.Dhir.response.match({ status: 422 })
    },
    RATE_LIMIT: {
      isMatch: Is.Dhir.response.match({ status: 429 })
    },
    SERVER_INTERNAL_ERROR: {
      isMatch: Is.Dhir.response.match({ status: 500 })
    },
    /* NOTE: Below are responses NOT uniquely handled, for debugging only. */
    MALFORMED_MISSING_REQUIRED_DATA: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [
            Is.Fhir.issue.code('required'),
            Is.Fhir.issue.severity('error')
          ]
        }
      })
    },
    MALFORMED_INVALID_VALUE: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [
            Is.Fhir.issue.code('value'),
            Is.Fhir.issue.severity('error')
          ]
        }
      })
    }
  }

  /* NOTE:  In some cases a consent block is part of a FHIR "Operation Outcome",
            in other cases it is an entry in the FHIR resource "Bundle". */
  const CONSENT_BLOCK_RESPONSES = {
    CONSENT_BLOCK_INOFORMATIONAL: {
      isMatch: Is.Dhir.response.match({
        status: 200,
        issueConditions: {
          all: [
            Is.Fhir.issue.code('suppressed'),
            Is.Fhir.issue.severity('information')
          ]
        }
      })
    },
    CONSENT_BLOCK_INFORMATIONAL_IN_BUNDLE: {
      isMatch: Is.Dhir.response.match({
        status: 200,
        entryResourceIssueConditions: {
          all: [
            Is.Fhir.issue.code('suppressed'),
            Is.Fhir.issue.severity('information')
          ]
        }
      })
    },
    CONSENT_BLOCK_ERROR: {
      isMatch: Is.Dhir.response.match({
        status: 403,
        issueConditions: {
          all: [
            Is.Fhir.issue.code('suppressed'),
            Is.Fhir.issue.severity('error')
          ]
        }
      })
    },
    CONSENT_BLOCK_ERROR_IN_BUNDLE: { /* Might not ever occur, spec ambiguous. */
      isMatch: Is.Dhir.response.match({
        status: 403,
        entryResourceIssueConditions: {
          all: [
            Is.Fhir.issue.code('suppressed'),
            Is.Fhir.issue.severity('error')
          ]
        }
      })
    }
  }

/* PIN set API response profiles (private) ************************************/

  /* Section 3.1.1 of "DHIR Administration API" */
  const ClientStatus = {
    ...UNIVERSAL_DHIR_RESPONSES,
    OIID_PIN_NOT_SET: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [ Is.Fhir.issue.details.id('DHIR_ADM_007') ],
          none: [ Is.Fhir.issue.details.id('DHIR_ADM_071') ]
          /* ^^^ Avoids collisions with "OIID_PIN_NOT_SET_NO_HCN" below */
        }
      })
    },
    OIID_PIN_OUTDATED: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [ Is.Fhir.issue.details.id('DHIR_ADM_005') ],
          none: [ Is.Fhir.issue.details.id('DHIR_ADM_071') ]
        }
      })
    },
    OIID_PIN_NOT_SET_NO_HCN: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [
            Is.Fhir.issue.details.id('DHIR_ADM_007'),
            Is.Fhir.issue.details.id('DHIR_ADM_071')
          ]
        }
      })
    },
    OIID_PIN_OUTDATED_NO_HCN: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [
            Is.Fhir.issue.details.id('DHIR_ADM_005'),
            Is.Fhir.issue.details.id('DHIR_ADM_071')
          ]
        }
      })
    },
    OIID_PIN_REVOKED_AGE: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_006') ] }
      })
    },
    OIID_PIN_REVOKED_PHU: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_008') ] }
      })
    },
    OIID_PIN_SET_NO_EMAIL_AVAILABLE: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [
            Is.Fhir.issue.details.id('DHIR_ADM_081')
          ],
          none: [
            Is.Fhir.issue.details.id('DHIR_ADM_006'),
            Is.Fhir.issue.details.id('DHIR_ADM_008'),
            Is.Fhir.issue.details.id('DHIR_ADM_071')
          ]
        }
      })
    },
    OIID_PIN_SET_NO_HCN_AVAILABLE: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: {
          all: [
            Is.Fhir.issue.details.id('DHIR_ADM_071')
          ],
          none: [
            Is.Fhir.issue.details.id('DHIR_ADM_005'),
            Is.Fhir.issue.details.id('DHIR_ADM_007')
          ]
        }
      })
    }
  }

  /* Section 3.1.2 of "DHIR Administration API" */
  const ValidateHCN = {
    ...UNIVERSAL_DHIR_RESPONSES,
    HCN_AND_OIID_DONT_MATCH: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_033') ] }
      })
    },

    /* NOTE: Below are responses which should have been prevented earlier
             in the workflow, for debugging only. */
    HCN_NOT_AVAILABLE: { /* Redundant, covered by matching DHIR_ADM_071. */
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_031') ] }
      })
    },
    HCN_ALREADY_USED: { /* Redundant, after HTTP 200 in ...Admin/$ClientStatus. */
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_032') ] }
      })
    }
  }

  /* Section 3.1.3 of "DHIR Administration API" */
  const SetPIN = {
    ...UNIVERSAL_DHIR_RESPONSES,
    ...CONSENT_BLOCK_RESPONSES,
    /* NOTE: Below are responses which should have been prevented earlier
             in the workflow, for debugging only. */
    HCN_NOT_AVAILABLE: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_051') ] }
      })
    },
    HCN_ALREADY_USED: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_052') ] }
      })
    },
    HCN_OIID_MISMATCH: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_053') ] }
      })
    }
  }

/* PIN reset API response profiles (private) **********************************/

  /* Section 3.2.1 of "DHIR Administration API" */
  const ResetAccess = {
    ...UNIVERSAL_DHIR_RESPONSES,
    NO_EMAIL_ON_FILE: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_111') ] }
      })
    },
    WRONG_EMAIL_PROVIDED: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_112') ] }
      })
    }
  }

  /* Section 3.2.2 of "DHIR Administration API" */
  const ValidateToken = {
    ...UNIVERSAL_DHIR_RESPONSES,
    TOKEN_INVALID: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_140') ] }
      })
    },
    TOKEN_EXPIRED: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_141') ] }
      })
    }
  }

  /* Section 3.2.3 of "DHIR Administration API" */
  const ResetPIN = {
    ...UNIVERSAL_DHIR_RESPONSES,
    OIID_AND_TOKEN_DONT_MATCH: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_164') ] }
      })
    },
    /* NOTE: Below are responses which should have been prevented earlier
             in the workflow, for debugging only. */
    TOKEN_INVALID_FOR_PIN: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_162') ] }
      })
    },
    TOKEN_EXPIRED_FOR_PIN: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_163') ] }
      })
    },
    /* NOTE: Below are responses NOT uniquely handled, for debugging only. */
    INVALID_RESOURCE: {
      isMatch: Is.Dhir.response.match({
        status: 400,
        issueConditions: { all: [ Is.Fhir.issue.details.id('DHIR_ADM_161') ] }
      })
    }
  }

/* Utilities (jsut to DRY up code and avoid typos, private) *******************/

    /**
     * Factory for enums whose keys and values both match the keys of the parent.
     * @param {object} parent - the object to strip keys from
     * @returns {object} - an enum with matching key value pairs
     */
  const KeysAsEnum = (parent) => Object.keys(parent)
          .reduce((enumParent, key) => {
            if (key) enumParent[key] = key
            return enumParent
          }, {})

    /**
     * Factory to inject IDs matching key names for all child properties of a parent.
     * @param {object} parent - the object to strip keys from
     * @returns {object} - an enum with matching key value pairs
     */
  const KeysAppendedAsIds = (parent) => Object.keys(parent)
          .reduce((idParent, key) => {
            idParent[key].id = key
            return idParent
          }, parent)

/* Public *********************************************************************/

  /**
   * 1. Partially applies an array of candidate errors, and returns a function.
   * 2. Compares a response against all candidate errors to find a match.
   * @param {Array<Object>} candidateErrors - the candidate errors
   * @param {Object} response - HTTP response from a DHIR endpoint
   * @returns {String} - ID of matching candidate error if a match is found,
   *                     otherwise "NO_MATCHING_DHIR_ERROR_FOUND"
   */
  const matchResponseTo = (candidateErrors) => (response) => {
    const MATCHES = Object.keys(candidateErrors)
                          .map(key => candidateErrors[key])
                          .filter(candidate => candidate.isMatch(response))
    const NO_MATCHING_DHIR_ERROR_FOUND = { id: 'NO_MATCHING_DHIR_ERROR_FOUND' }

    if (MATCHES.length > 1) console.warn(`Expecting only 1 matching error, but found ${MATCHES.length}!`)
    const [{ id: MATCH_ID } = NO_MATCHING_DHIR_ERROR_FOUND] = MATCHES

    return MATCH_ID
  }

/* Public interface ***********************************************************/

  return {
    identifyClientStatusError: matchResponseTo(KeysAppendedAsIds(ClientStatus)),
    identifyValidateHCNError: matchResponseTo(KeysAppendedAsIds(ValidateHCN)),
    identifySetPINError: matchResponseTo(KeysAppendedAsIds(SetPIN)),
    identifyResetAccessError: matchResponseTo(KeysAppendedAsIds(ResetAccess)),
    identifyValidateTokenError: matchResponseTo(KeysAppendedAsIds(ValidateToken)),
    identifyResetPINError: matchResponseTo(KeysAppendedAsIds(ResetPIN)),
    error: {
      ClientStatus: KeysAsEnum(ClientStatus),
      ValidateHCN: KeysAsEnum(ValidateHCN),
      SetPIN: KeysAsEnum(SetPIN),
      ResetAccess: KeysAsEnum(ResetAccess),
      ValidateToken: KeysAsEnum(ValidateToken),
      ResetPIN: KeysAsEnum(ResetPIN),
      NO_MATCHING_DHIR_ERROR_FOUND: 'NO_MATCHING_DHIR_ERROR_FOUND'
    }
  }
}

export default {
  name: 'DHIR',
  service: DHIR
}
