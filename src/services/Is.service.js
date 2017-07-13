/* @ngInject */
function Is (Immunization) {
/* Private ********************************************************************/
  function complement (predicate) { return (thing) => !predicate(thing) }

  function getIssues (response) {
    const hasIssue = (
             !!response &&
          !!response.data &&
          !!response.data.issue &&
          !!response.data.issue.length
        )

    return (hasIssue)
              ? response.data.issue
              : []
  }

  function getEntryResourceIssues (response) {
    const hasEntryResourceIssue = (
         !!response &&
      !!response.data &&
      !!response.data.entry &&
      !!response.data.entry.length &&
      !!response.data.entry[0].resource &&
      !!response.data.entry[0].resource.issue &&
      !!response.data.entry[0].resource.issue.length
    )

    return (hasEntryResourceIssue)
              ? response.data.entry[0].resource.issue
              : []
  }

/* Public *********************************************************************/

  /* Immunization predicates */

  function isImmunizationCommonPrevalence (immunization) {
    const COMMON_WHITELIST = [ 1, 4 ]
    return COMMON_WHITELIST.indexOf(immunization.getPrevalence()) >= 0
  }

  function isImmunizationInternationalPrevalence (immunization) {
    const INTERNATIONAL_WHITELIST = [ 1, 2, 3, 4, 5, 6, 9 ]
    return INTERNATIONAL_WHITELIST.indexOf(immunization.getPrevalence()) >= 0
  }

  function isImmunizationCanadaPrevalence (immunization) {
    const CANADA_WHITELIST = [ 1, 2, 3, 4, 5, 6, 9 ]
    return CANADA_WHITELIST.indexOf(immunization.getPrevalence()) >= 0
  }

  function isImmunizationOntarioPrevalence (immunization) {
    const ONTARIO_WHITELIST = [ 1, 2, 3 ]
    return ONTARIO_WHITELIST.indexOf(immunization.getPrevalence()) >= 0
  }

  function isImmunizationGenericVaccine (immunization) {
    // If there isn't a trade snomed, then it is an agent without a trade.
    return immunization.getType() === Immunization.type.GENERIC
  }

  function isImmunizationBrandedVaccine (immunization) {
    // If there isn't a trade snomed, then it is an agent without a trade.
    return immunization.getType() === Immunization.type.BRANDED
  }

  /* DHIR response predicates */
  const isStatus = (status) => (response) => (
       !!response &&
    !!response.status &&
    (response.status === status)
  )

  /* FHIR response issue predicates */
  const isIssueCode = (code) => (issue) => (
       !!issue.code &&
    (issue.code === code)
  )

  const isIssueSeverity = (severity) => (issue) => (
       !!issue.severity &&
    (issue.severity === severity)
  )

  const isIssueDetailsText = (text) => (issue) => (
       !!issue.details &&
    !!issue.details.text &&
    (issue.details.text.indexOf(text) > -1)
  )

  const isIssueDetailsId = (id) => (issue) => (
       !!issue.details &&
    !!issue.details.id &&
    (issue.details.id === id)
  )

  /* DHIR response matcher */
  const isResponseMatch = (profile) => (response) => {
    const {status = 42, issueConditions = {}, entryResourceIssueConditions = {}} = profile

    const isStatusMatch = isStatus(status)(response)

    if (!issueConditions.all) issueConditions.all = []
    if (!issueConditions.none) issueConditions.none = []
    // Check that ALL of the ".all" conditions, and NONE of the ".none" conditions match.
    const isIssueMatch = (
         issueConditions.all.every(c => getIssues(response).some(i => c(i))) &&
      !issueConditions.none.some(c => getIssues(response).some(i => c(i)))
    )

    if (!entryResourceIssueConditions.all) entryResourceIssueConditions.all = []
    if (!entryResourceIssueConditions.none) entryResourceIssueConditions.none = []
    // Check that ALL of the ".all" conditions, and NONE of the ".none" conditions match.
    const isEntryResourceIssueMatch = (
         entryResourceIssueConditions.all
            .every(c => getEntryResourceIssues(response).some(i => c(i))) &&
      !entryResourceIssueConditions.none
            .some(c => getEntryResourceIssues(response).some(i => c(i)))
    )

    return (
         isStatusMatch &&
      isIssueMatch &&
      isEntryResourceIssueMatch
    )
  }

/* Interface ******************************************************************/
  return {
    immunization: {
      genericVaccine: isImmunizationGenericVaccine,
      brandedVaccine: isImmunizationBrandedVaccine,
      commonPrevalence: isImmunizationCommonPrevalence,
      internationalPrevalence: isImmunizationInternationalPrevalence,
      canadaPrevalence: isImmunizationCanadaPrevalence,
      ontarioPrevalence: isImmunizationOntarioPrevalence,
      not: {
        genericVaccine: complement(isImmunizationGenericVaccine),
        brandedVaccine: complement(isImmunizationBrandedVaccine),
        commonPrevalence: complement(isImmunizationCommonPrevalence),
        internationalPrevalence: complement(isImmunizationInternationalPrevalence),
        canadaPrevalence: complement(isImmunizationCanadaPrevalence),
        ontarioPrevalence: complement(isImmunizationOntarioPrevalence)
      }
    },
    Fhir: {
      issue: {
        code: isIssueCode,
        details: {
          text: isIssueDetailsText,
          id: isIssueDetailsId
        },
        severity: isIssueSeverity
      }
    },
    Dhir: {
      response: { match: isResponseMatch }
    }
  }
}

export default {
  name: 'Is',
  service: Is
}
