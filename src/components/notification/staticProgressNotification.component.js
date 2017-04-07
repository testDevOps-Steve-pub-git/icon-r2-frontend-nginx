(function () {
'use strict';

  module.exports = {
    bindings: { resolve: '=' },
    controller: fixedProgressNotificationController,
    template: `
      <div class="modal-header text-center text-info lead" translate="{{$ctrl.titleTextKey}}" translate-compile></div>

      <div class="modal-body text-center">
        <span aria-hidden="true" class="fa fa-circle-o-notch fa-spin text-info" style="font-size: 100px"></span>
        <br aria-hidden=\"true\"/>
        <div translate="{{$ctrl.bodyTextKey}}" translate-compile></div>
      </div>
    `,
  };

  fixedProgressNotificationController.$inject = [];
  function fixedProgressNotificationController () {
    this.$onInit = () => {
      this.titleTextKey = this.resolve.titleTextKey;
      this.bodyTextKey = this.resolve.bodyTextKey;
    };
  }

}());
