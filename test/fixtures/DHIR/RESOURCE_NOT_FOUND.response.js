export default {
  status: 404,
  data: {
    resourceType: "OperationOutcome",
    meta: {
      lastUpdated: "2017-05-31T08:58:33.731+00:00"
    },
    issue: [
      {
        code: "not-found",
        severity: "error",
        details: {
          id: "DHIR_ADM_004",
          text: "Not found: resource with requested ID"
        }
      }
    ]
  }
}