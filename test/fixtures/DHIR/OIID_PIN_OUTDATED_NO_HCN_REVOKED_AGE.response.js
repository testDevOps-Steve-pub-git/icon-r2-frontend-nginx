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
          id: "DHIR_ADM_005",
          text: "Invalid resource"
        }
      },
      {
        code: "invalid",
        severity: "error",
        details: {
          id: "DHIR_ADM_006",
          text: "Resource revoked due to age > 16"
        }
      },
      {
        code: "incomplete",
        severity: "error",
        details: {
          id: "DHIR_ADM_071",
          text: "OIID without a HCN"
        }
      },
      {
        code: "invalid",
        severity: "error",
        details: {
          id: "DHIR_ADM_008",
          text: "Resource revoked due to PHU"
        }
      }
    ]
  }
}