(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 16 which are completed in the test case scenarios.
  * @namespace requirementGroup_16
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _16 = {

      /**
        * @desc 16.01 -- The solution SHALL present the user with a toggle to identify their role when retrieving or submitting an immunization record. 
        * @memberof requirementGroup_16 
      */
      _01: (role) => {
        // Selects the "My Self" as the role you will submitting information for       
        wait.waitForElements([global.role.myself, global.role.other])
          .then(() => {
            if (role === 'Myself'){
              element(by.css(global.role.myself))
                .click();
            }
            else {
              element(by.css(global.role.other))
                .click();
            }
          });      
      },

      /**
        * @desc 16.02 -- The solution SHALL prompt the user for submitter information if the immunization submission is being done on behalf of a dependant. 
        * @memberof requirementGroup_16  
      */
      _02: (firstName, lastName, phoneNumber) => {
        form.populate([
          form.Field(form.TEXT, submission.submitter.firstName, firstName),
          form.Field(form.TEXT, submission.submitter.lastName, lastName),
          form.Field(form.TEXT, submission.patient.phoneNumber, phoneNumber)
        ]);
      }
    };
    return _16;
  }
}());
