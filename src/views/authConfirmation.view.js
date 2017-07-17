/* @ngInject */
function authConfirmation$ctrl (GatingQuestionService, EditReviewService) {
  this.$onInit = () => {
    GatingQuestionService.reset()
    EditReviewService.setFromReviewPage(false)
  }
}

export default {
  name: 'authConfirmation',
  view: {
    bindings: { data: '@' },
    controller: authConfirmation$ctrl,
    template: `
      <confirmation-message></confirmation-message>
      <hr />
      <survey></survey>
      <hr />
      <submit-another></submit-another>
    `
  }
}
