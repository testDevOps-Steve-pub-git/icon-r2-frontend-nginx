(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 8 which are completed in the test case scenarios.
  * @namespace requirementGroup_8
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _8 = {

      /**
        * @desc 8.01 -- The solution SHALL provide the user with a simulated Yellow Card with data retrieved from DHIR using HL7 FHIR 1.4 compliant services.
        * @memberof requirementGroup_18
      */
      _01: () => {
        form.populate([
          form.Field(form.CLICK, retrieval.viewYellowCard)
        ]);
        //TODO: Check for Yellow Card info.
      },     

      /**
        * @desc 8.02 -- The solution SHALL provide the user with the ability to print the Yellow Card and/or save it as a PDF. 
        * @memberof requirementGroup_18
      */
      _02: () => {
        wait.waitForElements([retrieval.printYellowCard]);
      },    
    };
    return _8;
  }
}());
