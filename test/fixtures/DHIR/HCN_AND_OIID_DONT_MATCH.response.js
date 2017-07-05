export default {
  status: 400,
  data: {
    resourceType: "OperationOutcome",
    meta: {
      lastUpdated: "2017-05-31T08:58:33.731+00:00"
    },
    issue: [
      {
        code: "security",
        severity: "error",
        details: {
          id: "DHIR_ADM_033",
          text: "Resource is not associated to HCN"
        }
      }
    ]
  }
}