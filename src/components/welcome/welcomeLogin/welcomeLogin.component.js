/**
 * Created on 2017-01-31.
 * Component for login on welcome screen (User uses OIID and PIN)
 */
(function() {
'use strict';

  module.exports = {
    controller: welcomeLoginController,
    templateUrl: './components/welcome/welcomeLogin/welcomeLogin.template.html',
  };

  welcomeLoginController.$inject = ['$uibModal'];
  function welcomeLoginController ($uibModal) {

    /**
     * On component initialization
     */
    this.$onInit = () => {
      /** Function Declarations */
      this.openHelpModal = openHelpModal;
      // this.toggleAnimation = toggleAnimation;
    };

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

    /**
     * Animation toggle for hiding and displaying modal window
     */
    // function toggleAnimation() {
    //   this.animationsEnabled = !this.animationsEnabled;
    // }
  }
})();
