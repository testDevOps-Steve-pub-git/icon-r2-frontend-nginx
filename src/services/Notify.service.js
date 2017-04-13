(function () {
'use strict';
  module.exports = Notify;

  function Notify (ICON_NOTIFICATION, ICON_ERROR) {
/* Private ********************************************************************/

    let notificationBus = {};

    let notificationvalues = Object.keys(ICON_NOTIFICATION)
                             .map(key => ICON_NOTIFICATION[key]);


/* Public *********************************************************************/

    /** Publishes a notification to all registered subscribers. */
    function publish (notification) {
      if (notificationvalues.indexOf(notification) < 0) {
        throw new Error(ICON_ERROR.NOTIFICATION.DOES_NOT_EXIST);
      }

      notificationBus[notification]
      .forEach((subscriber) => { subscriber(notification); });
    }

    /** Adds a subscriber function to the list of callbacks callod when a notification is published. */
    function subscribe (notification, subscriber) {
      if (notificationvalues.indexOf(notification) < 0) {
        throw new Error(ICON_ERROR.NOTIFICATION.DOES_NOT_EXIST);
      }

      if (!notificationBus[notification]) notificationBus[notification] = [];
      notificationBus[notification].push(subscriber);
    }

    /** Removes a subscriber function to the list of callbacks callod when a notification is published. */
    function unsubscribe (notification, subscriber) {
      if (notificationvalues.indexOf(notification) < 0) {
        throw new Error(ICON_ERROR.NOTIFICATION.DOES_NOT_EXIST);
      }

      if (notificationBus[notification]) {
        let subscriberIndex = eventBus[notification].indexOf(subscriber);

        if (subscriberIndex >= 0) {
          notificationBus[notification].splice(subscriberIndex, 1);
        }
      }
    }


/* Interface ******************************************************************/

    return {
      subscribe:    subscribe,
      unsubscribe:  unsubscribe,
      publish:      publish,
    };
  }

}());
