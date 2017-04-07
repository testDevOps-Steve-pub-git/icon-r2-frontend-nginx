(function () {
  'use strict';

  anonController.$inject = ['TokenHandler', '$window', '$translate'];
  function anonController (TokenHandler, $window, $translate) {
    this.$onInit = () => {
      /** Get transaction token */
      TokenHandler.getTransactionToken();

      /** Tab Close */
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
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
              <welcome-aup route="anon"></welcome-aup>
            </div>
          </div>
        </ui-view>
      </main>
    `
  };
}());