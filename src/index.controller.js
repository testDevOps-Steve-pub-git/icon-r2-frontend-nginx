(function () {
'use strict';

  angular
    .module('app', [])
    .controller('indexController', indexController);

  /* @ngInject */
  function indexController (
      $scope, $timeout, $transitions, $state, $window,
      $translate, $uibModal,
      BrowserChecker, SessionHandler,
      AccessControl, Utility
    ) {

    $scope.isBrowserSupported = BrowserChecker.isBrowserSupported();

    $transitions.onSuccess({}, () => {
      //Set page title to include PHU name
      Utility.updateTitle()
      // Scroll to the top of the page on page load.
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      // Ensure the "Skip To Content" buttun is the first element to be tabbed to on the page.
      let prefocus = document.getElementById('prefocus')
      if (prefocus) prefocus.focus()
    });

    $transitions.onBefore({}, (transition) => {
      if (!AccessControl.execute(transition.to(), transition.from()))
        $state.go('welcome')
    })

    /** ** Browser back Warnings *****/
    /* Any going back to welcome page */
    $transitions.onBefore(
      {
        from: [
          'anon.self.**',
          'anon.other.**',
          'auth.self.**',
          'auth.other.**'
        ],
        to: 'welcome'
      },
      (transition) => {
        // Early return true to stop triggering of redundant modal.
        if (SessionHandler.isSessionNotificationExpired()) {
          return true;
        }

        switch (transition.from().name) {
          // All cases where confirmation modal is not require fall through to positive return.
          case 'anon.self.submission.confirmation':
          case 'anon.other.submission.confirmation':
          case 'auth.self.submission.confirmation':
          case 'auth.other.submission.confirmation':
          case 'auth.self.patient':
          case 'auth.other.patient':
            return true;

          default:
            return transition = $uibModal.open({
              template: `<return-home-modal $close="$close(result)"></return-home-modal>`,
              controller: () => {},
              size: 'sm',
              keyboard: false,
              backdrop: 'static'
            })
            .result
            .catch((error) => {});
          }
      }
    )

    /* From the welcome page to the confirmation page */
    $transitions.onBefore(
      {
        from: 'welcome',
        to: [
          'anon.self.submission.**',
          'anon.other.submission.**',
          'auth.self.submission.**',
          'auth.other.submission.**'
        ]
      },
      (transition) => $state.go($state.$current, null, { reload: true })
    )

    /* Anon submissions, display warning */
    $transitions.onBefore(
      {
        from : [
          'anon.self.submission.patient',
          'anon.other.submission.patient',
        ],
        to: 'anon'
      },
      (transition) => transition.router.stateService.target('welcome')
    )

    /* Confirmation Screen, when user presses back take them to welcome screen */
    $transitions.onBefore(
      {
        from: [
          'anon.self.submission.confirmation',
          'anon.other.submission.confirmation',
          'auth.self.submission.confirmation',
          'auth.other.submission.confirmation'
        ],
        to: [
          'anon.self.submission.review',
          'anon.other.submission.review',
          'auth.self.submission.review',
          'auth.other.submission.review'
        ]
      },
      (transition) => {
        $state.transitionTo('welcome');
      }
    )
  }
})();
