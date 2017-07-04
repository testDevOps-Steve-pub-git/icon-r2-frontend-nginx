__Methods for Identifying DHIR Error FHIR Responses__
-----------------------------------------------------

- `DHIR.identifyClientStatusError(response)` returns
  - an error flag from `DHIR.error.ClientStatus`, or
  - `DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND`


- `DHIR.identifySetPINError(response)` returns
  - an error flag from `DHIR.error.SetPIN`, or
  - `DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND`


- `DHIR.identifyValidateHCNError(response)` returns
  - an error flag from `DHIR.error.ValidateHCN`, or
  - `DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND`


- `DHIR.identifyResetAccessError(response)` returns
  - an error flag from `DHIR.error.ResetAccess`, or
  - `DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND`


- `DHIR.identifyValidateTokenError(response)` returns
  - an error flag from `DHIR.error.ValidateToken`, or
  - `DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND`


- `DHIR.identifyResetPINError(response)` returns
  - an error flag from `DHIR.error.ResetPIN`, or
  - `DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND`


__Flags Representing Error Condition IDs__
------------------------------------------  

 _**NOTE:** notation ** * ** indicates that this flag is specific to this API only_

`DHIR.error.ClientStatus...`
-----------------------
- LOCKED_OUT
- RESOURCE_NOT_FOUND
- MALFORMED_REQUEST
- RATE_LIMIT
- SERVER_INTERNAL_ERROR
- MALFORMED_MISSING_REQUIRED_DATA
- MALFORMED_INVALID_VALUE
- ** OIID_PIN_NOT_SET* **
- ** OIID_PIN_OUTDATED* **
- ** OIID_PIN_NOT_SET_NO_HCN* **
- ** OIID_PIN_OUTDATED_NO_HCN* **
- ** OIID_PIN_SET_NO_EMAIL_AVAILABLE* **
- ** OIID_PIN_SET_NO_HCN_AVAILABLE* **
- ** OIID_PIN_REVOKED_AGE* **
- ** OIID_PIN_REVOKED_PHU* **

`DHIR.error.SetPIN...`
-------------------
- LOCKED_OUT
- RESOURCE_NOT_FOUND
- MALFORMED_REQUEST
- RATE_LIMIT
- SERVER_INTERNAL_ERROR
- MALFORMED_MISSING_REQUIRED_DATA
- MALFORMED_INVALID_VALUE
- ** HCN_NOT_AVAILABLE* **
- ** HCN_ALREADY_USED* **
- ** HCN_OIID_MISMATCH* **

`DHIR.error.ValidateHCN...`
------------------------
- LOCKED_OUT
- RESOURCE_NOT_FOUND
- MALFORMED_REQUEST
- RATE_LIMIT
- SERVER_INTERNAL_ERROR
- MALFORMED_MISSING_REQUIRED_DATA
- MALFORMED_INVALID_VALUE
- ** HCN_AND_OIID_DONT_MATCH* **
- ** HCN_NOT_AVAILABLE* **
- ** HCN_ALREADY_USED* **


`DHIR.error.ResetAccess...`
------------------------

- LOCKED_OUT
- RESOURCE_NOT_FOUND
- MALFORMED_REQUEST
- RATE_LIMIT
- SERVER_INTERNAL_ERROR
- MALFORMED_MISSING_REQUIRED_DATA
- MALFORMED_INVALID_VALUE
- ** NO_EMAIL_ON_FILE* **
- ** WRONG_EMAIL_PROVIDED* **


`DHIR.error.ValidateToken...`
--------------------------

- LOCKED_OUT
- RESOURCE_NOT_FOUND
- MALFORMED_REQUEST
- RATE_LIMIT
- SERVER_INTERNAL_ERROR
- MALFORMED_MISSING_REQUIRED_DATA
- MALFORMED_INVALID_VALUE
- ** TOKEN_INVALID* **
- ** TOKEN_EXPIRED* **


`DHIR.error.ResetPIN...`
---------------------

- LOCKED_OUT
- RESOURCE_NOT_FOUND
- MALFORMED_REQUEST
- RATE_LIMIT
- SERVER_INTERNAL_ERROR
- MALFORMED_MISSING_REQUIRED_DATA
- MALFORMED_INVALID_VALUE
- ** OIID_AND_TOKEN_DONT_MATCH* **
- ** TOKEN_INVALID_FOR_PIN* **
- ** TOKEN_EXPIRED_FOR_PIN* **
- ** INVALID_RESOURCE* **

When No Matching DHIR Error Response Is Found
---------------------------------------------
```DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND```
