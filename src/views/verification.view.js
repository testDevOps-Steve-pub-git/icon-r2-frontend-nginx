/* @ngInject */
function verification$ctrl () {}

export default {
  name: 'verification',
  view: {
    controller: verification$ctrl,
    template: `
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2">

            <ui-view>
              <oiid-status></oiid-status>
            </ui-view>

          </div>
        </div>
      </div>
    `
  }
}
