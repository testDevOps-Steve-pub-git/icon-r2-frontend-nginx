authConfirmationController.$inject = ['GatingQuestionService', 'EditReviewService'];
function authConfirmationController (GatingQuestionService, EditReviewService) {
  this.$onInit = ()=> {
    GatingQuestionService.reset();
    EditReviewService.setFromReviewPage(false);
  }
}

module.exports = {
  bindings: { data: '@' },
  controller: authConfirmationController,
  template: `
    <confirmation-message></confirmation-message>
    <hr />
    <survey></survey>
    <hr />
    <submit-another></submit-another>
  `
};
