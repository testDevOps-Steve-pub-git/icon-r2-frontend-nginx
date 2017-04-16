(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 7  which are completed in the test case scenarios.
  * @namespace requirementGroup_7
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _7 = {

      /**
        * @desc 7.01 -- The solution SHALL provide a button to submit the form.
        * @memberof requirementGroup_7 
      */
      _01: () => {
        // Wait for "Complete Submission" button to appear on page and ensure that it contains the text "Complete Submission".
        wait.waitForElements([submission.review.submit])
          .then(() => {
            element(by.css(submission.review.submit)).getText()
              .then((value) => {
                expect(value).toContain('Submit Immunizations');
              });
          });
      },

      /**
        * @desc 7.06 -- The solution SHALL allow the user to print or save to PDF the submission details. 
        * @memberof requirementGroup_7 
      */
      _06: () => {
        wait.waitForElements([submission.completion.print]);
      }
    };
    return _7;
  }
}());
