(function() {
'use strict';
  /**
  * A Library for storing the ICON test requirements in group 4 which are completed in the test case scenarios.
  * @namespace requirementGroup_4
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _4 = {

      /**
        * @desc 4.01 -- The solution SHALL provide the user with the ability to delete an immunization added by the user before submission.
        * @memberof requirementGroup_4
      */
      _01: () => {
        var INDEX = 0;
        form.populate([
          form.Field(form.CLICK, submission.immunizations.immunizationEdit + INDEX),
          form.Field(form.CLICK, submission.immunizations.deleteImmunization)
        ]);
      }      
    };
    return _4;
  }
}());
