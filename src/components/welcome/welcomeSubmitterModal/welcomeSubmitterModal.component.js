/**
 * Created on 2017-02-01.
 * Component for modal window that user selects who they are submitting for
 */
(function(){
'use strict';

  module.exports = {
    bindings: {
      $close:     '&',
      modalData:  '<'
    },
    templateUrl: './components/welcome/welcomeSubmitterModal/welcomeSubmitterModal.template.html',
    controller: welcomeModalController,
  };

  welcomeModalController.$inject = ['ImmunizationRecordService', '$state'];
  function welcomeModalController (ImmunizationRecordService, $state) {
    this.$onInit = () => {
      this.submitter = ImmunizationRecordService.getSubmitter();

      this.pickSubmitter = (relationshipCode) => {
        this.submitter.relationshipToPatient = relationshipCode;
        ImmunizationRecordService.setSubmitter(this.submitter);

        this.$close({ result: relationshipCode });

        let path = this.modalData.path;
        $state.transitionTo(path);
      };
    }

    // NOTE: 'ONESELF', and 'GUARD' are required values for FHIR message, do not change.
    this.relationshipCode = {
      MYSELF:     'ONESELF',
      DEPENDENT:  'GUARD',
    };
  }

})();
