(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 14 which are completed in the test case scenarios.
  * @namespace requirementGroup_14
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _14 = {

      /**
        * @desc 14.01 -- The solution SHALL present the user the option of starting an additional submission upon submission of a immunization record.
        * @memberof requirementGroup_14
      */
      _01: () => {
        wait.waitForElements([submission.completion.startAnother]);
      }
    };
    return _14;
  }
}());
