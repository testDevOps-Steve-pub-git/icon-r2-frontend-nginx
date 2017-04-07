/**
 * Component for AUP (Acceptable use policy)
 */
(function() {
'use strict';

  module.exports = {
    bindings: {
      route: '@',
    },
    templateUrl: './components/welcome/welcomeAUP/welcomeAUP.template.html',
    controller: welcomeAUPController,
  };

  welcomeAUPController.$inject = ['$scope', '$state', 'ImmunizationRecordService', 'Multitenancy', '$translate', '$timeout'];
  function welcomeAUPController ($scope, $state, ImmunizationRecordService, Multitenancy, $translate, $timeout) {

     /**
     * On component initialization
     */
      Multitenancy.getPhuKeys()
                  .then((phuAssets) => { 
                     $scope.multitenancy = phuAssets; 
                  });
      /** Function Declarations */
      this.acceptLegalAgreement = acceptLegalAgreement;
      this.doNotAccept = doNotAccept;
      this.scrollToTop = scrollToTop;
      this.language = $translate.use().toLowerCase();

    //Scroll to top of page
      this.scrollToTop();
    /**
     * Action if user does not accept legal agreement
     */
    function doNotAccept () { $state.go('welcome'); }

    /**
     * Scrolls to top of page, on page load
     */
    function scrollToTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }


    /**
     * If user accepts legal agreement, route to either other or self route, depending on what submitter was selected
     * Also routes user on the auth, or anon route depending on their previous button click
     */
    function acceptLegalAgreement () {
      this.submitter = ImmunizationRecordService.getSubmitter();
      if(this.submitter.relationshipToPatient === 'GUARD') {
        if(this.route === 'auth')
          $state.go('auth.other.login');
        else
          $state.go('anon.other.submission.patient');
      }
      else if(this.submitter.relationshipToPatient === 'ONESELF') {
        if(this.route === 'auth')
          $state.go('auth.self.login');
        else
          $state.go('anon.self.submission.patient');
      }
      else {
        //If user has not selected who they are submitting for, go back to welcome page
        $state.go('welcome')
      }
    }
  }
})();
