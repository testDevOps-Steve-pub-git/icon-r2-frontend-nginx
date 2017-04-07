(function () {
'use strict';

  module.exports = {
    controller: actionableInfoNotificationController,
    template: `
      <div class="modal-header text-center text-info lead" translate="{{$ctrl.titleTextKey}}" translate-compile></div>

      <div class="modal-body text-center">
        <p translate="{{$ctrl.bodyTextKey}}" translate-compile></p>

        <button ng-click="$ctrl.acceptTimeoutExtension()">Extend time (HC)</button>

        <button ng-click="$ctrl.declineTimeoutExtension()">End my session (HC)</button>
      </div>
    `,
  };

  actionableInfoNotificationController.$inject = [
    '$state',
    'ImmunizationRecordService', 'Notify', 'TokenHandler',
    'ICON_NOTIFICATION'
  ];
  function actionableInfoNotificationController (
    $state,
    ImmunizationRecordService, Notify, TokenHandler,
    ICON_NOTIFICATION
  ) {
    this.$onInit = () => {
      this.titleTextKey = this.resolve.titleTextKey;
      this.bodyTextKey = this.resolve.bodyTextKey;

      this.acceptTimeoutExtension = () => {
        // Extend the session / transaction token combo
        TokenHandler.extendTransactionToken()
        .then(() => {
          // Then clear the notification.
          Notify.publish(ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT);
        });
      };

      this.declineTimeoutExtension = () => {
        // Clear the transaction token
        TokenHandler.clearTransactionToken()
        .then(() => {
          // Then hide the notification programatically.
          Notify.publish(ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT);

          // Clear patient data.
          ImmunizationRecordService.clear();
          GatingQuestionService.reset();

          // Go to the welcome screen
          $state.go(`welcome`);

          // Notify that session expired due to timeout, patient data was cleared.
          Notify.publish(ICON_NOTIFICATION.INFO_SESSION_EXPIRED);
          Notify.publish(ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED);
        });
      };
    }
  }

}());
