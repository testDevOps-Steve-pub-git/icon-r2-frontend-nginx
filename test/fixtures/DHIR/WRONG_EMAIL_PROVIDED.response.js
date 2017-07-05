export default {
  status: 400,
  data: {
    resourceType: "OperationOutcome",
    meta: {
      lastUpdated: "2017-06-26T13:35:37.703Z"
    },
    issue: [
      {
        code: "invalid",
        severity: "error",
        details: {
          id: "DHIR_ADM_112",
          text: "Resource is not associated to specified email address"
        }
      }
    ]
  }
}
