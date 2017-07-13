/* @ngInject */
function inactivityTimeoutNotification$ctrl (
  $interval, $state,
  GatingQuestionService, ImmunizationRecordService, Notify, SessionHandler, TokenHandler,
  ICON_NOTIFICATION
) {
  this.$onInit = () => {
    this.extendTimeoutExtension = () => {
      // Extend the session / transaction token combo
      TokenHandler.refreshTransactionToken()
      .then(SessionHandler.extendTransactionTime)
      .then(() => {
        // Then clear the notification.
        Notify.publish(ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT)
      })
      .catch(() => {
        Notify.publish(ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT)
        Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_NETWORK_PROBLEM)
      })
    }

    this.declineTimeoutExtension = () => {
      // Clear the transaction token
      TokenHandler.clearTransactionToken()
      .then(SessionHandler.expireSessionNotification)
      .then(() => {
        // Go to the welcome screen
        $state.go(`welcome`)

        // Clear patient data.
        ImmunizationRecordService.clear()
        GatingQuestionService.reset()

        // Then clear the notification.
        Notify.publish(ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT)
        // Notify that session expired due to timeout, patient data was cleared.
        Notify.publish(ICON_NOTIFICATION.INFO_SESSION_EXPIRED)
      })
    }
  }
}

export default {
  name: 'inactivityTimeoutNotification',
  component: {
    controller: inactivityTimeoutNotification$ctrl,
    bindings: { resolve: '=' },
    template: `
      <div class="modal-header text-info">
        <h4 translate="notification.$pushTransactionTokenTimeout.TITLE" translate-compile></h4>
      </div>

      <div class="modal-body">
        <div translate="notification.$pushTransactionTokenTimeout.BODY" translate-compile></div>

        <div>
          <button class="btn btn-primary btn-block" ng-click="$ctrl.extendTimeoutExtension()">{{'notification.$pushTransactionTokenTimeout.EXTEND_BUTTON' | translate}}</button>
          <button class="btn btn-danger btn-block" ng-click="$ctrl.declineTimeoutExtension()">{{'notification.$pushTransactionTokenTimeout.DECLINE_BUTTON' | translate}}</button>
        </div>

        <div>
          <p class="small muted text-center" translate="notification.$pushTransactionTokenTimeout.BUTTON_AFTERTHOUGHT"></p>
        </div>
      </div>
    `
  }
}
