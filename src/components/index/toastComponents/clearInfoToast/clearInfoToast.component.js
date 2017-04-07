/**
 * Created on 2017-02-15.
 * Component for toast to let the user know their info has been cleared
 */
(function(){
  'use strict';

  module.exports = {
    template: `
    <toaster-container toaster-options="{'position-class': 'toast-bottom-full-width', 'toaster-id': 2}"></toaster-container>
    `,
    controller: clearInfoToastController
  };

  clearInfoToastController.$inject = ['toaster', '$timeout', 'ToasterChoiceService'];
  function clearInfoToastController(toaster, $timeout, ToasterChoiceService) {

    this.$onInit = ()=> {

      /** In order to display toaster on init */
      $timeout(function () {
        pop();
      }, 1000);
    };


    /**
     * Function to dislay toast
     */
    function pop() {
      /** Variable Init */
      let title = 'Thanks for visiting!';
      let body = 'Any information you have entered has been cleared.';
      toaster.pop({
        type: 'success',
        timeout: 5000,
        title: title,
        body: `
          <div>
            <p>${body}</p>
          </div>
        `,
        bodyOutputType: 'trustedHtml',
        toasterId: 2,
        tapToDismiss: true,
        showCloseButton: true,
        onHideCallback: function () {
          ToasterChoiceService.setToasterChoice('null');
        }
      });
    }

  }
})();
