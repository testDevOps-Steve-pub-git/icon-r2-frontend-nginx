(function() {
'use strict';

  /** * A Library for storing the ICON test requirements in group 13 which are completed in the test case scenarios.
  * @namespace requirementGroup_13
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _13 = {

      /**
        * @desc 13.01 -- The solution SHALL provide the user with two gating questions prior to entering immunization detailsubmission.
        * @memberof requirementGroup_13 
      */
      _01: () => {
        // Wait for gating question one to be present and select "No".
        wait.waitForElements([submission.immunizations.questionOne.yes, submission.immunizations.questionOne.no])
          .then(() => {
            element(by.css(submission.immunizations.questionOne.no))
              .click();
          });
        //Wait for Gating question Two to be present.
        //
        wait.waitForElements([submission.immunizations.questionTwo.yes, submission.immunizations.questionTwo.yes, submission.immunizations.questionTwo.unsure])
          .then(() => {
            element(by.css(submission.immunizations.questionTwo.unsure))
              .click();
          });

        wait.waitForElements([submission.immunizations.questionThree.yes, submission.immunizations.questionThree.yes, submission.immunizations.questionThree.unsure])
          .then(() => {
            element(by.css(submission.immunizations.questionThree.unsure))
              .click();
          });
      },
    
      /**
        * @desc 13.02 -- The solution SHALL accept answers Yes or No for the first gating question.  
        * @memberof requirementGroup_13 
      */
      _02: () => {
        form.populate([
          form.Field(form.CLICK, submission.immunizations.questionOne.no),
          form.Field(form.CLICK, submission.immunizations.questionOne.yes),
        ]);
      },
    
      /**
        * @desc 13.03 -- The solution SHALL present the first gating question as an inquiry about a letter recieved from the Public Health Unit.
        * If NO, the second gating question will be prompted (ON flow).
        * @memberof requirementGroup_13 
      */
      _03: () => {
        form.populate([
          form.Field(form.CLICK, submission.immunizations.questionOne.yes)
        ]);
        form.populate([
          form.Field(form.CLICK, submission.immunizations.questionOne.no),
        ]);     
        wait.waitForElements([submission.immunizations.questionTwo.yes, submission.immunizations.questionTwo.no]);
      },
    
      /**
        * @desc 13.04 -- The solution SHALL present the second gating question as an inquiry as to if all immunizations to be entered were according to the province's routine immunization schedule. If YES, then only immunizations from Ontario's routine schedule will populate. If NO or UNSURE, all immunizations will populate. 
        * @memberof requirementGroup_13 
      */
      _04: () => {
        form.populate([
          form.Field(form.CLICK, submission.immunizations.questionTwo.no),
        ]);     
      },
    
      /**
        * @desc 13.05 -- The solution SHALL accept answers Yes, No or Unsure for the second gating question. 
        * @memberof requirementGroup_13 
      */
      _05: (gatingQuestionOneAwns, gatingQuestionTwoAwns, gatingQuestionThreeAwns) => {
        // Click the awnsers chosen by the user for each of the gating questions.
        gatingQuestionOneAwns === 'Yes'
          ? form.populate([form.Field(form.CLICK, submission.immunizations.questionOne.yes)])
          : form.populate([form.Field(form.CLICK, submission.immunizations.questionOne.no)]);

        gatingQuestionTwoAwns === 'Yes'
          ? form.populate([form.Field(form.CLICK, submission.immunizations.questionTwo.yes)])
          : form.populate([form.Field(form.CLICK, submission.immunizations.questionTwo.no)]);

        gatingQuestionThreeAwns === 'Yes'
          ? form.populate([form.Field(form.CLICK, submission.immunizations.questionThree.yes)]) 
          : form.populate([form.Field(form.CLICK, submission.immunizations.questionThree.no)])  
      }
    };
    return _13;
  }
}());
