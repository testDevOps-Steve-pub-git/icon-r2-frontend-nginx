(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 18 which are completed in the test case scenarios.
  * @namespace requirementGroup_18
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _18 = {

      /**
        * @desc 18.01 -- The solution SHALL provide a list of needed immunizations.
        * @memberof requirementGroup_18
      */
      _01: () => {
        wait.waitForElements(['waitForCSS']);
        //TODO: Check needed immunizations in page via css.
      },     

      /**
        * @desc 18.02 -- The solution SHALL provide the user with the ability to print the list of needed immunizations and/or save it as a PDF. 
        * @memberof requirementGroup_18
      */
      _02: () => {
        wait.waitForElements([retrieval.saveImmunizations, retrieval.printImmunizations]);
      },    
    };
    return _18;
  }
}());
