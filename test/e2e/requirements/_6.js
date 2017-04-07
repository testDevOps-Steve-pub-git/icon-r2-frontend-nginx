(function() {
'use strict';

  /**
 * A Library for storing the ICON test requirements in group 6 which are completed in the test case scenarios.
  * @namespace requirementGroup_6
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _6 = {

      /**
        * @desc 6.01 -- The solution SHALL display the immunization record to the user before submission for reviewing purposes before it is submitted. 
        * @memberof requirementGroup_6 
      */
      _01: () => {
        //TODO: Ensure immunizations information is present via css 
        // Validate Immunizations Information
        element.all(by.css('.col-xs-12 col-xs-8 text-left')).get(3).getText()
          .then((value) => {
            expect(value)
              .toContain('Immunizations');
            expect(value)
              .toContain(data.patient.immunizations.vaccine)
          });
      },

      /**
        * @desc 6.02 -- The solution SHALL provide the user with the ability to return to previous pages via links to make corrections to the record. 
        * @memberof requirementGroup_6 
      */
      _02: () => {
        // Click the edit submitter button and ensure the user is brought to the patient page.
        form.populate([
          form.Field(form.CLICK, submission.review.editPatient),
        ]);
        wait.waitForElements([submission.patient.firstName, submission.patient.middleName, submission.patient.lastName])
          .then(() => {
            // Return to the Review page.
            element(by.css(global.pager.next))     
              .click();
          });
        // Click the edit address button and ensure the user is brought to the address page.
        form.populate([
          form.Field(form.CLICK, submission.review.editAddress),
        ]);
        wait.waitForElements([submission.address.type.street, submission.address.type.rural, submission.address.type.poBox])
          .then(() => {
            // Return to the Review page.
            element(by.css(global.pager.next))     
              .click();
          });
        // Click the edit immunizations button and ensure the user is brought to the imumunizations page.
        form.populate([
          form.Field(form.CLICK, submission.review.editImmunizations),
        ]);
        wait.waitForElements([submission.immunizations.groupByImmunizations, submission.immunizations.groupByDates])
          .then(() => {
            // Return to the Review page.
            element(by.css(global.pager.next))     
              .click();
          });
         // Click the edit documents button and ensure the user is brought to the documents page.
        form.populate([
          form.Field(form.CLICK, submission.review.editDocuments),
        ]);
        wait.waitForElements([submission.documents.chooseFile]) 
          .then(() => {
            // Return to the Review page.
            element(by.css(global.pager.next))     
              .click();
          });
      } 
    };
    return _6;
  }
}());
