export default {
  status: 400,
  data: {
    resourceType: "OperationOutcome",
    meta: {
      lastUpdated: "2017-05-31T08:58:33.731+00:00"
    },
    issue: [
      {
        code: "invalid",
        severity: "error",
        details: {
          id: "DHIR_ADM_007",
          text: "Resource does not have PIN"
        }
      },
      {
        code: "incomplete",
        severity: "error",
        details: {
          id: "DHIR_ADM_071",
          text: "OIID without a HCN"
        }
      }
    ]
  }
}
