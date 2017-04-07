(function () {
'use strict';
  module.exports = Notify;

  function Notify (ICON_NOTIFICATION, ICON_ERROR) {
/* Private ********************************************************************/

    let notificationBus = {};


/* Public *********************************************************************/

    function publish (notification) {
      if (Object.values(ICON_NOTIFICATION).indexOf(notification) < 0) {
        throw new Error(ICON_ERROR.NOTIFICATION.DOES_NOT_EXIST);
      }

      notificationBus[notification]
      .forEach((subscriber) => { subscriber(notification); });
    }

    function subscribe (notification, subscriber) {
      if (Object.values(ICON_NOTIFICATION).indexOf(notification) < 0) {
        throw new Error(ICON_ERROR.NOTIFICATION.DOES_NOT_EXIST);
      }

      if (!notificationBus[notification]) notificationBus[notification] = [];
      notificationBus[notification].push(subscriber);
    }

    function unsubscribe (notification, subscriber) {
      if (Object.values(ICON_NOTIFICATION).indexOf(notification) < 0) {
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
