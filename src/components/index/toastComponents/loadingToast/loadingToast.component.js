/**
 * Created on 2017-02-15.
 * Component for toast to inform user information is loading
 */
(function(){
  'use strict';

  module.exports = {
    templateUrl: './components/index/toastComponents/loadingToast/loadingToast.template.html',
    controller: loadingToastController,
  };

  loadingToastController.$inject = ['toaster', '$timeout', 'ToasterChoiceService'];
  function loadingToastController(toaster, $timeout, ToasterChoiceService) {

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
        type: 'warning',
        timeout: 3000,
        title: `Please wait...`,
        body: `
          <div>
            <p>The requested data is being loaded.</p>
          </div>
        `,
        bodyOutputType: 'trustedHtml',
        toasterId: 4,
        tapToDismiss: false,
        showCloseButton: true,
        onHideCallback: function () {
          ToasterChoiceService.setToasterChoice('null');
        }
      });
    }

  }
})();
