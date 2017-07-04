/**
 * Created on 2017-02-15.
 * Component for toast to extend session
 */
(function(){
  'use strict';

  module.exports = {
    templateUrl: './components/index/toastComponents/extendSessionToast/extendSessionToast.template.html',
    controller: extendSessionToastController,
  };

  extendSessionToastController.$inject = ['toaster', '$timeout', 'ToasterChoiceService'];
  function extendSessionToastController(toaster, $timeout, ToasterChoiceService) {

    this.$onInit = ()=> {

      /** In order to display toaster on init */
      $timeout(function () {
        pop();
      }, 0);
    };


    /**
     * Function to dislay toast
     */
    function pop() {
      toaster.pop({
        type: 'info',
        timeout: 900000,
        title: `Your session is about to expire`,
        body: `
          <div>
            <p>Would you like to extend your session?</p>
          </div>
        `,
        bodyOutputType: 'trustedHtml',
        toasterId: 3,
        tapToDismiss: false,
        showCloseButton: true,
        onHideCallback: function () {
          ToasterChoiceService.setToasterChoice('null');
        }
      });
    }

  }
})();
