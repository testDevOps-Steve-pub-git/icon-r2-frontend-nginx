anonController.$inject = [
  '$window', '$translate',
  'SessionHandler', 'TokenHandler'
];
function anonController (
  $window, $translate,
  SessionHandler, TokenHandler
) {
  this.$onInit = () => {
    TokenHandler.refreshTransactionToken()
    .then(SessionHandler.extendTransactionTime);

    $window.onbeforeunload = function (event) {
      let confirmationMessage = $translate.instant('leave_page.LEAVE_PAGE_CONFIRMATION');
      (event || $window.event).returnValue = confirmationMessage; // IE
      return confirmationMessage;
    };
  };
}

module.exports = {
  controller: anonController,
  template: `
    <main>
      <ui-view>
        <welcome-aup route="anon"></welcome-aup>
      </ui-view>
    </main>
  `
};
