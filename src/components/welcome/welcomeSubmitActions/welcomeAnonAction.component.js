/* @ngInject */
function welcomeAnonChoice$ctrl ($state, $uibModal, Notify, ICON_NOTIFICATION) {
  this.$onInit = () => {
    /* Func declaration */
    this.goToAnonSubmission = goToAnonSubmission
    this.openHelpModal = () => Notify.publish(ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID)
  }

  function goToAnonSubmission () {
    console.log('ANON SUBMISSION')
    // TODO: Go to anon submission with routing params
  }
}

export default {
  name: 'welcomeAnonAction',
  component: {
    templateUrl: './components/welcome/welcomeSubmitActions/welcomeAnonAction.template.html',
    bindings: {},
    controller: welcomeAnonChoice$ctrl
  }
}
