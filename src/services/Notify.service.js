/* @ngInject */
function Notify (ICON_NOTIFICATION) {
/* Private ********************************************************************/

  let notificationBus = {}

  const NOTIFICATION_VALUES = Object.keys(ICON_NOTIFICATION)
                           .map(key => ICON_NOTIFICATION[key])

  function doesNotificationExist (notification) {
    return NOTIFICATION_VALUES.indexOf(notification) >= 0
  }

/* Public *********************************************************************/

  /** Publishes a notification to all registered subscribers. */
  function publish (notification) {
    if (!doesNotificationExist(notification)) {
      throw new Error(`Notification "ICON_NOTIFICATION.${notification}" does not exist!`)
    }

    notificationBus[notification]
    .forEach((subscriber) => { subscriber(notification) })
  }

  /** Adds a subscriber function to the list of callbacks callod when a notification is published. */
  function subscribe (notification, subscriber) {
    if (!doesNotificationExist(notification)) {
      throw new Error(`Notification "ICON_NOTIFICATION.${notification}" does not exist!`)
    }

    if (!notificationBus[notification]) notificationBus[notification] = []
    notificationBus[notification].push(subscriber)
  }

  /** Removes a subscriber function to the list of callbacks callod when a notification is published. */
  function unsubscribe (notification, subscriber) {
    if (!doesNotificationExist(notification)) {
      throw new Error(`Notification "ICON_NOTIFICATION.${notification}" does not exist!`)
    }

    if (notificationBus[notification]) {
      let subscriberIndex = eventBus[notification].indexOf(subscriber)

      if (subscriberIndex >= 0) {
        notificationBus[notification].splice(subscriberIndex, 1)
      }
    }
  }

/* Interface ******************************************************************/

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish
  }
}

export default {
  name: 'Notify',
  service: Notify
}
