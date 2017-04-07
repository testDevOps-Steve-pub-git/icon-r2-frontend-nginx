(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 12 which are completed in the test case scenarios.
  * @namespace requirementGroup_12
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => {
    var _12 = {

      /**
        * @desc 12.01 -- The solution SHALL provide the user with a use policy/privacy policy around user data. 
        * @memberof requirementGroup_12
      */
      _01: () => {
        wait.waitForElements([global.acceptUsePolicy.termsOfUseLink, global.acceptUsePolicy.continueReading]);
      },
    
      /**
        * @desc 12.02 -- The solution SHALL provide the user with buttons to Accept or Deny the policy.
        * @memberof requirementGroup_12 
      */
      _02: (acceptUsePolicy) => {
        wait.waitForElements([global.acceptUsePolicy.accept, global.acceptUsePolicy.decline])
          .then(() => {
            if(acceptUsePolicy === 'Accept') {
              element(by.css(global.acceptUsePolicy.accept))
                .click();
            }
            else {
              element(by.css(global.acceptUsePolicy.decline))
                .click();
            }
          });
      },

      /**
        * @desc 12.03 -- The solution SHALL prevent the user from continuing if the policy is denied.
        * @memberof requirementGroup_12 
      */
      _03: () => {
        wait.waitForElements([global.home.anon, global.home.auth])      
      } 
    };
    return _12;
  }
}());
