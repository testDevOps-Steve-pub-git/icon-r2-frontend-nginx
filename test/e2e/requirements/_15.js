(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 15 which are completed in the test case scenarios.
  * @namespace requirementGroup_15
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _15 = {

      /**
        * @desc 15.01 -- The solution SHALL provide the user with an invitation to participate in a follow up survey.
        * @memberof requirementGroup_15 
      */
      _01: () => {
        wait.waitForElements([submission.completion.surveyLink]);
      }
    };
    return _15;
  }
}());
