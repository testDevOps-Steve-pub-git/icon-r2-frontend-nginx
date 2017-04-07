(function () {
'use strict';
  var requirement = require('../requirements/requirements.js');
  var authentication = 'Authenticated';
  var role = 'Myself';
  var acceptUsePolicy = 'Accept';
  var dataSet = require('../lib/data_sets/dataSets.js').Sam_Smith;

  describe('TC-AUTH-RET-SELF', () => {
    beforeAll(() => {
      browser.get('');
    });

    beforeEach(() => {
      browser.waitForAngular();
      browser.ignoreSynchronization = true;
    });

    describe('<Home>', () => {
//      it('21.01 -- The solution SHALL provide the user with information on obtaining an Ontario Immunization ID and PIN.', () => {
//        requirement._21()._01();
//      });
//
//      it('21.02 -- The solution SHALL provide the user with information on Ontario\'s immunization routine schedule.', () => {
//        requirement._21()._02();
//      });
//
//      it('21.03 -- The solution SHALL provide the user with links to information on Immunization of Schools Pupil Act and the Child Care and Early Years Act.', () => {
//        requirement._21()._03();
//      });
//
//      it('21.04 -- The solution shall present the user with the ability to authenticate themselves or submit an immunization record without authentication.', () => {
//        requirement._21()._04(authentication);
//      });
//
//      it('16.01 -- The solution SHALL present the user with a toggle to identify their role when retrieving or submitting an immunization record. ', () => {
//        requirement._16()._01(role);
//      });
//
//      it('12.01 -- The solution SHALL provide the user with the acceptable use policy/privacy policy around user data.', () => {
//        requirement._12()._01();
//      });
//
//      it('12.02 -- The solution SHALL provide the user with buttons to Accept or Deny the policy.', () => {
//        requirement._12()._02(acceptUsePolicy);
//      });
    });

    describe('<Retrieve>',  () => {
//      it('17.01 -- The solution SHALL prompt the user for a ten digit Ontario Immunization ID and a six-digit security PIN as a method of authentication prior to being given the ability to view Yellow Card data,' + 
//         'modify their immunization record or retrieve a list of required immunizations.',  () => {
//        requirement._17()._01(dataSet.myself.oiid, dataSet.myself.pin);
//      });
//
//      it('18.01 -- The solution SHALL provide a list of needed immunizations.',  () => {
//        requirement._18()._01();
//      });
//
//      it('18.02 -- The solution SHALL provide the user with the ability to print the list of needed immunizations and/or save it as a PDF.',  () => {
//        requirement._18()._02();
//      });
//
//      it('8.01 -- The solution SHALL provide the user with a simulated Yellow Card with data retrieved from DHIR using HL7 FHIR 1.4 compliant services.',  () => {
//        requirement._8()._01();
//      });
//
//      it('8.02 -- The solution SHALL provide the user with the ability to print the Yellow Card and/or save it as a PDF.',  () => {
//        requirement._8()._02();
//      });
    });
  });
}());
