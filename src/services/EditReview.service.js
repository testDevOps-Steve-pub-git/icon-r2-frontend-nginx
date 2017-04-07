/**
 * Service for the edit buttons on the review pages
 */
(function () {
'use strict';
  module.exports = EditReviewService;

  function EditReviewService () {
    let fromReviewPage = false;

    function getFromReviewPage () {
      return fromReviewPage;
    }

    function setFromReviewPage (value) {
      fromReviewPage = value;
    }

    return {
      getFromReviewPage: getFromReviewPage,
      setFromReviewPage: setFromReviewPage
    };
  }

}());
