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

/* @ngInject */
function immunizationGating$ctrl (Multitenancy, GatingQuestionService, ImmunizationRecordService, $translate) {
  this.$onInit = () => {
    /** If user has already entered new immunizations, display them */
    let currentImmunizations = ImmunizationRecordService.getNewImmunizations()
    if (currentImmunizations.length <= 0) {
      this.displayImmunizations = false
      GatingQuestionService.reset()
    } else { this.displayImmunizations = true }

    /* Translated values */
    this.yes = $translate.instant('immunizationGating.YES')
    this.no = $translate.instant('immunizationGating.NO')
    this.unsure = $translate.instant('immunizationGating.UNSURE')

    /* Gating question choices */
    this.gatingQuestion = GatingQuestionService.getGatingQuestion()
    this.gatingChoices = GatingQuestionService.getGatingChoices()
    this.question1Choice = this.gatingChoices.question1Choice
    this.question2Choice = this.gatingChoices.question2Choice
    this.question3Choice = this.gatingChoices.question3Choice
    this.question4Choice = this.gatingChoices.question4Choice;

    /* Gating collapse variables */
    (this.question1Choice === '') ? this.gating1Expand = true : this.gating1Expand = false;
    (this.question2Choice === '') ? this.gating2Expand = true : this.gating2Expand = false;
    (this.question3Choice === '') ? this.gating3Expand = true : this.gating3Expand = false;
    (this.question4Choice === '') ? this.gating4Expand = true : this.gating4Expand = false

    /* Set up Multitenancy */
    Multitenancy.getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets })

    /** Func init */
    this.gatingQuestionChange = gatingQuestionChange
    this.displayImmunizationInput = displayImmunizationInput
    this.toggleGatingCollapse = toggleGatingCollapse
  }

  /**
   * Display immunization input for user, set user choice for grouping
   */
  function displayImmunizationInput () {
    this.displayImmunizations = true

    this.gatingChoices.question4Choice = this.question4Choice
    this.toggleGatingCollapse(4)
    GatingQuestionService.setGatingChoices(this.gatingChoices)
  }

  /**
   * Sets the gating question based on the user feedback
   * @param question- Question to set the gating question to
   * @param displayGroupByChoice: set to true for no, or false for yes (Or last question) - to display group by gating question
   * @param gatingCollapse: which question to toggle gating collapse or expand
   */
  function gatingQuestionChange (question, displayGroupByChoice, gatingCollapse) {
    GatingQuestionService.setGatingQuestion(question)
    this.gatingQuestion = question
    this.toggleGatingCollapse(gatingCollapse)
    this.displayGroupByChoice = displayGroupByChoice
    this.gatingChoices = {
      question1Choice: this.question1Choice,
      question2Choice: this.question2Choice,
      question3Choice: this.question3Choice,
      question4Choice: this.question4Choice
    }
    GatingQuestionService.setGatingChoices(this.gatingChoices)
  }

  /**
   * Toggle gating collapse variables to expand and collapse gating questions
   * @param gatingQuestion: Gating question to collapse
   */
  function toggleGatingCollapse (gatingQuestion) {
    switch (gatingQuestion) {
      case 1:
        this.gating1Expand = !this.gating1Expand
        break
      case 2:
        this.gating2Expand = !this.gating2Expand
        break
      case 3:
        this.gating3Expand = !this.gating3Expand
        break
      case 4:
        this.gating4Expand = !this.gating4Expand
        break
      default:
        break
    }
  }
}

export default {
  name: 'immunizationGating',
  component: {
    templateUrl: './components/immunization/immunizationGating/immunizationGating.template.html',
    controller: immunizationGating$ctrl
  }
}
