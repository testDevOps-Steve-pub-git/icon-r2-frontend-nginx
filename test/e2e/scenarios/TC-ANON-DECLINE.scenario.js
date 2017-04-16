(function () {
'use strict';
  var requirement = require('../requirements/requirements.js');
  var authentication = 'Anonymous';
  var role = 'Myself';
  var acceptUsePolicy = 'Decline';
  var dataSet = require('../lib/data_sets/dataSets.js').Sam_Smith;

  describe('TC-AUTH-OTHER-SUB', () => {
    beforeAll(() => {
      browser.get('');
    });

    beforeEach(() => {
      browser.waitForAngular();
      browser.ignoreSynchronization = true;
    });

    describe('<Home>', () => {
      it('21.01 -- The solution SHALL present the functionality and purpose of the web application.', () => {
        requirement._21()._01();
      });

      it('21.02 -- The solution SHALL provide the user with links to information on Immunization of Schools Pupil Act and the Child Care and Early Years Act.', () => {
        requirement._21()._02();
      });

      it('21.03 -- The solution SHALL present the user with the ability to authenticate themselves or submit an immunization record without authentication.', () => {
        requirement._21()._03();
      });

      it('21.04 -- The solution SHALL provide the user with the ability to view immunizations that are overdue or upcoming.', () => {
        requirement._21()._04(authentication);
      });

      it('16.01 -- The solution SHALL require the user to identify their role when retrieving or submitting an immunization record.', () => {
        requirement._16()._01(role);
      });

      it('12.01 -- The solution SHALL present the user with an acceptable use policy.', () => {
        requirement._12()._01();
      });

      it('12.02 -- The solution SHALL provide the user with buttons to Accept or Decline the policy.', () => {
        requirement._12()._02(acceptUsePolicy);
      });

      it('12.03 -- The solution SHALL require the user to consent to the sharing of their public health information with their public health unit.', () => {
        requirement._12()._03();
      });
   });
  });
}());
