(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 2 which are completed in the test case scenarios.
  * @namespace requirementGroup_2
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _2 = {

      /**
        * @desc 2.01 -- The Solution SHALL provide an option for the patient's address type including address types "Street","Rural" and "PO Box".
        * @memberof requirementGroup_2 
      */
      _01: () => {
        wait.waitForElements([submission.address.type.street, submission.address.type.rural, submission.address.type.poBox])  
      },

      /**
        * @desc 2.02 -- The solution SHALL provide an input for exactly one address to be attached to the patient's demographic record. 
        * @memberof requirementGroup_2 
      */
      _02: (city, province, postalCode) => {
        // Input a value into the "City" and "Province" inputs.
        form.populate([
          form.Field(form.TEXT, submission.address.city, city),
          form.Field(form.SELECT, submission.address.province, province),
          form.Field(form.TEXT, submission.address.postalCode, postalCode)
        ]);
      },

      /**
        * @desc 2.03 -- The solution SHALL provide inputs for the patient's Street Number, Unit Number, Street Name, Street Type, Street Direction, City, 
        * Province and Postal Code if the "Street" address type is selected and postal code has been entered. 
        * @memberof requirementGroup_2 
      */
      _03: (streetNumber, unitNumber, streetDirection, streetType) => {
        // Select the "Street" radio button and move to the street address input.
        if (streetNumber == "") {streetNumber = "10";}
        form.populate([
          form.Field(form.CLICK, submission.address.type.street),
          form.Field(form.TEXT, submission.address.streetNumber, streetNumber),
          form.Field(form.TEXT, submission.address.unitNumber, unitNumber),
          form.Field(form.SELECT, submission.address.streetDirection, streetDirection),
          form.Field(form.SELECT, submission.address.streetType, streetType)
        ]);
      }, 
      /**
        * @desc 2.04 -- The solution SHALL provide inputs for the patient's Rural Route Number, Station, City, Province and Postal Code, along with a field for additional information if the "Rural" address type is selected.
        * @memberof requirementGroup_2 
      */
      _04: (ruralRouteNumber, station, additionalInfo) => {
        // Select the "Rural" radio button and move to the rural address input.
        if (ruralRouteNumber == "") {ruralRouteNumber = "10";}
        if (station == "") {station = "Haley";}
        form.populate([
          form.Field(form.CLICK, submission.address.type.rural),
          form.Field(form.TEXT, submission.address.ruralRouteNumber, ruralRouteNumber),
          form.Field(form.TEXT, submission.address.station, station),
          form.Field(form.TEXT, submission.address.additionalInfo, additionalInfo)
        ]);
      },

      /**
        * @desc 2.05 -- The solution SHALL provide inputs for the patients PO Box Number, Station, City, Province and Postal Code if the "PO Box" address type is selected.
        * @memberof requirementGroup_2 
      */
      _05: (poBoxNumber, rpo, station) => {
        // Select the PO Box radio button and move to the PO Box address input page.
        if (poBoxNumber == "") {poBoxNumber = "53";}
        form.populate([
          form.Field(form.CLICK, submission.address.type.poBox),
          form.Field(form.TEXT, submission.address.poBoxNumber, poBoxNumber),
          form.Field(form.TEXT, submission.address.rpo, rpo),
          form.Field(form.TEXT, submission.address.station, station)
        ]);
      },

      /**
        * @desc 2.06 -- The solution SHALL prevent browser from caching previous entries in the form. 
        * @memberof requirementGroup_2 
      */
      _06: () => {
        // Select "PO Box" radio button and populate the PO Box input move to the "Rural" address page and return to the "PO Box" page.
        form.populate([
          form.Field(form.CLICK, submission.address.type.poBox),
          form.Field(form.TEXT, submission.address.poBoxNumber, '12345'),
          form.Field(form.CLICK, submission.address.type.rural),
          form.Field(form.CLICK, submission.address.type.poBox)
        ]);
        // Wait for the PO Box number to appear on the page and ensure the input is empty. 
        wait.waitForElements([submission.address.poBoxNumber])
          .then(() => {
            element(by.css(submission.address.poBoxNumber)).getAttribute('value')
              .then((value) => {
                expect(value).toBe("");
              });
          });
      },

      /**
        * @desc 2.07 -- The solution SHALL provide auto-complete feedback as the user types their postal code into the postal code text box.  
        * @memberof requirementGroup_2 
      */
      _07: (postalCode) => {
        form.populate([
          form.Field(form.CLICK, submission.address.type.street),
        ]);
        // Input postal code into the postal code type ahead.
        wait.waitForElements([submission.address.postalAutoComplete]) 
          .then(() => {
            for (var char = 0; char < postalCode.length; char++) {
              browser.sleep(500);
              element(by.css(submission.address.postalAutoComplete)).sendKeys(postalCode.charAt(char));
            }
            browser.sleep(2000);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            // Validate the the full description in the type ahead selection.
            element(by.css(submission.address.postalAutoComplete)).getAttribute('value')
              .then((value) => {
                expect(value.toLowerCase())
                  .toContain(postalCode.toLowerCase());
              });
          });
      },

      /**
        * @desc 2.08 -- The solution SHALL auto-fill address informaton when an auto-completed postal code is provided. 
        * @memberof requirementGroup_2 
      */
      _08: (streetName, city, province, streetType, postalCode) => {
        form.populate([
          form.Field(form.CLICK, submission.address.type.street),
        ]);
        element(by.css(submission.address.streetName)).getAttribute('value')
          .then((value) => {
            expect(value).toContain(streetName);
          });
        element(by.css(submission.address.city)).getAttribute('value')
          .then((value) => {
            expect(value).toContain(city);
          });
        element(by.css(submission.address.province)).getAttribute('value')
          .then((value) => {
            expect(value).toContain(province);
          });
        element(by.css(submission.address.streetType)).getAttribute('value')
          .then((value) => {
            expect(value).toContain(streetType);
          });
        element(by.css(submission.address.postalCode)).getAttribute('value')
          .then((value) => {
            expect(value).toBe(postalCode);
          });
      }
    };
  return _2;
  }
}());
