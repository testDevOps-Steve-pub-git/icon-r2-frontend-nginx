/* @ngInject */
function dismissableInfoNotification$ctrl ($translate, Multitenancy) {
  this.$onInit = () => {
    this.titleTextKey = this.resolve.titleTextKey
    this.bodyTextKey = this.resolve.bodyTextKey
    this.close = this.resolve.close
    let setMultitenancy = (phuTranslations) => {
      this.multitenancy = phuTranslations
    }
    Multitenancy.getPhuKeys()
    .then((phuKeys) => {
      return {
        phuName: $translate.instant(phuKeys.NAME_KEY)
      }
    })
    .then(setMultitenancy)
  }
}

export default {
  name: 'dismissableInfoNotification',
  component: {
    controller: dismissableInfoNotification$ctrl,
    bindings: { resolve: '=' },
    template: `
      <div role='dialog' aria-labelledby="modal-header" aria-describedby="modal-body">
        <div class="modal-header text-info">
          <span class="icon-modal-close-button pull-right" ng-click="$ctrl.close()">
            <i class="fa fa-times-circle fa-2x"></i>
          </span>
          <h4 id="modal-header" translate="{{$ctrl.titleTextKey}}" translate-values="{{$ctrl.multitenancy}}" translate-compile></h4>
        </div>

        <div class="modal-body">
          <p id="modal-body" translate="{{$ctrl.bodyTextKey}}" translate-values="{{$ctrl.multitenancy}}" translate-compile></p>

          <p>
            <button class="btn btn-primary btn-block" ng-click="$ctrl.close()" autofocus>
              {{'dismissableInfoNotification.CLOSE_BUTTON' | translate}}
            </button>
          </p>
        </div>
      </div>
    `
  }
}
