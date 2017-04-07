(function () {
'use strict';

  module.exports = {
    controller: immunizationInputController,
    templateUrl: './components/immunization/immunizationInput/immunizationInput.template.html'
  };

  immunizationInputController.$inject = ['$state', '$uibModal', 'Immunization', 'ImmunizationRecordService'];
  function immunizationInputController ($state, $uibModal, Immunization, ImmunizationRecordService) {
    this.$onInit = () => {
      this.noImmunizations = false; //Flag to display error message

      this.IMMUNIZATION_DISLAY_MODE = {
        DATE: 1,
        AGENT: 2,
      };
      this.patient = ImmunizationRecordService.getPatient();
      this.immunizationDisplayMode = this.IMMUNIZATION_DISLAY_MODE.DATE;
      this.immunizations = ImmunizationRecordService.getNewImmunizations();

      this.addImmunization = (immunization) => {
                                  this.immunizations.push(immunization.clone());
                                  ImmunizationRecordService.setNewImmunizations(this.immunizations);
                                  this.immunizations = ImmunizationRecordService.getNewImmunizations();
                                  this.noImmunizations = false;
                                };

      this.removeImmunization = (immunization) => {
                                  let index = this.immunizations.indexOf(immunization);
                                  if (index >= 0) this.immunizations.splice(index, 1);
                                  ImmunizationRecordService.setNewImmunizations(this.immunizations);
                                  this.immunizations = ImmunizationRecordService.getNewImmunizations();
                                };

      this.validateImmunizations = () => {
        if (this.immunizations.length > 0) {
          ImmunizationRecordService.setNewImmunizations(this.immunizations);
          this.noImmunizations = false;
        }
        else {
          this.noImmunizations = true;
        }

        return (this.immunizations.length > 0);
      };

      this.openImmunizationModal = (immunization, save) => {
        $uibModal.open({
          template: `<edit-immunization modal-data="$ctrl.modalData" 
                    $close="$close(result)"></edit-immunization>`,
          controller: ['modalData', function(modalData) {
            let ctrl = this;
            ctrl.modalData = modalData;
          }],
          controllerAs: '$ctrl',
          backdrop: 'static',
          resolve: {
            modalData: {
              save: save,
              immunization: immunization,
              patient: this.patient,
            },
          }
        }).result
          .then(() => {}, (reason) => {
            console.info(`Reason for dismissal is: ${reason}`);
          });
      };
    };
  }
}());
