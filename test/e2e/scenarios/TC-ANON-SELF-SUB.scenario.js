(function () {
'use strict';
  var requirement = require('../requirements/requirements.js');
  var authentication = 'Anonymous';
  var role = 'Myself';
  var acceptUsePolicy = 'Accept';
  var gatingQuestionOneAwns = 'No'
  var gatingQuestionTwoAwns= 'Unsure'
  var dataSet = require('../lib/data_sets/dataSets.js').Sam_Smith;

  describe('TC-ANON-SELF-SUB', () => {
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
    });

    describe('<Patient>',  () => {
      it('1.01 -- The solution SHALL provide a freeform text box entry for the patient\'s first, middle and last name.', () => {
        requirement._1()._01(dataSet.myself.firstName, dataSet.myself.middleName, dataSet.myself.lastName);
      });

      it('1.02 -- The solution SHALL provide a date formatted text box for capturing the date of birth.', () => {
        requirement._1()._02();
      });

      it('1.03 -- The solution SHALL provide a calendar extension to this text box which allows a user to easily select a previous date over multiple years (i.e. provide a shortcut for year of birth).', () => {
        requirement._1()._03();
      });

      it('1.04 -- The solution SHALL verify that the date of birth is a valid date, and SHALL indicate the date is invalid if validation fails.', () => {
        requirement._1()._04(dataSet.myself.birthDate);
      });

      it('1.05 -- The solution SHALL provide a radio group for selecting the patient’s sex. The sex SHALL be one of Male, Female or Other. The solution SHALL NOT permit the selection of more than one sex.', () => {
        requirement._1()._05(dataSet.myself.sex);
      });

      it('1.06 -- The solution SHALL provide a textbox to capture one telephone number and extention and SHALL provide a descriptive error when the inputs are not in the correct format.', () => {
        requirement._1()._06(dataSet.myself.phoneNumber, dataSet.myself.phoneExt);
      });

      it('1.07 -- The solution SHALL provide a text input area for entry of a valid Ontario Health Card number.' +
         'The solution SHALL format this number according to the standardized Ontario Health Card Number format (for display purposes).', () => {
        requirement._1()._07(dataSet.dependantTwo.healthCardNumber);
      });

      it('1.10 -- The solution SHALL provide a text input area for entry of a valid Ontario Immunization Identification. ' + 
         'The solution SHALL format this number according to the standardized Ontario Immunization Identification format (for display purposes).', () => {
        requirement._1()._10(dataSet.myself.oiid);
      });

      it('Will move to the address page.', () => {
        // Move to address page.
        element(by.css('#pager-next-button'))
          .click();
      });
    });

    describe('<Address>',  () => {
      it('2.01 -- The Solution SHALL provide an option for the patient\'s address type including address types "Street","Rural" and "PO Box"', () => {
        requirement._2()._01();
      });

      it('2.02 -- The solution SHALL provide an input for exactly one address to be attached to the patient\'s demographic record.', () => {
        requirement._2()._02(dataSet.myself.city, dataSet.myself.province, dataSet.myself.postalCode);
      });

      it('2.05 -- The solution SHALL provide inputs for the patients PO Box Number, Station, City, Province and Postal Code if the "PO Box" address type is selected.', () => {
        requirement._2()._05(dataSet.myself.poBoxNumber, dataSet.myself.rpo, dataSet.myself.station);
      });

      it('2.06 -- The solution SHALL prevent browser from caching previous entries in the form.' , () => {
        requirement._2()._06();
      }); 

      it('2.04 -- The solution SHALL provide inputs for the patient\'s Rural Route Number, Station, City, Province and Postal Code, along with a field for additional information if the "Rural" address type is selected.', () => {
        requirement._2()._04(dataSet.myself.ruralRouteNumber, dataSet.myself.station, dataSet.myself.additionalInfo); 
      });

      it('2.07 -- The solution SHALL provide auto-complete feedback as the user types their postal code into the postal code text box.', () => {
        requirement._2()._07(dataSet.myself.postalCode);
      });

      it('2.03 -- The solution SHALL provide inputs for the patient\'s Street Number, Unit Number, Street Name, Street Type, Street Direction, City, ' + 
         'Province and Postal Code if the "Street" address type is selected and postal code has been entered.', () => {
        requirement._2()._03(dataSet.myself.streetNumber, dataSet.myself.unitNumber, dataSet.myself.streetDirection, dataSet.myself.streetType);
      });

      it('2.08 -- The solution SHALL auto-fill address informaton when an auto-completed postal code is provided.', () => {
        requirement._2()._08(dataSet.myself.streetName, dataSet.myself.city, dataSet.myself.province, dataSet.myself.streetType, dataSet.myself.postalCode);
      });

      it('Will move to the immunizations page.', () => {
        // Move to immunizations page.
        element(by.css('#pager-next-button'))
          .click();
      });
    });

    describe('<Immunizations>',  () => {
      it('13.01 -- The solution SHALL provide the user with two gating questions prior to entering immunization details.',  () => {
        requirement._13()._01();
      });

      it('13.02 -- The solution SHALL accept answers Yes or No for the first gating question.',  () => {
        requirement._13()._02();
      });

      it('13.03 -- The solution SHALL present the first gating question as an inquiry about a letter recieved from the Public Health Unit. ' + 
         'If NO, the second gating question will be prompted (ON flow). If YES, no other gating question will be prompted (Alt flow).',  () => {
        requirement._13()._03();
      });

      it('13.04 -- The solution SHALL present the second gating question as an inquiry as to if all immunizations to be entered were according to the province\'s routine immunization schedule. ' + 
         'If YES, then only immunizations from Ontario\'s routine schedule will populate. If NO or UNSURE, all immunizations will populate. ',  () => {
        requirement._13()._04();
      });

      it('13.05 -- The solution SHALL present the second gating question as an inquiry as to if all immunizations to be entered were according to the province\'s routine immunization schedule. ' + 
         'If YES, then only immunizations from Ontario\'s routine schedule will populate. If NO or UNSURE, all immunizations will populate. ',  () => {
        requirement._13()._05(gatingQuestionOneAwns, gatingQuestionTwoAwns);
      });

      it('3.02 -- The solution SHALL provide the user with ability to display their immunizations organized by immunization or date.',  () => {
        requirement._3()._02();
      });

      it('3.05 -- The solution SHALL require that immunization entry is composed of a valid date and immunization.',  () => {
        requirement._3()._05();
      });

      it('3.06 -- The solution SHALL provide a calendar extension to this text box which allows a user to easily select a previous date over multiple years (i.e. provide a shortcut for year of birth).',  () => {
        requirement._3()._06();
      });

      it('3.03 -- The solution SHALL provide an autocomplete feedback as the user types the immunization name.',  () => {
      e requirement._3()._03(dataSet.myself.immunizations.immunization);
      });

      it('3.07 -- The solution SHALL verify that the date selected is a valid date, and SHALL indicate that the date is invalid if validation fails. (Event after DOB and before Today)',  () => {
        requirement._3()._07(dataSet.dependantTwo.immunizations.date);
      });

      it('3.01 -- The solution SHALL provide the user with the ability to add an immunization record by selecting an existing date,' +
         'selecting a new date, or selecting an already-selected immunization, or selecting a new immunization.',  () => {
        requirement._3()._01();
      });

      it('3.08 -- When a user adds a new date and the existing record already has immunization events for that date, ' + 
         'the solution SHALL prompt the user indicating that other immunizations for that date are already on the record.',  () => {
        requirement._3()._08();
      });

      it('Will move to the documents page.', () => {
        // Move to documents page.
        element(by.css('#pager-next-button'))
          .click();
      });
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
      it('Will move to the review page.', () => {
        // Move to documents page.
        element(by.css('#pager-next-button'))
          .click();
      });   
    });

    describe('<Review>', () => {
      it('6.01 -- The solution SHALL display to the user a preview of the submission before it is confirmed by the user.',  () => {
        requirement._6()._01(dataSet.dependantTwo.immunizations.immunization);
      });

      it('7.01 -- The solution SHALL provide a button to submit the form.',  () => {
        requirement._7()._01();
      });

      it('6.02 -- The solution SHALL provide the user with the ability to navigate to previous pages to make corrections to their submission.',  () => {
        requirement._6()._02();
      });

      it('Will move to the completion page.', () => {
        // Move to complete page.
        element(by.css('#pager-next-button'))
          .click();
      });
    });

    describe('<Completion>', () => {
      it('15.01 -- The solution SHALL provide the user with an invitation to participate in a follow up survey',  () => {
         requirement._15()._01();
      });
    });
  });
}());
