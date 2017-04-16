(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 3 which are completed in the test case scenarios.
  * @namespace requirementGroup_3
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

    var _3 = {
    
      /**
        * @desc 3.01 -- The solution SHALL provide the user with the ability to add an immunization record via choosing an existing date, new date, or new immunization name. 
        * @memberof requirementGroup_3 
      */
      _01: () => {
        // Group immunizations by dates.
        form.populate([
          form.Field(form.CLICK, submission.immunizations.groupByDate)
        ]);

        // Group immunizations by immunizations.
        form.populate([
          form.Field(form.CLICK, submission.immunizations.groupByImmunization)
        ]);
      },
    
      /**
        * @desc 3.02 -- The solution SHALL provide the user with ability to display their immunizations organized by immunization or date. 
        * @memberof requirementGroup_3 
      */
      _02: () => {
        // Group immunizations by dates.
        form.populate([
          form.Field(form.CLICK, submission.immunizations.groupByDate)
        ]);
        // Group immunizations by immunizations.
        form.populate([
          form.Field(form.CLICK, submission.immunizations.groupByImmunization)
        ]);
      },
    
      /**
        * @desc 3.03 -- The solution SHALL provide an autocomplete feedback as the user types the immunization name. 
        * @memberof requirementGroup_3 
      */
      _03: (immunization) => {
       // Input "HPV-4" into the immunizations type ahead.
       immunizationTypeahead(immunization);
     },
  
      /**
        * @desc 3.04 -- The solution SHALL provide Lot Number and Trade Name/Brand as optional fields to assists searching for an immunization. 
        * @memberof requirementGroup_3 
      */
      _04: () => {
        wait.waitForElements([submission.immunizations.lotNumber, submission,immunizations.tradeName]);
      },
    
      /**
        * @desc 3.05 -- The solution SHALL require a date for each immunization, and vice-versa. 
        * @memberof requirementGroup_3 
      */
      _05: () => {
        // Check if date input is present on page and input a date into the input.
        form.populate([
          form.Field(form.CLICK, submission.immunizations.add)
        ]);
        wait.waitForElements([submission.immunizations.date])
      },
    
      /**
        * @desc 3.06 -- The solution SHALL provide a calendar extension to this text box which allows a user to easily select a previous date over multiple years (i.e. provide a shortcut for year of birth).
        * @memberof requirementGroup_3 
      */
      _06: () => {
        // Open date picker and wait for "Today" button to appear. 
        element(by.css('.input-group-btn'))
          .click();
        browser.wait(() => {
          return element.all(by.css('.uib-datepicker-current')).get(0).getText()
            .then((value) => {
              return value === 'Today';
            });
        },wait.TIMEOUT_TIME)
          .then(() => {
            // Click the "Today" button in the day picker.
            element.all(by.css('.uib-datepicker-current')).get(0)
              .click();
          });
        // Ensure the date input has been set today.
        element(by.css(submission.immunizations.date)).getAttribute('value')
          .then((value) => {
            expect(value)
              .toBe(new Date().toISOString().substring(0,10));
          });
        // Clear the date input.
        element(by.css(submission.immunizations.date))
         .clear(); 
      },
    
      /**
        * @desc 3.07 -- The solution SHALL verify that the date selected is a valid date, and SHALL indicate that the date is invalid if validation fails. 
        * @memberof requirementGroup_3 
      */
      _07: (immunizationDate) => {
        // Ensure the date input provides an error by inputing an invalid value then clear that value and input the users immunization date. Save the date added.
        form.populate([
          form.Field(form.TEXT, submission.immunizations.date, immunizationDate),
          form.Field(form.CLICK, submission.immunizations.save)
        ]);
      },

      /**
        * @desc 3.08 -- When a user adds a new date and the existing record already has immunization events for that date, 
        * the solution SHALL prompt the user indicating that other immunizations for that date are already on the record and indicate where they are.
        * @memberof requirementGroup_3 
      */
      _08: () => {
        // This set of steps is to be repeated to create an error on the page indicating the same date has been added twice.
        for (var i = 0; i < 2; i++) {
          // Wait for "Add Another Date" button to appear on page and click the button.
          form.populate([
            form.Field(form.CLICK, submission.immunizations.groupByDate),
            form.Field(form.CLICK, submission.immunizations.add),
            form.Field(form.TEXT, submission.immunizations.date, new Date().toISOString().substring(0,10)),
          ]);          
          immunizationTypeahead('HPV-4');
          form.populate([
            form.Field(form.CLICK, submission.immunizations.save),
          ]);          
        }
      },

      /**
        * @desc 3.09 -- When a user adds a new immunization and the existing record already has dates for that immunization, 
        * the solution SHALL prompt the user indicating that other dates for that immunization are already on the record, and indicate which they are. 
        * @memberof requirementGroup_3 
      */
      _09: () => {
        // This set of steps is to be repeated to create an error on the page indicating the same immunization has been added twice.
        for (var i = 0; i < 2; i++) {
          form.populate([
            form.Field(form.CLICK, submission.immunizations.groupByImmunization),
            form.Field(form.CLICK, submission.immunizations.add),
          ]);          
          immunizationTypeahead('HPV-4');
          form.populate([
            form.Field(form.TEXT, submission.immunizations.date, new Date().toISOString().substring(0,10)),
            form.Field(form.CLICK, submission.immunizations.save),
          ]);          
        }
      },
    };
    return _3; 
  }
}());
