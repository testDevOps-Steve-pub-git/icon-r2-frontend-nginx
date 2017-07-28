/* @ngInject */
function AnalyticsLogger (Endpoint, TokenHandler) {
/* Private ********************************************************************/
  const eventAction = {
    CHI_SURVEY: { chiSurvey: true },
    CONTACT_PHU: { contactPhu: true },
    SET_LANGUAGE_EN: { setLanguage: 'en' },
    SET_LANGUAGE_FR: { setLanguage: 'fr' }
  }

  let previousPageTrack = { detail: '', timestamp: 0 }

  /** Calculates the duration spent on a page (route). @returns {boolean} */
  function calculatePageDuration (currentPageTrack, previousPageTrack) {
    return (previousPageTrack.timestamp)
              ? currentPageTrack.timestamp - previousPageTrack.timestamp
              : 0
  }

  /** Calculates the duration of a submission transaction. @returns {number} */
  function calculateTransactionDuration (token) {
    if (token && token.decoded && token.decoded.originalIat) {
      return (Date.now() - token.decoded.originalIat * 1000)
    }

    if (token && token.decoded && token.decoded.iat) {
      return (Date.now() - token.decoded.iat * 1000)
    }

    return Date.now()
  }

/* Public *********************************************************************/
  /**
   * Handles user click event tracking by sending POST to analytics endpoint.
   * @param {CustomEvent} - the analytics event dispatched by $analytics module
   */
  function handleEventTrack ({ detail }) {
    if (eventAction[detail]) Endpoint.postAnalyticsLog(eventAction[detail]).catch(angular.noop)
    else console.error(`Event Action "${detail}" is not a valid option for logging!`)
  }

  /**
   * Handles page/route transition event tracking by realying for POST to analytics endpoint.
   * @param {CustomEvent} - the analytics event dispatched by $analytics module
   */
  function handlePageTrack ({ detail }) {
    let currentPageTrack = { detail: detail, timestamp: Date.now() }
    let duration = calculatePageDuration(currentPageTrack, previousPageTrack)

    // When the route logged is confiramtion, log transaction duration.
    let isEndSubmissionPage = (detail.indexOf('confirmation') > -1)
    if (isEndSubmissionPage) {
      let transactionToken = TokenHandler.inspectTransactionToken()

      Endpoint.postAnalyticsLog({
        transitionPage: `${detail}-transaction-duration-sum`,
        duration: calculateTransactionDuration(transactionToken)
      })
      .catch(angular.noop)
    }

    // Log the current route transition with zero duration.
    Endpoint.postAnalyticsLog({
      transitionPage: detail,
      duration: 0
    })
    // Log the previous route transition with calculated duration.
    .then(() => {
      if (previousPageTrack.detail && duration) {
        Endpoint.postAnalyticsLog({
          transitionPage: previousPageTrack.detail,
          duration: duration
        })
      }
    })
    // Swap in the current as previous for the next time this function is called.
    .then(() => { previousPageTrack = currentPageTrack })
    .catch(angular.noop)
  }

/* Interface ******************************************************************/

  return {
    handleEventTrack: handleEventTrack,
    handlePageTrack: handlePageTrack
  }
}

export default {
  name: 'AnalyticsLogger',
  service: AnalyticsLogger
}
