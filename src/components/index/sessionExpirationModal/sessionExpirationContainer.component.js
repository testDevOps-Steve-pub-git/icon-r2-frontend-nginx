/**
 * Created on 2017-03-02.
 * Container to hold session expiration
 */
(function() {
'use strict';

  module.exports = {
    bindings: {},
    template: ``,
    controller: sessionContainerController,
  };

  sessionContainerController.$inject = ['ICON_EVENT', '$uibModal', 'TokenHandler', '$window'];
  function sessionContainerController(ICON_EVENT, $uibModal, TokenHandler, $window) {

    let isModalOpened = false;

    /** Event listener for transaction expiry warning, and the option to extend 15 minutes before */
    window.document.addEventListener(ICON_EVENT.TOKEN_TRANSACTION_EXPIRY, function(transactionData){
      if(!isModalOpened) {
        isModalOpened = true;
        openSessionModal(transactionData);
      }
    });

    /** Event listener for session expiry warning, and the option to extend 15 minutes before */
    window.document.addEventListener(ICON_EVENT.TOKEN_SESSION_EXPIRY, function(sessionData){
      if(!isModalOpened) {
        isModalOpened = true;
        openSessionModal(sessionData);
      }
    });

    /** Event listener for session expiry, and refresh the page is the session expires */
    window.document.addEventListener(ICON_EVENT.TOKEN_SESSION_KILL, function(sessionData){
      $window.location.reload();
    });


    /**
     * Creates session modal for user to kill or extend session
     */
    function openSessionModal(sessionData) {
      $uibModal.open({
        animation: true,
        template: `<session-expiration-modal modal-data="$ctrl.modalData" $close="$close(result)"></session-expiration-modal>`,
        controller: ['modalData', function(modalData) {
          let ctrl = this;
          ctrl.modalData = modalData;
        }],
        controllerAs: '$ctrl',
        backdrop  : 'static',
        keyboard: false,
        resolve: {
          modalData: sessionData
        },
        size: 'sm',
      }).result
        .then(function (result) {
          if(result == 'extend') {
            TokenHandler.refreshTransactionToken();
            TokenHandler.refreshSessionToken();
            isModalOpened = false;
          }
          else {
            TokenHandler.clearTransactionToken();
            isModalOpened = false;
            $window.location.reload();
          }
        })
        .catch(function(reason) {
          console.info(`Reason for dismissal is: ${reason}`);
        });
    }

  }

})();
