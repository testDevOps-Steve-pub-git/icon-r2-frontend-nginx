(function () {
'use strict';

  module.exports = {
    controller: sessionExpiredNotificationController,
    bindings: { resolve: '=' },
    template: `
      <div class="modal-header text-info">
        <h4 translate="notification.$infoSessionExpired.TITLE" translate-compile></h4>
      </div>

      <div class="modal-body">
        <p translate="notification.$infoSessionExpired.BODY" translate-compile></p>

        <div>
          <button class="btn btn-primary btn-block" ng-click="$ctrl.close()">{{'notification.$infoSessionExpired.CLOSE_BUTTON' | translate}}</button>
        </div>
      </div>
    `
  };

  sessionExpiredNotificationController.$inject = [
    '$interval', '$state',
    'GatingQuestionService', 'ImmunizationRecordService', 'Notify', 'SessionHandler', 'TokenHandler',
    'ICON_NOTIFICATION'
  ];
  function sessionExpiredNotificationController (
    $interval, $state,
    GatingQuestionService, ImmunizationRecordService, Notify, SessionHandler, TokenHandler,
    ICON_NOTIFICATION
  ) {
    this.$onInit = () => { this.close = this.resolve.close; };
  }

}());
