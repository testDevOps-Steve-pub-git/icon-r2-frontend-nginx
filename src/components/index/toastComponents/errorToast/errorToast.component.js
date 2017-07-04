/**
 * Created on 2017-02-15.
 * Component for error toast
 */
(function(){
'use strict';

  module.exports = {
    templateUrl: './components/index/toastComponents/errorToast/errorToast.template.html',
    controller: errorToastController,
  };

  errorToastController.$inject= ['toaster', '$timeout', 'ToasterChoiceService'];
  function errorToastController(toaster, $timeout,ToasterChoiceService) {

    this.$onInit = ()=> {

      /** In order to display toaster on init */
      $timeout(function () {
        pop();
      }, 0);
    };


    /**
     * Function to dislay toast
     */
    function pop(){
      let toasterParams = ToasterChoiceService.getToasterParams();
      let title = toasterParams.title;
      let body = toasterParams.body;
      toaster.pop({
        type: 'error',
        timeout: 10000,
        title: title,
        body: `
          <div>
            <p>${body}</p>
          </div>
        `,
        bodyOutputType: 'trustedHtml',
        toasterId: 1,
        tapToDismiss: false,
        showCloseButton: true,
        onHideCallback: function () {
          ToasterChoiceService.setToasterChoice('null');
        }
      });
    }
  }
})();
