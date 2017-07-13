/* @ngInject */
function tradeLotDisplay$ctrl () {}

export default {
  name: 'tradeLotDisplay',
  component: {
    bindings: { immunization: '<' },
    controller: tradeLotDisplay$ctrl,
    templateUrl: './components/immunization/tradeLotDisplay/tradeLotDisplay.template.html'
  }
}
