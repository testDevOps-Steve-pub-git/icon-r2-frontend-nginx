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
        form.populate([
          form.Field(form.TEXT, submission.submitter.email, email),
        ]);
      },

      /**
        * @desc 19.03 -- The solution SHALL require the user to input their e-mail address again to ensure the email they have entered is valid. If the e-mails entered are not valid an error must be provided. 
        * @memberof requirementGroup_19
      */
      _02: (email) => {
        form.populate([
          form.Field(form.TEXT, submission.submitter.confirmEmail, email),
        ]);
      }
    };
    return _19;
  }
}());
