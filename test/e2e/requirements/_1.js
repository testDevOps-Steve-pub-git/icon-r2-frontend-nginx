(function() {
'use strict';
  
  /**
  * A Library for storing the ICON test requirements in group 1 which are completed in the test case scenarios.
  * @namespace requirementGroup_1
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _1 = {

      /**
        * @desc 1.01 -- The solution SHALL provide a freeform text box entry for the patient's first, middle and last name. 
        * @memberof requirementGroup_1 
      */
      _01: (firstName, middleName, lastName) => {
        form.populate([
          form.Field(form.TEXT, submission.patient.firstName, firstName),
          form.Field(form.TEXT, submission.patient.middleName, middleName),
          form.Field(form.TEXT, submission.patient.lastName, lastName)
        ]);
      },

      /**
        * @desc 1.02 -- The solution SHALL provide a date formatted text box for capturing the date of birth. 
        * @memberof requirementGroup_1 
      */
      _02: () => {
        wait.waitForElements([submission.patient.birthDate]);
      },

      /**
        * @desc 1.03 -- The solution SHALL provide a calendar extension to this text box which allows a user to easily select a previous date over multiple years (i.e. provide a shortcut for year of birth). 
        * @memberof requirementGroup_1 
      */
      _03: () => {
        // Open the date picker and click the day button.
        element(by.css('.icon-date-input-button'))
          .click();
        browser.wait(() => {
          return element.all(by.css('.uib-datepicker-current')).get(0).getText()
            .then((value) => {
              return value.includes('Today');
            });
        },wait.TIMEOUT_TIME)
          .then(() => {
            element.all(by.css('.uib-datepicker-current')).get(0)
              .click();
          });
        //Ensure the Date in the Date Input is the Current Date and Clear the Date Input
        element(by.css(submission.patient.birthDate)).getAttribute('value')
          .then((value) => {
            expect(value)
              .toBe(new Date().toISOString().substring(0,10));
          });
        element(by.css(submission.patient.birthDate))
          .clear();
      },

      /**
        * @desc 1.04 -- The solution SHALL verify that the date of birth is a valid date, and SHALL indicate the date is invalid if validation fails. 
        * @memberof requirementGroup_1 
      */
      _04: (birthDate) => {
        form.populate([
          form.Field(form.TEXT, submission.patient.birthDate, birthDate)
        ])
      },

      /**
        * @desc 1.05 -- The solution SHALL provide a radio group for selecting the patient’s gender. The gender SHALL be one of Male, Female or Other. The solution SHALL NOT permit the selection of more than one gender. 
        * @memberof requirementGroup_1 
      */
      _05: (gender) => {
        // Wait for sex radio buttons to appear on the page and select each of the buttons finally selecting the button indicating the user's gender.
        form.populate([
          form.Field(form.CLICK, submission.patient.sex.male),
          form.Field(form.CLICK, submission.patient.sex.female),
          form.Field(form.CLICK, submission.patient.sex.other),
          form.Field(form.CLICK, submission.patient.sex.populate + '-' +  gender.toLowerCase())
        ]);
      },

      /**
        * @desc 1.06 -- The solution SHALL provide a textbox to capture one telephone number and extention and SHALL provide a descriptive error when the inputs are not in the correct format. 
        * @memberof requirementGroup_1 
      */
      _06: (phoneNumber, phoneExt) => {
        form.populate([
          form.Field(form.TEXT, submission.submitter.phoneNumber, phoneNumber),
          form.Field(form.TEXT, submission.submitter.phoneExt, phoneExt)
        ])
      },

      /**
        * @desc 1.07 -- The solution SHALL provide a text input area for entry of a valid Ontario Health Card number. The solution SHALL format this number according to the standardized Ontario Health Card Number format.
        * @memberof requirementGroup_1 
      */
      _07: (healthCardNumber) => {
        form.populate([
          form.Field(form.TEXT, submission.patient.healthCard, healthCardNumber)
        ]);
        element(by.css(submission.patient.healthCard)).getAttribute('value')
          .then((value) => {
             expect(value.substring(0,6)).toContain('-');
             expect(value.substring(6,9)).toContain('-');
          });
      },

      /**
        * @desc 1.08 -- The solution SHALL provide a textbox for entry of the school/daycare which the patient is attending ONLY if the patients appears under 18 years of age. 
        * @memberof requirementGroup_1 
      */
      _08: () => {
        wait.waitForElements([submission.patient.schoolOrDayCare]);
      },

      /**
        * @desc 1.09 -- The solution SHALL provide auto-complete feedback as the user types the school name.
        * @memberof requirementGroup_1 
      */
      _09: (schoolOrDayCare) => {
        // Input school into the schoole or daycare type ahead.
        form.populate([
          form.Field(form.TYPEAHEAD, submission.patient.schoolOrDayCare, schoolOrDayCare)
        ]); 
      },

      /**
        * @desc 1.10 -- The solution SHALL provide a text input area for entry of a valid Ontario Immunization Identification. 
        * The solution SHALL format this number according to the standardized Ontario Immunization Identification format (for display purposes). 
        * @memberof requirementGroup_1 
      */
      _10: (oiid) => {
        form.populate([
          form.Field(form.TEXT, submission.patient.oiid, oiid)
        ]);
        element(by.css(submission.patient.oiid)).getAttribute('value')
          .then((value) => {
             expect(value.substring(0,6)).toContain('-');
             expect(value.substring(6,9)).toContain('-');
          });
      },
    };
    return _1;
  }
}());
