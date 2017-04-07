anonOtherSubmissionController.$inject= ['$state', 'TokenHandler'];
function anonOtherSubmissionController ($state, TokenHandler) {
  this.navStates = $state.$current.data.navStates;
  TokenHandler.getTransactionToken();
}

module.exports = {
  bindings: { data: '@' },
  controller: anonOtherSubmissionController,
  template: `
    <main>
      <progress-bar
        base-state="anon.other.submission"
        progress-states="$ctrl.navStates">
      </progress-bar>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2">
            <ui-view></ui-view>
          </div>
        </div>
      </div>
    </main>
  `
};
