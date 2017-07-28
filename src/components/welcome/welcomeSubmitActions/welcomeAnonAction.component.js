/* @ngInject */
function welcomeAnonChoice$ctrl (Notify, ICON_NOTIFICATION) {
  this.$onInit = () => {
    /* Func declaration */
    this.openHelpModal = () => Notify.publish(ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID)
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
