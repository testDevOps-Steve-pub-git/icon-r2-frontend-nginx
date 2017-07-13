/**
 * Service for the edit buttons on the review pages
 */

/* @ngInject */
function EditReviewService () {
  let fromReviewPage = false

  function getFromReviewPage () {
    return fromReviewPage
  }

  function setFromReviewPage (value) {
    fromReviewPage = value
  }

  return {
    getFromReviewPage: getFromReviewPage,
    setFromReviewPage: setFromReviewPage
  }
}

export default {
  name: 'EditReviewService',
  service: EditReviewService
}
