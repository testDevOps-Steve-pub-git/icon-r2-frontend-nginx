/* @ngInject */
function anonConfirmation$ctrl (GatingQuestionService, EditReviewService) {
  this.$onInit = ()=> {
    GatingQuestionService.reset();
    EditReviewService.setFromReviewPage(false);
  }
}

export default {
  name: 'anonConfirmation',
  view : {
    bindings: { data: '@' },
    controller: anonConfirmation$ctrl,
    template: `
      <confirmation-message></confirmation-message>
      <hr />
      <survey></survey>
      <hr />
      <submit-another></submit-another>
    `
  }
}
