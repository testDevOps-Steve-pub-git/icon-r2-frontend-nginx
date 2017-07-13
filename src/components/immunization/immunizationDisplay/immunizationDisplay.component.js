/* @ngInject */
function immunizationDisplay$ctrl () {
  this.$onInit = () => {}
}

export default {
  name: 'immunizationDisplay',
  component: {
    bindings: { immunization: '=' },
    controller: immunizationDisplay$ctrl,
    templateUrl: './components/immunization/immunizationDisplay/immunizationDisplay.template.html'
  }
}
