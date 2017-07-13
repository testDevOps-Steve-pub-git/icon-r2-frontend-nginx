/* @ngInject */
function diseasesDisplay$ctrl () {}

export default {
  name: 'diseasesDisplay',
  component: {
    bindings: { diseases: '=' },
    controller: diseasesDisplay$ctrl,
    templateUrl: './components/immunization/diseasesDisplay/diseasesDisplay.template.html'
  }
}
