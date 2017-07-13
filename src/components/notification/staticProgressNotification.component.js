/* @ngInject */
function fixedProgressNotification$ctrl () {
  this.$onInit = () => {
    this.titleTextKey = this.resolve.titleTextKey
    this.bodyTextKey = this.resolve.bodyTextKey
  }
}

export default {
  name: 'staticProgressNotification',
  component: {
    bindings: { resolve: '=' },
    controller: fixedProgressNotification$ctrl,
    template: `
      <div class="modal-header text-center text-info">
        <h4 translate="{{$ctrl.titleTextKey}}" translate-compile></h4>
      </div>

      <div class="modal-body text-center">
        <p translate="{{$ctrl.bodyTextKey}}" translate-compile></p>
        <span aria-hidden="true" class="fa fa-circle-o-notch fa-spin fa-4x"></span>
      </div>
    `
  }
}
