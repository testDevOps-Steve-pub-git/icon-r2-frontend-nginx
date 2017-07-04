anonSelfSubmissionController.$inject = ['$state', 'TokenHandler'];
function anonSelfSubmissionController ($state, TokenHandler) {
  this.navStates = $state.$current.data.navStates;
  TokenHandler.getTransactionToken();
}

module.exports = {
  bindings: { data: '@' },
  controller: anonSelfSubmissionController,
  template: `
    <main>
      <progress-bar
        base-state="anon.self.submission"
        progress-states="$ctrl.navStates">
      </progress-bar>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-10 col-lg-8 col-sm-offset-1 col-lg-offset-2">
            <ui-view></ui-view>
          </div>
        </div>
      </div>
    </main>
  `
};
