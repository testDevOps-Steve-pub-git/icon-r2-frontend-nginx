/**
 * Created on 2017-03-02.
 * Component for session expiration modal
 */
(function() {
'use strict';

  module.exports = {
    bindings: {
      $close: '&',
      modalData: '<',
    },
    templateUrl: './components/index/sessionExpirationModal/sessionExpirationModal.template.html',
    controller: sessionExpirationModalController,
  };

  function sessionExpirationModalController() {

    this.sessionChoice = (choice)=> {
      this.$close({result: choice});
    }

  }
})();
