(function () {
'use strict';

  module.exports = {
    controller: notificationController,
    template: `
      <!-- Notification modals popped using UIB modal API programatically. -->
      <toaster-container></toaster-container>
    `,
  };

  notificationController.$inject = [
    '$timeout', '$translate',
    '$uibModal', 'toaster',
    'Notify',
    'ICON_NOTIFICATION', 'ToasterChoiceService'
  ];
  function notificationController (
    $timeout, $translate,
    $uibModal, toaster,
    Notify,
    ICON_NOTIFICATION, ToasterChoiceService
  ) {
    // Each notification constant is categorized by the way it is presented to the user.

    // Modal - open and close are done programatically, user must wait.
    const pushStaticProgressNotifications = [
      ICON_NOTIFICATION.PUSH_SUBMISSION_PROGRESS,
      ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS,
      ICON_NOTIFICATION.PUSH_YELLOW_CARD_PDF_PROGRESS,
      ICON_NOTIFICATION.PUSH_CONFIRMATION_PDF_PROGRESS,
    ];
    const popStaticProgressNotifications = [
      ICON_NOTIFICATION.POP_SUBMISSION_PROGRESS,
      ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS,
      ICON_NOTIFICATION.POP_YELLOW_CARD_PDF_PROGRESS,
      ICON_NOTIFICATION.POP_CONFIRMATION_PDF_PROGRESS,
    ];

    // Modal - open is programatic, close results from user action.
    // NOTE: currently only used for session inactivity timeout warning.
    const pushActionableInfoNotifications = [
      ICON_NOTIFICATION.PUSH_TRANSACTION_TOKEN_TIMEOUT
    ];
    const popActionableInfoNotifications = [
      ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT
    ];

    // Toaster - open is programatic, close results from user action.
    const dismissableInfoNotifications = [
      ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED,
      ICON_NOTIFICATION.INFO_SESSION_EXPIRED,
    ];

    // Toaster - open is programatic, close results from user action.
    const dismissableErrorNotifications = [
      ICON_NOTIFICATION.WARN_DOCUMENT_FILE_BAD_TYPE,
      ICON_NOTIFICATION.WARN_DOCUMENT_FILE_TOO_LARGE,
      ICON_NOTIFICATION.WARN_DOCUMENT_FILE_DUPLICATE,
      ICON_NOTIFICATION.WARN_DOCUMENT_FILE_QUEUE_LIMIT,

      ICON_NOTIFICATION.WARN_RETRIEVAL_CONSENT_BLOCK,
      ICON_NOTIFICATION.WARN_RETRIEVAL_BAD_OIID,
      ICON_NOTIFICATION.WARN_RETRIEVAL_BAD_PIN,
      ICON_NOTIFICATION.WARN_RETRIEVAL_NETWORK_PROBLEM,
      ICON_NOTIFICATION.WARN_RETRIEVAL_UNKNOWN,

      ICON_NOTIFICATION.WARN_SUBMISSION_INVALID_FHIR,
      ICON_NOTIFICATION.WARN_SUBMISSION_NETWORK_PROBLEM,
      ICON_NOTIFICATION.WARN_SUBMISSION_UNKNOWN,

      ICON_NOTIFICATION.WARN_GENERAL_NETWORK_PROBLEM,
    ];


    // Opens a modal when push event fired, closes it when pop is fired.
    let staticProgressNotificationModal = null;
    let openStaticProgressNotification = (notification) => {
      if (staticProgressNotificationModal) closeStaticProgressNotification(notification);
      staticProgressNotificationModal = $uibModal.open({
        component: 'staticProgressNotification',
        resolve: {
          titleTextKey: () => `notification.${notification}.TITLE`,
          bodyTextKey:  () => `notification.${notification}.BODY`,
        },
        backdrop: 'static',
      });
    };
    let closeStaticProgressNotification = (notification) => {
      if (staticProgressNotificationModal) staticProgressNotificationModal.close();
      staticProgressNotificationModal = null;
    };

    // Opens modal on push event, closes when pop event is fired, or takes action.
    let actionableInfoNotificationModal = null;
    let openActionableInfoNotification = (notification) => {
      if (actionableInfoNotificationModal) closeActionableInfoNotification(notification);
      actionableInfoNotificationModal = $uibModal.open({
        component: 'actionableInfoNotification',
        resolve: {
          titleTextKey: () => `notification.${notification}.TITLE`,
          bodyTextKey:  () => `notification.${notification}.BODY`,
        },
        backdrop: 'static',
      });
    };
    let closeActionableInfoNotification = (notification) => {
      if (actionableInfoNotificationModal) actionableInfoNotificationModal.close();
      actionableInfoNotificationModal = null;
    };

    // Opens toaster on push event, closes when pop event is fired, or takes action.
    // NOTE: Toaster "pop" is fired on notification event "push", not "pop", awkward.
    let dismissableInfoNotification = null;
    let openDismissableInfoNotification = (notification) => {
      dismissableInfoNotification = toaster.pop({
        type:           'info',
        title:          $translate.instant(`notification.${notification}.TITLE`),
        body:           $translate.instant(`notification.${notification}.BODY`),
        bodyOutputType: 'trustedHtml',
        timeout:        2 * 1000,
      });
    };

    // Opens toaster on push event, closes when pop event is fired, or takes action.
    // NOTE: Toaster "pop" is fired on notification event "push", not "pop", awkward.
    let dismissableErrorNotification = null;
    let openDismissableErrorNotification = (notification) => {
      dismissableErrorNotification = toaster.pop({
        type:           'error',
        title:          $translate.instant(`notification.${notification}.TITLE`),
        body:           $translate.instant(`notification.${notification}.BODY`),
        bodyOutputType: 'trustedHtml',
        timeout:        2 * 1000,
      });
    };

    this.$onInit = () => {
      // Associate each notification action with its notification type.

      pushStaticProgressNotifications.forEach((notification) => {
        Notify.subscribe(notification, openStaticProgressNotification);
      });

      popStaticProgressNotifications.forEach((notification) => {
        Notify.subscribe(notification, closeStaticProgressNotification);
      });

      pushActionableInfoNotifications.forEach((notification) => {
        Notify.subscribe(notification, openActionableInfoNotification);
      });

      popActionableInfoNotifications.forEach((notification) => {
        Notify.subscribe(notification, closeActionableInfoNotification);
      });

      dismissableInfoNotifications.forEach((notification) => {
        Notify.subscribe(notification, openDismissableInfoNotification);
      });

      dismissableErrorNotifications.forEach((notification) => {
        Notify.subscribe(notification, openDismissableErrorNotification);
      });
    };

    this.$onDestroy = () => {
      // Disassociate each notification action with its notification type.

      pushStaticProgressNotifications.forEach((notification) => {
        Notify.unsubscribe(notification, openStaticProgressNotification);
      });

      popStaticProgressNotifications.forEach((notification) => {
        Notify.unsubscribe(notification, closeStaticProgressNotification);
      });

      pushActionableInfoNotifications.forEach((notification) => {
        Notify.unsubscribe(notification, openActionableInfoNotification);
      });

      popActionableInfoNotifications.forEach((notification) => {
        Notify.unsubscribe(notification, closeActionableInfoNotification);
      });

      dismissableInfoNotifications.forEach((notification) => {
        Notify.unsubscribe(notification, openDismissableInfoNotification);
      });

      dismissableErrorNotifications.forEach((notification) => {
        Notify.unsubscribe(notification, openDismissableErrorNotification);
      });
    };
  }

}());
