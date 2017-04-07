(function () {
'use strict';
  var requirement = require('../requirements/requirements.js');
  var authentication = 'Authenticated';
  var role = 'Other';
  var acceptUsePolicy = 'Accept';
  var gatingQuestionOneAwns = 'Yes';
  var gatingQuestionTwoAwns= 'N/A';
  var dataSet = require('../lib/data_sets/dataSets.js').Sam_Smith;

  describe('TC-AUTH-SELF-ON', () => {
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
//      it('17.01 -- The solution SHALL prompt the user for a ten digit Ontario Immunization ID and a six-digit security PIN as a method of authentication prior to being given the ability to view Yellow Card data, ' + 
//         'modify their immunization record or retrieve a list of required immunizations.',  () => {
//        requirement._17()._01(dataSet.dependantOne.oiid, dataSet.other.pin);
//      });
//
//      it('Will move to the immunizations page.', () => {
//        // Move to immunizations page.
//        element(by.css('#pager-next-button'))
//          .click();
//      });
    });

    describe('<Immunizations>',  () => {
//      it('13.01 -- The solution SHALL provide the user with two gating questions prior to entering immunization details.',  () => {
//        requirement._13()._01();
//      });
//
//      it('13.02 -- The solution SHALL accept answers Yes or No for the first gating question.',  () => {
//        requirement._13()._02();
//      });
//
//      it('13.03 -- The solution SHALL present the first gating question as an inquiry about a letter recieved from the Public Health Unit. If NO, the second gating question will be prompted (ON flow). ' + 
//         'If YES, no other gating question will be prompted (Alt flow).',  () => {
//        requirement._13()._03();
//      });
//
//      it('13.04 -- The solution SHALL present the second gating question as an inquiry as to if all immunizations to be entered were according to the province\'s routine immunization schedule. ' + 
//         'If YES, then only immunizations from Ontario\'s routine schedule will populate. If NO or UNSURE, all immunizations will populate. ',  () => {
//        requirement._13()._04();
//      });
//
//      it('13.05 -- The solution SHALL present the second gating question as an inquiry as to if all immunizations to be entered were according to the province\'s routine immunization schedule. ' + 
//         'If YES, then only immunizations from Ontario\'s routine schedule will populate. If NO or UNSURE, all immunizations will populate. ',  () => {
//        requirement._13()._05(gatingQuestionOneAwns, gatingQuestionTwoAwns);
//      });
//
//      it('3.02 -- The solution SHALL provide the user with ability to display their immunizations organized by immunization or date.',  () => {
//        requirement._3()._02();
//      });
//
//      it('3.01 -- The solution SHALL provide the user with the ability to add an immunization record via choosing an existing date, new date, or new immunization name.',  () => {
//        requirement._3()._01();
//      });
//
//      it('3.05 -- The solution SHALL require a date for each immunization, and vice-versa.',  () => {
//        requirement._3()._05();
//      });
//
//      it('3.06 -- The solution SHALL provide a calendar extension to this text box which allows a user to easily select a previous date over multiple years (i.e. provide a shortcut for year of birth).',  () => {
//        requirement._3()._06();
//      });
//
//      it('3.07 -- The solution SHALL verify that the date selected is a valid date, and SHALL indicate that the date is invalid if validation fails.',  () => {
//        requirement._3()._07(dataSet.dependantOne.immunizations.date);
//      });
//
//      it('3.03 -- The solution SHALL provide an autocomplete feedback as the user types the immunization name.',  () => {
//        requirement._3()._03(dataSet.dependantOne.immunizations.immunization);
//      });
//
//      it('3.04 -- The solution SHALL provide Lot Number and Trade Name/Brand as optional fields to assists searching for an immunization.',  () => {
//        requirement._3()._04();
//      });
//
//      it('Will move to the documents page.', () => {
//        // Move to documents page.
//        element(by.css('#pager-next-button'))
//          .click();
//      });
    });

    describe('<Documents>', () => {
//      it('5.01 -- The solution SHALL provide the user ability to select individual files stored locally on their machine.',  () => {
//        requirement._5()._01();
//      });
//
//      it('5.02 -- The solution SHALL provide the user with a information on approved file types and maximum file sizes.',  () => {
//        requirement._5()._02();
//      });
//
//      it('5.03 -- The solution SHALL only allow .doc, docx, jpeg, jpg, .png, .pdf to be uploaded and provide the user with a clear error if the file is not of the approved type.',  () => {
//        requirement._5()._03();
//      });
//
//      it('5.04 -- The solution SHALL only allow file types smaller than 5 MB (up to 2 files) and provide the user with a clear error if the file is not of the approved file size.',  () => {
//        requirement._5()._04();
//      });
//
//      it('Will move to the review page.', () => {
//        // Move to review page.
//        element(by.css('#pager-next-button'))
//          .click();
//      });
    });

    describe('<Review>', () => {
//      it('1.08 -- The solution SHALL provide a textbox for entry of the school/daycare which the patient is attending ONLY if the patients appears under 18 years of age.',  () => {
//        requirement._1()._08();
//      });
//
//      it('16.02 -- The solution SHALL prompt the user for submitter information if the immunization submission is being done on behalf of a dependant.',  () => {
//        requirement._16()._02();
//      });
//
//      it('6.01 -- The solution SHALL display the immunization record to the user before submission for reviewing purposes before it is submitted.',  () => {
//        requirement._6()._01();
//      });
//
//      it('7.01 -- The solution SHALL provide a button to submit the form.',  () => {
//        requirement._7()._01();
//      });
//
//      it('Will move to the completion page.', () => {
//        // Move to completion page.
//        element(by.css('#pager-next-button'))
//          .click();
//      });
    });

    describe('<Completion>', () => {
//      it('15.01 -- The solution SHALL provide the user with an invitation to participate in a follow up survey',  () => {
//        requirement._15()._01();
//      });
//
//      it('14.01 -- The solution SHALL provide a button to submit the form.',  () => {
//        requirement._14()._01();
//      });
//
//      it('Will submit.', () => {
//        // Submit.
//        element(by.css('#pager-next-button'))
//          .click();
//      });
    });
  });
}());
