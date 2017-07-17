/* @ngInject */
function SessionHandler (
  $interval, $state,
  Notify, TokenHandler,
  ICON_NOTIFICATION
) {
/* Private ********************************************************************/

  const POLL_TOKEN_EXPIRY_INTERVAL_SECONDS = 1
  const TOKEN_RENEWAL_NETWORK_LATENCY_SECONDS = 5

  let inactivitySeconds = {
    notificationStart: -1,
    notificationEnd: -1
  }

  /**
   * Checks the transaction token expiry, and publishes user notifications as necessary.
   */
  function checkInactivityExpiration () {
    if (!TokenHandler.inspectTransactionToken()) {
      // No token, do noting.
    } else if (
         currentTimeInSeconds() > inactivitySeconds.notificationStart &&
      currentTimeInSeconds() < inactivitySeconds.notificationEnd
    ) {
      Notify.publish(ICON_NOTIFICATION.PUSH_TRANSACTION_TOKEN_TIMEOUT)
    } else if (
        currentTimeInSeconds() > inactivitySeconds.notificationStart &&  // Redundant?
      currentTimeInSeconds() > inactivitySeconds.notificationEnd
    ) {
      $state.go('welcome')
      Notify.publish(ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT)
      Notify.publish(ICON_NOTIFICATION.INFO_SESSION_EXPIRED)
    }
  }

  // Start polling checks for inactivity window expiration.
  $interval(checkInactivityExpiration, POLL_TOKEN_EXPIRY_INTERVAL_SECONDS * 1000)

  function setTransactionTimeout (transactionToken) {
    if (
         transactionToken.decoded.exp &&
      transactionToken.decoded.inactivity &&
      transactionToken.decoded.responseTime
    ) {
     // Initialize timout values to count forward from time of renewal.
      inactivitySeconds.notificationStart = (
         currentTimeInSeconds() +
       transactionToken.decoded.inactivity -
       TOKEN_RENEWAL_NETWORK_LATENCY_SECONDS
     )
      inactivitySeconds.notificationEnd = (
         currentTimeInSeconds() +
       transactionToken.decoded.inactivity +
       transactionToken.decoded.responseTime -
       TOKEN_RENEWAL_NETWORK_LATENCY_SECONDS
     )

     // If the initialized values are beyond the permissible expiry,
      if (
          inactivitySeconds.notificationStart > transactionToken.decoded.exp ||
       inactivitySeconds.notificationEnd > transactionToken.decoded.exp
     ) {
       // Override normal timeout values to count backwards from expiration.
        inactivitySeconds.notificationStart = (
         transactionToken.decoded.exp -
         transactionToken.decoded.inactivity -
         transactionToken.decoded.responseTime -
         TOKEN_RENEWAL_NETWORK_LATENCY_SECONDS
       )
        inactivitySeconds.notificationEnd = (
           transactionToken.decoded.exp -
         transactionToken.decoded.responseTime -
         TOKEN_RENEWAL_NETWORK_LATENCY_SECONDS
       )
      }
    }
  }

  function currentTimeInSeconds () { return Math.ceil(Date.now() / 1000) }

/* Public *********************************************************************/

  function extendTransactionTime () {
    return TokenHandler.getTransactionToken()
           .then(setTransactionTimeout)
           .catch(() => {
              // Go to the welcome screen
             $state.go(`welcome`)
              // Then clear the notification.
             Notify.publish(ICON_NOTIFICATION.POP_TRANSACTION_TOKEN_TIMEOUT)
              // Notify that session expired due to timeout, patient data was cleared.
             Notify.publish(ICON_NOTIFICATION.INFO_SESSION_EXPIRED)
           })
  }

  /**
   * @returns true once the session notification expired, false beforehand
   */
  function isSessionNotificationExpired () {
    return (currentTimeInSeconds() >= inactivitySeconds.notificationEnd)
  }

  function expireSessionNotification () {
    inactivitySeconds.notificationStart = -1
    inactivitySeconds.notificationEnd = -1
  }

/* Interface ******************************************************************/

  return {
    extendTransactionTime: extendTransactionTime,
    isSessionNotificationExpired: isSessionNotificationExpired,
    expireSessionNotification: expireSessionNotification
  }
}

export default {
  name: 'SessionHandler',
  service: SessionHandler
}
