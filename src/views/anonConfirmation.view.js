anonConfirmationController.$inject = ['GatingQuestionService', 'EditReviewService'];
function anonConfirmationController (GatingQuestionService, EditReviewService) {
  this.$onInit = ()=> {
    GatingQuestionService.reset();
    EditReviewService.setFromReviewPage(false);
  }
}

module.exports = {
  bindings: { data: '@' },
  controller: anonConfirmationController,
  template: `

    <confirmation-message></confirmation-message>
    <hr />
    <survey></survey>
    <hr />
    <submit-another></submit-another>
  `
};
