(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 17 which are completed in the test case scenarios.
  * @namespace requirementGroup_17
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _17 = {

      /**
        * @desc 17.01 -- The solution SHALL prompt the user for a ten digit Ontario Immunization ID and a six-digit security PIN as a method of authentication prior 
        * to being given the ability to view Yellow Card data, modify their immunization record or retrieve a list of required immunizations. 
        * @memberof requirementGroup_17
      */
      _01: (oiid, pin) => {
        form.populate([
          form.Field(form.TEXT, retrieval.OIID, oiid),
          form.Field(form.TEXT, retrieval.PIN, pin),
          form.Field(form.CLICK, global.home.submit)
        ]);
      },
    
      /**
        * @desc 17.03 -- The solution SHALL auto-fill available patient information and address data when authenticated with Ontario Immunization ID and PIN. 
        * @memberof requirementGroup_17
      */
      _03: () => {
        browser.wait(() => {
          return element(by.css(g.pager.next)).getText()
            .then((value) => {
              return value === 'Complete Submission';
            });
        },timeoutTime);
        // Validate Submitter Information
        element.all(by.css('.icon-bg-white .panel-default')).get(0).getText()
          .then((value) => {
            var submit = value.split(' ');
              expect(submit[0])
                .toContain('Submitter');
              expect(submit[1].split('\n')[2] + submit[2].split('\n')[0])
                .toBe(data.submitter.firstName + data.submitter.lastName);
              expect(submit[3])
                .toContain(data.submitter.daytimePhoneNumber.substring(0,3));
              expect(submit[4])
                .toBe(data.submitter.daytimePhoneNumber.substring(3,6) + '-' + data.submitter.daytimePhoneNumber.substring(6,10));
              expect(submit[5])
                .toContain(data.submitter.daytimePhoneType);
              expect(submit[5])
                .toContain(data.submitter.email)
          });
        // Validate Patient Information
        element.all(by.css('.icon-bg-white .panel-default')).get(1).getText()
          .then((value) => {
            var submit = value.split(' ');
            expect(submit[0])
              .toContain('Patient');
            expect(submit[1].split('\n')[2] + submit[2].split('\n')[0] + submit[3].split('\n')[0])
              .toBe(data.patient.firstName + data.patient.middleName + data.patient.lastName);
            expect(submit[3])
              .toContain(data.patient.sex);
            expect(new Date(submit[3].split('\n')[4]).toISOString().substring(0,10))
              .toContain(data.patient.birthdate);
            expect(submit[5])
              .toContain(data.patient.healthCardNumber);
            expect((submit[11] + ' ' + submit[12]).toLowerCase())
              .toContain(data.patient.institutionName.toLowerCase());
          });
        // Validate Address Information
        element.all(by.css('.icon-bg-white .panel-default')).get(2).getText()
          .then((value) => {
            expect(value)
              .toContain('Mailing Address');
            expect(value)
              .toContain(data.patient.postalCode);
            expect(value)
              .toContain(data.patient.streetNumber);
          });
      }
    };
    return _17;
  }
}());
