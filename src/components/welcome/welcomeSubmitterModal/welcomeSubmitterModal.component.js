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

  welcomeModalController.$inject = ['ImmunizationRecordService', '$state', 'MiscData'];
  function welcomeModalController (ImmunizationRecordService, $state, MiscData) {
    let skipAUP = false;
    this.$onInit = () => {
      this.submitter = ImmunizationRecordService.getSubmitter();
      skipAUP = MiscData.getSkipAUP();

      /**
       * User selects x button to close modal
       */
      this.close = (close)=>{
        this.$close({ result: close });
      };


      /**
       * User selects an option from the submitter modal
       * @param relationshipCode: Option  user has selected
       */
      this.pickSubmitter = (relationshipCode) => {
        this.submitter.relationshipToPatient = relationshipCode;
        ImmunizationRecordService.setSubmitter(this.submitter);

        this.$close({ result: relationshipCode });

        let path = this.modalData.path;

        /* If first submission display AUP*/
        if(!skipAUP)
        {
          $state.transitionTo(path);
        }
        /* Else route to appropriate page based on submitter and auth/anon*/
        else {
          if (path == 'auth') {
            if (relationshipCode == 'ONESELF') {
              $state.transitionTo('auth.self.login')
            } else {
              $state.transitionTo('auth.other.login');
            }
          }
          else {
            if (relationshipCode == 'ONESELF') {
              $state.transitionTo('anon.self.submission.patient')
            } else {
              $state.transitionTo('anon.other.submission.patient');
            }
          }
        }

      };
    }

    // NOTE: 'ONESELF', and 'GUARD' are required values for FHIR message, do not change.
    this.relationshipCode = {
      MYSELF:     'ONESELF',
      DEPENDENT:  'GUARD',
    };
  }

})();
