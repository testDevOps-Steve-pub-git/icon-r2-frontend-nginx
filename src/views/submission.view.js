/* @ngInject */
function submission$ctrl () {}

export default {
  name: 'submission',
  view: {
    controller: submission$ctrl,
    template: `
      <div class="container">
        <div class="row">
          <div class="col-xs-12">

            <welcome-submit-container></welcome-submit-container>

          </div>
        </div>
      </div>
    `
  }
}
