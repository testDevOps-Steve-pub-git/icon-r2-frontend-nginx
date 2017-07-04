/**
 * Interprets DHIR errors, and dispatches UI notifications to inform user.
 */
'use strict';

function DhirErrorHandler (Notify, DHIR_ERROR, ICON_NOTIFICATION) {

/* Private ********************************************************************/

  const matchResponseProfile = (candidateErrors) => (response) => {
    // NOTE: There are two possible places DHIR puts issue codes. Exciting!
    let hasIssue = (
      !!response
      && !!response.data
      && !!response.data.issue
      && !!response.data.issue.length
      && !!response.data.issue[0].code
    );
    const hasEntryResourceIssue = (
      !!response
      && !!response.data
      && !!response.data.entry
      && !!response.data.entry.length
      && !!response.data.entry[0].resource
      && !!response.data.entry[0].resource.issue
      && !!response.data.entry[0].resource.issue.length
      && !!response.data.entry[0].resource.issue[0].code
    );

    const isStatusAvailable     = (!!response && !!response.status);
    const isIssueCodeAvailable  = (hasIssue || hasEntryResourceIssue);

    const NO_MATCH_FOUND_FLAG = ``;

    if (!isStatusAvailable || !isIssueCodeAvailable) return NO_MATCH_FOUND_FLAG;

    const STATUS = response.status;
    const ISSUE = (hasEntryResourceIssue)
            ? response.data.entry[0].resource.issue[0].code
            : response.data.issue[0].code;

    const matchingDhirErrors = Object
            .keys(candidateErrors)
            .filter(key => candidateErrors[key].status === STATUS)
            .filter(key => {
              const ISSUE_WILDCARD = `*`;
              const isMatchingIssueCode = (
                candidateErrors[key].issue === ISSUE_WILDCARD
                || candidateErrors[key].issue === ISSUE
              );
              return isMatchingIssueCode;
            })
            .map(key => candidateErrors[key]);

      return (matchingDhirErrors.length === 1)
                ? matchingDhirErrors[0].notification
                : NO_MATCH_FOUND_FLAG;
  }



/* Public *********************************************************************/

  const matchRetrievalErrorNotification = matchResponseProfile(DHIR_ERROR.RETRIEVAL);

  const matchSubmissionErrorNotification = matchResponseProfile(DHIR_ERROR.SUBMISSION);

  function notifyRetrievalError (response) {
    const NOTIFICATION = matchRetrievalErrorNotification(response);

    Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS);
    if (!!NOTIFICATION) Notify.publish(NOTIFICATION);
    else Notify.publish(ICON_NOTIFICATION.WARN_RETRIEVAL_NETWORK_PROBLEM);
  }

  function notifySubmissionError (response) {
    const NOTIFICATION = matchSubmissionErrorNotification(response);

    Notify.publish(ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS);
    if (!!NOTIFICATION) Notify.publish(NOTIFICATION);
    else Notify.publish(ICON_NOTIFICATION.WARN_SUBMISSION_NETWORK_PROBLEM);
  }

/* Interface ******************************************************************/

  return {
    matchRetrievalErrorNotification:  matchRetrievalErrorNotification,
    matchSubmissionErrorNotification: matchSubmissionErrorNotification,
    notifyRetrievalError:             notifyRetrievalError,
    notifySubmissionError:            notifySubmissionError,
  };
}

module.exports = DhirErrorHandler;
