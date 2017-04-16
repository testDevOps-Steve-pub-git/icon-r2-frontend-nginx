(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 21 which are completed in the test case scenarios.
  * @namespace requirementGroup_21
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _21 = {

      /**
        * @desc 21.01 -- The solution SHALL provide the user with information on obtaining an Ontario Immunization ID and PIN.
        * @memberof requirementGroup_21 
      */
      _01: () => {
        wait.waitForElements([global.home.oiidLinkOne, global.home.oiidLinkTwo]);
      },
    
      /**
        * @desc 21.02 -- The solution SHALL provide the user with information on Ontario's immunization routine schedule.
        * @memberof requirementGroup_21 
      */
      _02: () => {
        wait.waitForElements(['ontario-immunization-schedule'])
      },
    
      /**
        * @desc 21.03 -- The solution SHALL provide the user with links to information on Immunization of Schools Pupil Act and the Child Care and Early Years Act.
        * @memberof requirementGroup_21 
      */
      _03: () => {
        wait.waitForElements([global.home.immunizationsSchoolsActLink, global.home.childCareActLink]);
      },
    
      /**
        * @desc 21.04 -- The solution shall present the user with the ability to authenticate themselves or submit an immunization record without authentication.  
        * @memberof requirementGroup_21 
      */
      _04: (authentication) => {
        wait.waitForElements([global.home.anonSubmit, global.home.authSubmit])
          .then(() => {
            (authentication === 'Authenticated')
              ? element(by.css(global.home.authSubmit)).click()
              : element(by.css(global.home.anonSubmit)).click();
          });
      }
    };
    return _21;
  }
}());
