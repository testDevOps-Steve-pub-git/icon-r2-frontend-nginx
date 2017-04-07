(function(){
'use strict';

  module.exports = {
    bindings: { 
      $close: '&',
      modalData: '<',
    },
    controller: editImmunizationController,
    templateUrl: './components/immunization/editImmunization/editImmunization.template.html'
  };

  editImmunizationController.$inject = ['Immunization', 'moment', 'ImmunizationRecordService'];
  function editImmunizationController (Immunization, moment, ImmunizationRecordService) {
    this.$onInit = () => {
      this.immunization = this.modalData.immunization.clone();
      this.minDate = ImmunizationRecordService.getPatient().dateOfBirth;

      this.save = (immunization) => {
        immunization.date = moment(immunization.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        Object.assign(this.modalData.immunization, immunization);
        this.modalData.save(this.immunization);
        this.$close();
      };

      this.patient = this.modalData.patient;
    };
  }
}());
