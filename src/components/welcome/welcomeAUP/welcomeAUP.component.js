/* @ngInject */
function welcomeAUPController$ctrl (
  $scope,
  $state,
  $stateParams,
  ImmunizationRecordService,
  Multitenancy,
  $translate
) {

  /**
   * On component initialization
   */
  this.$onInit = () => {

    Multitenancy.getPhuKeys()
      .then((phuAssets) => {
        $scope.multitenancy = phuAssets;
      });

    this.acceptLegalAgreement = acceptLegalAgreement;
    this.doNotAccept = doNotAccept;
    this.scrollToTop = scrollToTop;
    this.language = $translate.use().toLowerCase();

    // Scroll to top of page
    this.scrollToTop();
  }


  /** Action if user does not accept legal agreement. */
  function doNotAccept () {
    $state.go('welcome');
  }

  /** Scrolls to top of page, on page load. */
  function scrollToTop () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


  /**
   * Routes to either verification if user is viewing immunizations, or submission for auth/anon submissions
   */
  function acceptLegalAgreement () {
    switch ($stateParams.action) {
      case 'SUBMISSION':
        $state.go('submission', {action: $stateParams.action}) // No action required here, submission specific route chosen.
        break

      case 'RETRIEVAL':
        $state.go('verification', {action: $stateParams.action})
        break

      default:
        console.error(`
          Action parameter "${$stateParams.action}" is not permitted!
          Re-routing to "welcome"...
        `)
        $state.go('welcome')
        break
    }
  }
}


export default {

  name: 'welcomeAup',
  component: {
    templateUrl: './components/welcome/welcomeAUP/welcomeAUP.template.html',
    controller: welcomeAUPController$ctrl,
  }
}
