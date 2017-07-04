authController.$inject = [
  '$window', '$translate',
  'SessionHandler', 'TokenHandler'
];
function authController (
  $window, $translate,
  SessionHandler, TokenHandler
) {
  this.$onInit= () => {
    TokenHandler.refreshTransactionToken()
    .then(SessionHandler.extendTransactionTime);

    /** Tab Close */
    $window.onbeforeunload = function (event) {
      let confirmationMessage = $translate.instant('leave_page.LEAVE_PAGE_CONFIRMATION');
      (event || $window.event).returnValue = confirmationMessage; // IE
      return confirmationMessage;
    };
  }
}

module.exports = {
  bindings: { record: '<' },
  controller: authController,
  template: `
    <main>
      <ui-view>
        <welcome-aup route="auth"></welcome-aup>
      </ui-view>
    </main>
  `
};
