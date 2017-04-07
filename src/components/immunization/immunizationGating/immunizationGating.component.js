/**
 * Created on 2017-02-27.
 * Component for immunization gating questions, also acts as a container for immunization input
 * Gating Question Rules:
 * If you select Yes to the first question, Which is the PHU letter one-- The international Imms typeahead is displayed.
 * If you select no, it displays the second gating question, which is Did you get all your immunizations in Ontario
 * If you select Yes to this question, then the Ontario Imms typeahead (with the schedule) is displayed
 * If you select no, then the 3rd gating question is displayed which is Did you get all your immunizations in Canada?
 * If you select yes, then the canadian imms typeahead is displayed
 * If you select no, then the international is displayed
 *
 * Immunization Typeahead Rules
 *
 * The Ontario typeahead has the schedule, and Typical imms with a prevalence of 1-3
 * The canadian has Typical imms with pravlence of 1-4
 * International has no typical badge
 * */
(function () {
'use strict';

  module.exports = {
    templateUrl: './components/immunization/immunizationGating/immunizationGating.template.html',
    bindings: {},
    controller: immunizationGatingController
  };

  immunizationGatingController.$inject = ['Multitenancy', 'GatingQuestionService', 'ImmunizationRecordService'];
  function immunizationGatingController(Multitenancy, GatingQuestionService, ImmunizationRecordService) {

    this.$onInit = () => {
      let currentImmunizations = ImmunizationRecordService.getNewImmunizations();

      /** If user has already entered new immunizations, display them */
      if(currentImmunizations.length <= 0) {
        this.displayImmunizations = false;
      }
      else {
        this.displayImmunizations = true;
      }

      this.gatingQuestion = GatingQuestionService.getGatingQuestion();
      this.gatingChoices = GatingQuestionService.getGatingChoices();
      this.question1Choice = this.gatingChoices.question1Choice;
      this.question2Choice = this.gatingChoices.question2Choice;
      this.question3Choice = this.gatingChoices.question3Choice;

      Multitenancy.getPhuKeys()
        .then((phuAssets) => { this.multitenancy = phuAssets; });


      /** Func init */
      this.gatingQuestionChange = gatingQuestionChange;
    };


    /**
     * Sets the gating question based on the user feedback
     * @param question- Question to set the gating question to
     * @param displayImmunization: set to true for no, or false for yes (Or last question)
     */
    function gatingQuestionChange(question, displayImmunization) {
      GatingQuestionService.setGatingQuestion(question);
      this.gatingQuestion = question;
      this.displayImmunizations = displayImmunization;

      this.gatingChoices = {
        question1Choice: this.question1Choice,
        question2Choice: this.question2Choice,
        question3Choice: this.question3Choice
      };
      GatingQuestionService.setGatingChoices(this.gatingChoices);
    }

  }
})();
