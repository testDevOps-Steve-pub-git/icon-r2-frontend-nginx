(function () {
'use strict';
  module.exports = AnalyticsLogger;

  function AnalyticsLogger (Endpoint) {
/* Private ********************************************************************/
    const eventAction = {
      CHI_SURVEY:       { chiSurvey:   true },
      CONTACT_PHU:      { contactPhu:  true },
      SET_LANGUAGE_EN:  { setLanguage: 'en' },
      SET_LANGUAGE_FR:  { setLanguage: 'fr' },
    };


/* Public *********************************************************************/
    /**
     * Handles user click event tracking by sending POST to analytics endpoint.
     * @param {CustomEvent} - the analytics event dispatched by $analytics module
     */
    function handleEventTrack ({detail}) {
      if (eventAction[detail]) Endpoint.postAnalyticsLog(eventAction[detail]);
      else console.error(`Event Action "${detail}" is not a valid option for logging!`);
    }

    /**
     * Handles page/route transition event tracking by realying for POST to analytics endpoint.
     * @param {CustomEvent} - the analytics event dispatched by $analytics module
     */
    function handlePageTrack ({detail}) {
      Endpoint.postAnalyticsLog({ transitionPage: detail });
    }


/* Interface ******************************************************************/

    return {
      handleEventTrack: handleEventTrack,
      handlePageTrack:  handlePageTrack,
    };
  }

}());
