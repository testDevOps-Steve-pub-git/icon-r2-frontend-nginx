/* @ngInject */
function welcomeSubmitContainer$ctrl () {}

export default {
  name: 'welcomeSubmitContainer',
  component: {
    controller: welcomeSubmitContainer$ctrl,
    css: [ './components/welcome/welcomeSubmitActions/welcomeSubmitStyles.css' ],
    template: `
      <div class="row">
        <div class="col-xs-12">
          <h1 class = "text-center" translate="welcomeSubmitContainer.TITLE"></h1>
          <hr />
        </div>

        <div class="col-xs-12 col-sm-5">
          <oiid-status></oiid-status>
        </div>

        <div class="col-xs-12 col-sm-2">
          <div class="row">
            <div class="col-xs-12">
              <div class="text-center icon-or-circle">
                <p translate="welcomeSubmitContainer.OR"></p>
              </div>
            </div>
          </div>
        </div>

        <welcome-anon-action class="col-xs-12 col-sm-5"></welcome-anon-action>
      </div>
    `
  }
}
