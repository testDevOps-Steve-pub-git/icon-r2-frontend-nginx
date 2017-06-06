/**
Intercepts $http calls to reject false positive responses from DHIR.
NOTE: Causes DHIR responses with an operation outcome to be thrown to the
      caller's $q.catch() block instead of $q.then() when an operation
      outcome is found with a 200 HTTP code.
*/
const detectDhirFalsePositive = ($q) => ({
  response: (response) => {
    const hasPositiveStatus = (
         !!response.status
      && response.status === 200
    );

    const NEGATIVE_RESOURCE_TYPE = `OperationOutcome`;
    const hasNegativeOperationOutcome = (
         !!response.data
      && !!response.data.entry
      && !!response.data.entry.length
      && !!response.data.entry[0].resource
      && !!response.data.entry[0].resource.resourceType
      && response.data.entry[0].resource.resourceType === NEGATIVE_RESOURCE_TYPE
    );

    const isFalsePositiveResponse = (
         hasPositiveStatus
      && hasNegativeOperationOutcome
    );

    return (isFalsePositiveResponse)
              ? $q.reject(response)
              : $q.resolve(response);
  }
});

module.exports = detectDhirFalsePositive;
