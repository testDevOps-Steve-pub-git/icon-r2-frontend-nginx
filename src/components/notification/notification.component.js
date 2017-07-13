/* @ngInject */
function notification$ctrl (
  $timeout, $translate,
  $uibModal,
  Notify, SessionHandler, TokenHandler,
  ICON_NOTIFICATION
) {
  // NOTE: Each notification constant is categorized by the way it is presented to the user.

  // Modal - open and close are done programatically, user must wait.
  const pushStaticProgressNotifications = [
    ICON_NOTIFICATION.PUSH_SUBMISSION_PROGRESS,
    ICON_NOTIFICATION.PUSH_RETRIEVAL_PROGRESS,
    ICON_NOTIFICATION.PUSH_YELLOW_CARD_PDF_PROGRESS,
    ICON_NOTIFICATION.PUSH_CONFIRMATION_PDF_PROGRESS
  ]
  const popStaticProgressNotifications = [
    ICON_NOTIFICATION.POP_SUBMISSION_PROGRESS,
    ICON_NOTIFICATION.POP_RETRIEVAL_PROGRESS,
    ICON_NOTIFICATION.POP_YELLOW_CARD_PDF_PROGRESS,
    ICON_NOTIFICATION.POP_CONFIRMATION_PDF_PROGRESS
  ]

  // Modal - open is programatic, close results from user action.
  const pushInactivityTimeoutNotifications = [
    ICON_NOTIFICATION.PUSH_TRANSACTION_TOKEN_TIMEOUT
  ]
  const popInactivityTimeoutNotifications = [
    ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT
  ]

  // Modal - open is programatic, close results from user action.
  const sessionExpiredNotifications = [
    ICON_NOTIFICATION.INFO_SESSION_EXPIRED
  ]

  // Modal - open is programatic, close results from user action.
  const dismissableInfoNotifications = [
    ICON_NOTIFICATION.INVALID_DATE_ERROR,
    ICON_NOTIFICATION.INFO_PIN_SET_SUCCESS,
    ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED,
    ICON_NOTIFICATION.INFO_OIID_HINT,
    ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID,
    ICON_NOTIFICATION.INFO_OIID_PIN_OUTDATED,
    ICON_NOTIFICATION.INFO_CALL_PHU_GENERIC,
    ICON_NOTIFICATION.INFO_OIID_RESOURCE_NOT_FOUND,

    ICON_NOTIFICATION.WARN_DOCUMENT_FILE_BAD_TYPE,
    ICON_NOTIFICATION.WARN_DOCUMENT_FILE_TOO_LARGE,
    ICON_NOTIFICATION.WARN_DOCUMENT_FILE_DUPLICATE,
    ICON_NOTIFICATION.WARN_DOCUMENT_FILE_QUEUE_LIMIT,

    ICON_NOTIFICATION.INFO_MISMATCH,
    ICON_NOTIFICATION.EMAIL_NOT_ON_FILE,
    ICON_NOTIFICATION.NO_EMAIL_ON_FILE,

    ICON_NOTIFICATION.WARN_RETRIEVAL_CONSENT_BLOCK,
    ICON_NOTIFICATION.WARN_RETRIEVAL_BAD_OIID,
    // ICON_NOTIFICATION.WARN_RETRIEVAL_BAD_PIN, /* NOTE: redundant, WARN_RETRIEVAL_BAD_OIID used in both cases. */
    ICON_NOTIFICATION.WARN_RETRIEVAL_NETWORK_PROBLEM,
    ICON_NOTIFICATION.WARN_RETRIEVAL_SECURITY_LOCK_OUT,
    ICON_NOTIFICATION.WARN_RETRIEVAL_TOO_MANY_FAILED_ATTEMPTS,
    ICON_NOTIFICATION.WARN_RETRIEVAL_UNKNOWN,

    ICON_NOTIFICATION.WARN_SUBMISSION_INVALID_FHIR,
    ICON_NOTIFICATION.WARN_SUBMISSION_NETWORK_PROBLEM,
    ICON_NOTIFICATION.WARN_SUBMISSION_UNKNOWN,

    ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT,
    ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS,

    ICON_NOTIFICATION.WARN_GENERAL_NETWORK_PROBLEM,
    ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR,
    ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR
  ]

  // Opens a modal when push event fired, closes it when pop is fired.
  let staticProgressNotificationModal = null
  let openStaticProgressNotification = (notification) => {
    if (staticProgressNotificationModal) closeStaticProgressNotification(notification)
    staticProgressNotificationModal = $uibModal.open({
      component: 'staticProgressNotification',
      resolve: {
        titleTextKey: () => `notification.${notification}.TITLE`,
        bodyTextKey: () => `notification.${notification}.BODY`
      },
      backdrop: 'static'
    })
  }
  let closeStaticProgressNotification = (notification) => {
    if (staticProgressNotificationModal) staticProgressNotificationModal.close()
    staticProgressNotificationModal = null
  }

  // Opens modal on push event, closes when pop event is fired, or takes action.
  let inactivityTimeoutInfoNotificationModal = null
  let openInactivityTimeoutInfoNotification = (notification) => {
    if (
         !sessionExpiredNotificationModal &&
      !inactivityTimeoutInfoNotificationModal
    ) {
      inactivityTimeoutInfoNotificationModal = $uibModal.open({
        component: 'inactivityTimeoutNotification',
        backdrop: 'static'
      })
    }
  }
  let closeInactivityTimeoutInfoNotification = (notification) => {
    if (inactivityTimeoutInfoNotificationModal) inactivityTimeoutInfoNotificationModal.close()
    inactivityTimeoutInfoNotificationModal = null
  }

  // Opens modal on push event, closes when pop event is fired, or takes action.
  let sessionExpiredNotificationModal = null
  let openSessionExpiredNotification = (notification) => {
    if (
         !sessionExpiredNotificationModal &&
      !inactivityTimeoutInfoNotificationModal
    ) {
      sessionExpiredNotificationModal = $uibModal.open({
        component: 'sessionExpiredNotification',
        resolve: { close: () => closeSessionExpiredNotification },
        backdrop: 'static'
      })
    }
  }
  let closeSessionExpiredNotification = (notification) => {
    TokenHandler.clearTransactionToken()
    .then(SessionHandler.expireSessionNotification)
    .then(TokenHandler.getSessionToken)
    .then(() => {
      if (sessionExpiredNotificationModal) sessionExpiredNotificationModal.close()
      sessionExpiredNotificationModal = null
    })
    .catch(() => {
      Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_NETWORK_PROBLEM)
    })
  }

  let dismissableInfoNotificationModal = null
  let openDismissableInfoNotification = (notification) => {
    let isNotificationTypeAlreadyOpen = (
         dismissableInfoNotificationModal &&
      dismissableInfoNotificationModal.notification === notification
    )

    if (!isNotificationTypeAlreadyOpen) {
      dismissableInfoNotificationModal = $uibModal.open({
        component: 'dismissableInfoNotification',
        resolve: {
          titleTextKey: () => `notification.${notification}.TITLE`,
          bodyTextKey: () => `notification.${notification}.BODY`,
          close: () => closeDismissableInfoNotification
        }
      })

      dismissableInfoNotificationModal.notification = notification
    }
    dismissableInfoNotificationModal.result.then(() => {}, closeDismissableInfoNotification)
  }
  let closeDismissableInfoNotification = () => {
    if (dismissableInfoNotificationModal) dismissableInfoNotificationModal.close()
    dismissableInfoNotificationModal = null
  }

  this.$onInit = () => {
    // Associate each notification action with its notification type.

    pushStaticProgressNotifications.forEach((notification) => {
      Notify.subscribe(notification, openStaticProgressNotification)
    })

    popStaticProgressNotifications.forEach((notification) => {
      Notify.subscribe(notification, closeStaticProgressNotification)
    })

    pushInactivityTimeoutNotifications.forEach((notification) => {
      Notify.subscribe(notification, openInactivityTimeoutInfoNotification)
    })

    popInactivityTimeoutNotifications.forEach((notification) => {
      Notify.subscribe(notification, closeInactivityTimeoutInfoNotification)
    })

    sessionExpiredNotifications.forEach((notification) => {
      Notify.subscribe(notification, openSessionExpiredNotification)
    })

    dismissableInfoNotifications.forEach((notification) => {
      Notify.subscribe(notification, openDismissableInfoNotification)
    })
  }

  this.$onDestroy = () => {
    // Disassociate each notification action with its notification type.

    pushStaticProgressNotifications.forEach((notification) => {
      Notify.unsubscribe(notification, openStaticProgressNotification)
    })

    popStaticProgressNotifications.forEach((notification) => {
      Notify.unsubscribe(notification, closeStaticProgressNotification)
    })

    pushInactivityTimeoutNotifications.forEach((notification) => {
      Notify.unsubscribe(notification, openInactivityTimeoutInfoNotification)
    })

    popInactivityTimeoutNotifications.forEach((notification) => {
      Notify.unsubscribe(notification, closeInactivityTimeoutInfoNotification)
    })

    sessionExpiredNotifications.forEach((notification) => {
      Notify.unsubscribe(notification, openSessionExpiredNotification)
    })

    dismissableInfoNotifications.forEach((notification) => {
      Notify.unsubscribe(notification, openDismissableInfoNotification)
    })
  }
}

export default {
  name: 'notification',
  component: {
    controller: notification$ctrl,
    template: ``
  }
}
