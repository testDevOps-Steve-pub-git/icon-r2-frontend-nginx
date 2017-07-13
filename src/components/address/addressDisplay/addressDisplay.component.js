/**
 * Created on 2017-01-19.
 * Address display component
 */
/* @ngInject */
function addressDisplay$ctrl () {}

export default {
  name: 'addressDisplay',
  component: {
    bindings: {
      addressInfo: '<'
    },
    templateUrl: './components/address/addressDisplay/addressDisplay.template.html',
    controller: addressDisplay$ctrl
  }
}
