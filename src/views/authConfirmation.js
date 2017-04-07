authConfirmationController.$inject = ['GatingQuestionService'];
function authConfirmationController (GatingQuestionService) {
  this.$onInit = ()=> {
    GatingQuestionService.reset();
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
