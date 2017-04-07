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
      it('21.01 -- The solution SHALL provide the user with information on obtaining an Ontario Immunization ID and PIN.', () => {
        requirement._21()._01();
      });

      it('21.02 -- The solution SHALL provide the user with information on Ontario\'s immunization routine schedule.', () => {
        requirement._21()._02();
      });

      it('21.03 -- The solution SHALL provide the user with links to information on Immunization of Schools Pupil Act and the Child Care and Early Years Act.', () => {
        requirement._21()._03();
      });

      it('21.04 -- The solution shall present the user with the ability to authenticate themselves or submit an immunization record without authentication.', () => {
        requirement._21()._04(authentication);
      });

      it('16.01 -- The solution SHALL present the user with a toggle to identify their role when retrieving or submitting an immunization record. ', () => {
        requirement._16()._01(role);
      });

      it('12.01 -- The solution SHALL provide the user with the acceptable use policy/privacy policy around user data.', () => {
        requirement._12()._01();
      });

      it('12.02 -- The solution SHALL provide the user with buttons to Accept or Deny the policy.', () => {
        requirement._12()._02(acceptUsePolicy);
      });

      it('12.03 -- The solution SHALL prevent the user from continuing if the policy is denied.', () => {
        requirement._12()._03();
      });
   });
  });
}());
