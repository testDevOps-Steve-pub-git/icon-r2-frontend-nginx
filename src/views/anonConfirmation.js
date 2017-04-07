anonConfirmationController.$inject = ['GatingQuestionService'];
function anonConfirmationController (GatingQuestionService) {
  this.$onInit = ()=> {
    GatingQuestionService.reset();
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
