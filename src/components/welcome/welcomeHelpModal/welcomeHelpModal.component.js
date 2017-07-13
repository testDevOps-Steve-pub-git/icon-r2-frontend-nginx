/* @ngInject */
function welcomeHelpModalController$ctrl ($state, Multitenancy) {
  this.$onInit = () => {
    Multitenancy.getPhuKeys()
      .then((phuAssets) => { this.multitenancy = phuAssets })
  }
  this.ok = (modalData) => {
    this.$close({
      result: modalData
    })
  }
}

export default {
  name: 'welcomeHelpModal',
  component: {
    templateUrl: './components/welcome/welcomeHelpModal/welcomeHelpModal.template.html',
    bindings: {
      $close: '&'
    },
    controller: welcomeHelpModalController$ctrl
  }
}
