/* @ngInject */
function anonSelfSubmission$ctrl ($state, TokenHandler, ImmunizationRecordService, Submitter) {
  this.navStates = $state.$current.data.navStates;
  TokenHandler.getTransactionToken();

  this.$onInit= ()=> {
    let submitter = ImmunizationRecordService.getSubmitter();
    submitter.relationshipToPatient = Submitter.relationships.ONESELF;
    ImmunizationRecordService.setSubmitter(submitter);
  }
}

export default {
  name: 'anonSelfSubmission',
  view : {
    bindings: { data: '@' },
    controller: anonSelfSubmission$ctrl,
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
  }
}
