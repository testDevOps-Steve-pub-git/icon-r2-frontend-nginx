/* @ngInject */
function AccessControl (ImmunizationRecordService) {
  const rules = {
    OIID_ENTERED: () => !!ImmunizationRecordService.getPatient().oiid,
    HCN_ENTERED: () => !!ImmunizationRecordService.getPatient().healthCardNumber,
    EMAIL_ENTERED: () => !!ImmunizationRecordService.getSubmitter().email
  }

  const hasRules = (state) => (
       !!state &&
    !!state.rules &&
    (state.rules.length > 0)
  )

  const noRules = (state) => !hasRules(state)

  const followsRules = (stateRules) => stateRules.every(rule => rules[rule]())

  const execute = (toState) => (noRules(toState) || followsRules(toState.rules))

  return {
    execute: execute,
    rule: Object.keys(rules).reduce((coll, k) => {
      coll[k] = k
      return coll
    }, {})
  }
}

export default {
  name: 'AccessControl',
  service: AccessControl
}
