/* @ngInject */
function welcomeAnonChoice$ctrl ($state, $uibModal) {

  this.$onInit = ()=> {

    /*Func declaration*/
    this.goToAnonSubmission = goToAnonSubmission;
    this.openHelpModal = openHelpModal;
  };

  function goToAnonSubmission() {
    console.log("ANON SUBMISSION");
    //TODO: Go to anon submission with routing params
  }


  /**
   *  Opens modal window for information on OIID and PIN
   */
  function openHelpModal () {
    var modalInstance = $uibModal.open({
      animation: true,
      template: '<welcome-help-modal $close="$close(result)"></welcome-help-modal>',
      controller: () => {},
      size: 'md',
    }).result
      .catch((error)=>{});
  }
}


export default {
  name: 'welcomeAnonAction',
  component: {
    templateUrl: './components/welcome/welcomeSubmitActions/welcomeAnonAction.template.html',
    bindings: {},
    controller: welcomeAnonChoice$ctrl,
  }
}