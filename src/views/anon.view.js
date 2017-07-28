/* @ngInject */
function anon$ctrl (
  $window, $translate,
  SessionHandler, TokenHandler
) {
  this.$onInit = () => {
    TokenHandler.refreshTransactionToken()
    .then(SessionHandler.extendTransactionTime)

    $window.onbeforeunload = function (event) {
      let confirmationMessage = $translate.instant('leave_page.LEAVE_PAGE_CONFIRMATION');
      (event || $window.event).returnValue = confirmationMessage // IE
      return confirmationMessage
    }
  }
}

export default {
  name: 'anon',
  view: {
    controller: anon$ctrl,
    template: `
      <ui-view>
        <welcome-aup route="anon"></welcome-aup>
      </ui-view>
    `
  }
}
