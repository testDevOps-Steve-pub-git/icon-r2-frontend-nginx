/* @ngInject */
function dispatchAfterVerification$ctrl ($state, $stateParams) {
  this.$onInit = () => {
    const DISPATCH_CONDITIONS = [
      { action: `SUBMISSION`, relationship: `ONESELF`, sref: `auth.self.submission.immunizations` },
      { action: `SUBMISSION`, relationship: `GUARD`, sref: `auth.other.submission.immunizations` },
      { action: `RETRIEVAL`, relationship: `ONESELF`, sref: `auth.self.patient` },
      { action: `RETRIEVAL`, relationship: `GUARD`, sref: `auth.other.patient` }
    ]

    const DEFAULT_SREF = `welcome`

    // When none of the dispatch conditions are met, use default instead.
    const CONDITION_SREF = DISPATCH_CONDITIONS
          .filter(condition => (
               condition.action === $stateParams.action &&
            condition.relationship === $stateParams.relationship
          ))
          .map(condition => condition.sref)[0] || DEFAULT_SREF

    $state.go(CONDITION_SREF)
  }
}

export default {
  name: `dispatchAfterVerification`,
  view: {
    controller: dispatchAfterVerification$ctrl,
    template: ``
  }
}
