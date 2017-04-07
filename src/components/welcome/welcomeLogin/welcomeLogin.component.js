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

  welcomeLoginController.$inject = ['$uibModal', 'ImmunizationRecordService', '$timeout'];
  function welcomeLoginController ($uibModal, ImmunizationRecordService, $timeout) {
    let submitterInfo = {};

    /**
     * On component initialization
     */
    this.$onInit = () => {
      /** Function Declarations */
      this.openHelpModal = openHelpModal;
      this.openSubmitterModal = openSubmitterModal;
      // this.toggleAnimation = toggleAnimation;

      /** Variable Declarations*/
      this.submitter = {value:'', path: ''};
      this.userPath = {value:''};
      submitterInfo = ImmunizationRecordService.getSubmitter();
      //this.animationsEnabled = true;
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
      });
    }

    /**
     * Opens submitter modal for user to select whom they are submitting for
     * @param path: auth for user entering OIID and pin, anon for user submitting anonymously
     */
    function openSubmitterModal(path) {
      this.submitter.path = path;
      $uibModal.open({
        template: `<welcome-modal modal-data="$ctrl.modalData" $close="$close(result)"></welcome-modal>`,
        controller: ['modalData', function(modalData) {
          let ctrl = this;
          ctrl.modalData = modalData;
          $timeout(function () {
            document.getElementById("role-myself-button").focus();
          }, 100);
        }],
        controllerAs: '$ctrl',
        backdrop  : 'static',
        resolve: {
          modalData: this.submitter
        },
        size: 'md',
      }).result
        .then( (submitter) => {
          this.submitter.value = submitter;
          submitterInfo.relationshipToPatient = this.submitter.value;
          //Set submitterInfo model to update relationshipToPatient
          ImmunizationRecordService.setSubmitter(submitterInfo);
          $timeout(function(){
            document.getElementById("welcome-divider").focus();
          }, 100);
        }, (reason) => {
          console.info(`Reason for dismissal is: ${reason}`);
        });
    }


    /**
     * Animation toggle for hiding and displaying modal window
     */
    // function toggleAnimation() {
    //   this.animationsEnabled = !this.animationsEnabled;
    // }
  }
})();
