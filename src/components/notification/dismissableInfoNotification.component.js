(function () {
'use strict';

  module.exports = {
    controller: dismissableInfoNotificationController,
    template: `
    <div class="modal-header text-center text-info lead" translate="{{$ctrl.titleTextKey}}" translate-compile></div>

    <div class="modal-body text-center">
      <div translate="{{$ctrl.bodyTextKey}}" translate-compile></div>
    </div>
    `,
  };

  dismissableInfoNotificationController.$inject = [];
  function dismissableInfoNotificationController () {
    this.titleTextKey = this.resolve.titleTextKey;
    this.bodyTextKey = this.resolve.bodyTextKey;
  }

}());
