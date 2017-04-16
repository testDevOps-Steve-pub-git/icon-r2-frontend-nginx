(function () {
'use strict';
  var requirement = require('../requirements/requirements.js');
  var authentication = 'Anonymous';
  var role = 'Other';
  var acceptUsePolicy = 'Accept';
  var gatingQuestionOneAwns = 'No'
  var gatingQuestionTwoAwns= 'No'
  var gatingQuestionThreeAwns= 'No'
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
    });

    describe('<Patient>',  () => {
      it('1.01 -- The solution SHALL provide a freeform text box entry for the patient\'s first, middle and last name.', () => {
        requirement._1()._01(dataSet.dependantTwo.firstName, dataSet.dependantTwo.middleName, dataSet.dependantTwo.lastName);
      });

      it('1.02 -- The solution SHALL provide a date formatted text box for capturing the date of birth.', () => {
        requirement._1()._02();
      });

      it('1.03 -- The solution SHALL provide a calendar extension to this text box which allows a user to easily select a previous date over multiple years (i.e. provide a shortcut for year of birth).', () => {
        requirement._1()._03();
      });

      it('1.04 -- The solution SHALL verify that the date of birth is a valid date, and SHALL indicate the date is invalid if validation fails.', () => {
        requirement._1()._04(dataSet.dependantTwo.birthDate);
      });

      it('1.05 -- The solution SHALL provide a radio group for selecting the patient’s sex. The sex SHALL be one of Male, Female or Other. The solution SHALL NOT permit the selection of more than one sex.', () => {
        requirement._1()._05(dataSet.dependantTwo.sex);
      });

      it('1.07 -- The solution SHALL provide a text input area for entry of a valid Ontario Health Card number.' +
         'The solution SHALL format this number according to the standardized Ontario Health Card Number format (for display purposes).', () => {
        requirement._1()._07(dataSet.dependantTwo.healthCardNumber);
      });

      it('1.08 -- The solution SHALL provide a textbox for entry of the school/daycare which the patient is attending ONLY if the patients appears under 18 years of age.', () => {
        requirement._1()._08();
      });

      it('1.09 -- The solution SHALL provide auto-complete feedback as the user types the school name.', () => {
        requirement._1()._09(dataSet.dependantTwo.institutionName);
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
        requirement._2()._02(dataSet.dependantTwo.city, dataSet.dependantTwo.province, dataSet.dependantTwo.postalCode);
      });

      it('2.05 -- The solution SHALL provide inputs for the patients PO Box Number, Station, City, Province and Postal Code if the "PO Box" address type is selected.', () => {
        requirement._2()._05(dataSet.dependantTwo.poBoxNumber, dataSet.dependantTwo.rpo, dataSet.dependantTwo.station);
      });

      it('2.06 -- The solution SHALL prevent browser from caching previous entries in the form.' , () => {
        requirement._2()._06();
      }); 

      it('2.04 -- The solution SHALL provide inputs for the patient\'s Rural Route Number, Station, City, Province and Postal Code, along with a field for additional information if the "Rural" address type is selected.', () => {
        requirement._2()._04(dataSet.dependantTwo.ruralRouteNumber, dataSet.dependantTwo.station, dataSet.dependantTwo.additionalInfo); 
      });

      it('2.07 -- The solution SHALL provide auto-complete feedback as the user types their postal code into the postal code text box.', () => {
        requirement._2()._07(dataSet.dependantTwo.postalCode);
      });

      it('2.03 -- The solution SHALL provide inputs for the patient\'s Street Number, Unit Number, Street Name, Street Type, Street Direction, City, ' + 
         'Province and Postal Code if the "Street" address type is selected and postal code has been entered.', () => {
        requirement._2()._03(dataSet.dependantTwo.streetNumber, dataSet.dependantTwo.unitNumber, dataSet.dependantTwo.streetDirection, dataSet.dependantTwo.streetType);
      });

      it('2.08 -- The solution SHALL auto-fill address informaton when an auto-completed postal code is provided.', () => {
        requirement._2()._08(dataSet.dependantTwo.streetName, dataSet.dependantTwo.city, dataSet.dependantTwo.province, dataSet.dependantTwo.streetType, dataSet.dependantTwo.postalCode);
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

      it('13.02 -- The solution SHALL require to indicate if they have received a suspension warning letter from their local PHU.',  () => {
        requirement._13()._02();
      });

      it('13.03 The solution SHALL require the user to indicate if the immunizations were received within Ontario.' + 
         'If YES, then the user will only only be able to select immunizations that have been commonly adiministered in Ontario.',  () => {
        requirement._13()._03();
      });

      it('13.04 -- The solution SHALL require the user to indicate if the immunizations were received within Canada.' +
         'If YES, then the user will only only be able to select immunizations that have been commonly adiministered in Canada.',  () => {
        requirement._13()._04();
      });

      it('13.05 -- The solution SHALL require the user to select the immunization data organizational structure (either by date or by immunization).',  () => {
        requirement._13()._05(gatingQuestionOneAwns, gatingQuestionTwoAwns, gatingQuestionThreeAwns);
      });

      it('3.02 -- The solution SHALL provide the user with ability to display their immunizations organized by immunization or date.',  () => {
        requirement._3()._02();
      });

      it('3.05 -- The solution SHALL require that immunization entry is composed of a valid date and immunization.',  () => {
        requirement._3()._05();
      });

      it('3.06 -- The solution SHALL provide a calendar which allows a user to select a valid immunization date.',  () => {
        requirement._3()._06();
      });

      it('3.03 -- The solution SHALL provide an autocomplete feedback as the user types the immunization name.',  () => {
        requirement._3()._03(dataSet.dependantTwo.immunizations.immunization);
      });

      it('3.07 -- The solution SHALL verify that the date selected is a valid date, and SHALL indicate that the date is invalid if validation fails. (Event after DOB and before Today)',  () => {
        requirement._3()._07(dataSet.dependantTwo.immunizations.date);
      });

      it('3.01 -- The solution SHALL provide the user with the ability to add an immunization record by selecting an existing date,' +
         'selecting a new date, or selecting an already-selected immunization, or selecting a new immunization.',  () => {
        requirement._3()._01();
      });

//      it('When a user adds a new immunization and the existing record already has dates for that immunization,' +
//         'the solution SHALL prompt the user indicating that other dates for that immunization are already on the record.',  () => {
//        requirement._3()._09();
//      });

      it('4.01 -- The solution SHALL provide the user with the ability to delete an immunization added by the user before submission.', () => {
        requirement._4()._01();
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

      it('Will move to the submitter page.', () => {
        // Move to submitter page.
        element(by.css('#pager-next-button'))
          .click();
      });   
    });

    describe('<Submitter>', () => {
      it('16.02 -- The solution SHALL prompt the user for submitter information if the immunization submission is being done on behalf of a dependant.',  () => {
        requirement._16()._02(dataSet.myself.firstName, dataSet.myself.lastName, dataSet.myself.phoneNumber);
      });

      it('19.01 -- The solution SHALL provide a formatted input text box to capture an e-mail address.',  () => {
        requirement._19()._01(dataSet.myself.email);
      });

      it('19.02 -- The solution SHALL require the user to input their e-mail address again to ensure the email they have entered is valid. If the e-mails entered are not valid an error must be provided.',  () => {
        requirement._19()._02(dataSet.myself.email);
      });

      it('Will move to the review page.', () => {
        // Move to review page.
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
        element(by.css('#review-submit'))
          .click();
      });
    });

    describe('<Completion>', () => {
      it('7.06 -- The solution SHALL allow the user to print the submission details or save the submission details to PDF.',  () => {
        requirement._7()._06();
      });

      it('15.01 -- The solution SHALL provide the user with an invitation to participate in a follow up survey',  () => {
        requirement._15()._01();
      });
    });
  });
}());
