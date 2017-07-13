import DhirErrorHandler  from '../../../src/services/DhirErrorHandler.service'
import {expect}          from 'chai'
import DHIR_ERROR        from '../../../src/DHIR_ERROR.js'
import ICON_NOTIFICATION from '../../../src/ICON_NOTIFICATION.js'
/* NOTE: Manual dependency injection for a testable service.
         "$" prefix is to indicate a pre-injection state. */
import $Notify           from '../../../src/services/Notify.service.js'

const Notify = $Notify.service(ICON_NOTIFICATION)

describe('DhirErrorHandler', () => {
  let dhirErrorHandler = null

  beforeEach(() => {
    dhirErrorHandler = DhirErrorHandler.service(Notify, DHIR_ERROR, ICON_NOTIFICATION)
  })

  describe('.matchRetrievalErrorNotification(...)', () => {
    it('should return an empty string flag when an INVALID reponse is provided', () => {
      const resultWithoutResponse = dhirErrorHandler
            .matchRetrievalErrorNotification()

      expect(resultWithoutResponse).to.equal(`NO_MATCHING_DHIR_ERROR_FOUND`)
    })

    it('should return an empty string flag when an INVALID reponse is provided', () => {
      const invalidDhirMockResponse = 'rubbish'
      const resultWithoutPossibleMatch = dhirErrorHandler
            .matchRetrievalErrorNotification(invalidDhirMockResponse)

      expect(resultWithoutPossibleMatch).to.equal(`NO_MATCHING_DHIR_ERROR_FOUND`)
    })

    it('should return an empty string flag when an UNRECOGNIZED reponse is provided', () => {
      const unmatchableDhirMockResponse = { status: 999, data: { total: 'rubbish'} }
      const resultWithoutPossibleMatch = dhirErrorHandler
            .matchRetrievalErrorNotification(unmatchableDhirMockResponse)

      expect(resultWithoutPossibleMatch).to.equal(`NO_MATCHING_DHIR_ERROR_FOUND`)
    })

    it('should return the matching notification for a KNOWN response issue and code', () => {
      const consentBlockDhirMockResponse = {
              status: 200,
              data: { entry: [ { resource: { issue: [ { code: `suppressed` } ] } } ] }
            }

      const resultWithConsentBlockMatch = dhirErrorHandler
            .matchRetrievalErrorNotification(consentBlockDhirMockResponse)

      expect(resultWithConsentBlockMatch)
            .to.equal(DHIR_ERROR.RETRIEVAL.CONSENT_BLOCK_SEARCH.notification)
    })

    it('should return the matching notification for a KNOWN response issue and WILDCARD code', () => {
      const consentBlockDhirMockResponse = {
              status: 429,
              data: { entry: [ { resource: { issue: [ { code: `wildard-should-match-everything` } ] } } ] }
            }

      const resultWithConsentBlockMatch = dhirErrorHandler
            .matchRetrievalErrorNotification(consentBlockDhirMockResponse)

      expect(resultWithConsentBlockMatch)
            .to.equal(DHIR_ERROR.RETRIEVAL.RATE_LIMIT.notification)
    })
  })

  describe('.matchSubmissionErrorNotification(...)', () => {
    it('is uses the same underlying function as .matchRetrievalErrorNotification(...)', () => {})
  })
})
