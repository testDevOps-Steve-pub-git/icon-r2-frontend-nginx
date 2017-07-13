/* @ngInject */
function sessionExpiredNotification$ctrl (
  $interval, $state,
  GatingQuestionService, ImmunizationRecordService, Notify, SessionHandler, TokenHandler,
  ICON_NOTIFICATION
) {
  this.$onInit = () => { this.close = this.resolve.close }
}

export default {
  name: 'sessionExpiredNotification',
  component: {
    controller: sessionExpiredNotification$ctrl,
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
  }
}
