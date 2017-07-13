/* @ngInject */
function noHealthCardModal$ctrl ($state, Multitenancy) {
  this.$onInit = () => {
    Multitenancy.getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets })
  }

  this.ok = (modalData) => {
    this.$close({
      result: modalData
    })
  }

  this.returnHome = (modalData) => {
    this.$close({
      result: modalData
    })
    $state.go('welcome')
  }
}

export default {
  name: 'noHealthCardModal',
  component: {
    bindings: {
      $close: '&'
    },
    controller: noHealthCardModal$ctrl,
    templateUrl: './components/form/noHealthCardModal/noHealthCardModal.template.html'
  }
}
