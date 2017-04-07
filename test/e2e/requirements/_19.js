(function() {
'use strict';
  // Function to be called for both the email and confirm email inputs.

  /**
  * A Library for storing the ICON test requirements in group 19 which are completed in the test case scenarios.
  * @namespace requirementGroup_19
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _19 = {

      /**
        * @desc 19.01 -- The solution SHALL provide a formatted input text box to capture an e-mail address. 
        * @memberof requirementGroup_19
      */
      _01: (email) => {
        wait.waitForElements([submission.patient.email]);
      },

      /**
        * @desc 19.02 -- The solution SHALL validate the e-mail address entered into the e-mail address field and SHALL provide a descriptive error when that input is not in the correct format. 
        * @memberof requirementGroup_19
      */
      _02: (email) => {
        form.populate([
          form.Field(form.TEXT, submission.patient.email, email),
        ]);
      },

      /**
        * @desc 19.03 -- The solution SHALL require the user to input their e-mail address again to ensure the email they have entered is valid. If the e-mails entered are not valid an error must be provided. 
        * @memberof requirementGroup_19
      */
      _03: (email) => {
        form.populate([
          form.Field(form.TEXT, submission.patient.confirmEmail, email),
        ]);
      }
    };
    return _19;
  }
}());
