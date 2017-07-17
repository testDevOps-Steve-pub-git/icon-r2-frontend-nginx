/* @ngInject */
function auth$ctrl (
  $window, $translate,
  SessionHandler, TokenHandler
) {
  this.$onInit = () => {
    TokenHandler.refreshTransactionToken()
    .then(SessionHandler.extendTransactionTime)

    /** Tab Close */
    $window.onbeforeunload = function (event) {
      let confirmationMessage = $translate.instant('leave_page.LEAVE_PAGE_CONFIRMATION');
      (event || $window.event).returnValue = confirmationMessage // IE
      return confirmationMessage
    }
  }
}

export default {
  name: 'auth',
  view: {
    bindings: { record: '<' },
    controller: auth$ctrl,
    template: `
      <main>
        <ui-view>
          <welcome-aup route="auth"></welcome-aup>
        </ui-view>
      </main>
    `
  }
}
