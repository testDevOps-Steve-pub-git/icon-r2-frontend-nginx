(function() {
'use strict';
  /**
  * A Library for storing the ICON test requirements in group 4 which are completed in the test case scenarios.
  * @namespace requirementGroup_4
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 

    function immunizationTypeahead(immunization) {
      wait.waitForElements([submission.immunizations.immunization]) 
        .then(() => {
          for (var char = 0; char < immunization.length - 1; char++) {
            browser.sleep(500);
            element(by.css(submission.immunizations.immunization)).sendKeys(immunization.charAt(char));
          }
          browser.sleep(2000);
          browser.actions().sendKeys(protractor.Key.ENTER).perform();
        })
    }

    var _4 = {

      /**
        * @desc 4.01 -- The solution SHALL provide the user with the ability to delete an immunization added by the user before submission.
        * @memberof requirementGroup_4
      */
      _01: () => {
        var INDEX = 0;
        form.populate([
          form.Field(form.CLICK, submission.immunizations.groupByImmunization),
          form.Field(form.CLICK, submission.immunizations.add),
        ]);          
        immunizationTypeahead('HPV-4');
        form.populate([
          form.Field(form.TEXT, submission.immunizations.date, new Date().toISOString().substring(0,10)),
          form.Field(form.CLICK, submission.immunizations.save),
        ]);          
        element.all(by.css(submission.immunizations.delete + INDEX)).get(1)
          .click();
      }      
    };
    return _4;
  }
}());
