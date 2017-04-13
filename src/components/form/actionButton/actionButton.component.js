(function () {
'use strict';

  module.exports = {
    bindings: {
      buttonText: '@',
      buttonIcon: '@',
      buttonId: '@',
      path: '@',
    },
    templateUrl: './components/form/actionButton/actionButton.template.html',
    controller: actionButtonController,
  };

  actionButtonController.$inject = ['$uibModal', 'ImmunizationRecordService', '$timeout'];
  function actionButtonController ($uibModal, ImmunizationRecordService, $timeout)  {
    let submitterInfo = {};

    this.$onInit = () => {
      this.submitter = {value:'', path: ''};
      submitterInfo = ImmunizationRecordService.getSubmitter();
      this.userPath = {value:''};

      /** Function Declarations */
      this.openSubmitterModal = openSubmitterModal;
    };

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
            if(!!document.getElementById("welcome-divider"))
              document.getElementById("welcome-divider").focus();
          }, 100);
        }, (reason) => {
          console.info(`Reason for dismissal is: ${reason}`);
        });
    }
  }

}());
