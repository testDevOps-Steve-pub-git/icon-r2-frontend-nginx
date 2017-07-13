/* @ngInject */
function phuHeader$ctrl ($state, Multitenancy) {
  this.$onInit = () => {
    Multitenancy.getPhuKeys()
    .then((phuAssets) => { this.multitenancy = phuAssets })

    this.isCurrentStateWelcome = () => { return $state.includes('welcome') }
  }
};

export default {
  name: 'phuHeader',
  component: {
    bindings: {
      baseState: '@',
      progressStates: '<'
    },
    templateUrl: './components/index/phuHeader/phuHeader/phuHeader.template.html',
    controller: phuHeader$ctrl
  }
}
