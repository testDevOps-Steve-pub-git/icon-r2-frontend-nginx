import {expect}                            from 'chai'
import $Immunization                       from '../../../src/models/Immunization.model'
import $Is                                 from '../../../src/services/Is.service.js'
import $DHIR                               from '../../../src/services/DHIR.service'

/* NOTE: Manual dependency injection for a testable service.
         "$" prefix is to indicate a pre-injection state. */
const DHIR = $DHIR.service($Is.service($Immunization.model))

/* Universal DHIR responses */
import LOCKED_OUT                           from '../../fixtures/DHIR/LOCKED_OUT.response'
import RATE_LIMIT                           from '../../fixtures/DHIR/RATE_LIMIT.response'
import SERVER_INTERNAL_ERROR                from '../../fixtures/DHIR/SERVER_INTERNAL_ERROR.response'
import RESOURCE_NOT_FOUND                   from '../../fixtures/DHIR/RESOURCE_NOT_FOUND.response'
import MALFORMED_MISSING_REQUIRED_DATA      from '../../fixtures/DHIR/MALFORMED_MISSING_REQUIRED_DATA.response'
/* .../Admin/$ClientStatus DHIR responses */
import OIID_PIN_NOT_SET                     from '../../fixtures/DHIR/OIID_PIN_NOT_SET.response'
import OIID_PIN_NOT_SET_NO_HCN              from '../../fixtures/DHIR/OIID_PIN_NOT_SET_NO_HCN.response'
import OIID_PIN_OUTDATED                    from '../../fixtures/DHIR/OIID_PIN_OUTDATED.response'
import OIID_PIN_OUTDATED_NO_HCN             from '../../fixtures/DHIR/OIID_PIN_OUTDATED_NO_HCN.response'
import OIID_PIN_REVOKED_AGE                 from '../../fixtures/DHIR/OIID_PIN_REVOKED_AGE.response'
import OIID_PIN_REVOKED_PHU                 from '../../fixtures/DHIR/OIID_PIN_REVOKED_PHU.response'
import OIID_PIN_SET_NO_EMAIL_AVAILABLE      from '../../fixtures/DHIR/OIID_PIN_SET_NO_EMAIL_AVAILABLE.response'
import OIID_PIN_SET_NO_HCN_AVAILABLE        from '../../fixtures/DHIR/OIID_PIN_SET_NO_HCN_AVAILABLE.response'
/* .../Admin/$ValidateHCN DHIR responses */
import HCN_AND_OIID_DONT_MATCH              from '../../fixtures/DHIR/HCN_AND_OIID_DONT_MATCH.response'
import HCN_NOT_AVAILABLE                    from '../../fixtures/DHIR/HCN_NOT_AVAILABLE.response'
import HCN_ALREADY_USED                     from '../../fixtures/DHIR/HCN_ALREADY_USED.response'
/* .../Admin/$ResetAccess DHIR responses */
import NO_EMAIL_ON_FILE                     from '../../fixtures/DHIR/NO_EMAIL_ON_FILE.response'
import WRONG_EMAIL_PROVIDED                 from '../../fixtures/DHIR/WRONG_EMAIL_PROVIDED.response'
/* .../Admin/$SetPin DHIR responses */
import SET_PIN_HCN_NOT_AVAILABLE            from '../../fixtures/DHIR/SET_PIN_HCN_NOT_AVAILABLE.response'
import SET_PIN_HCN_ALREADY_USED             from '../../fixtures/DHIR/SET_PIN_HCN_ALREADY_USED.response'
import HCN_OIID_MISMATCH                    from '../../fixtures/DHIR/HCN_OIID_MISMATCH.response'
/* .../Admin/$ValidateToken DHIR responses */
import TOKEN_INVALID                        from '../../fixtures/DHIR/TOKEN_INVALID.response'
import TOKEN_EXPIRED                        from '../../fixtures/DHIR/TOKEN_EXPIRED.response'
/* .../Admin/$ResetPin DHIR responses */
import OIID_AND_TOKEN_DONT_MATCH            from '../../fixtures/DHIR/OIID_AND_TOKEN_DONT_MATCH.response'
import TOKEN_INVALID_FOR_PIN                from '../../fixtures/DHIR/TOKEN_INVALID_FOR_PIN.response'
import TOKEN_EXPIRED_FOR_PIN                from '../../fixtures/DHIR/TOKEN_EXPIRED_FOR_PIN.response'
import INVALID_RESOURCE                     from '../../fixtures/DHIR/INVALID_RESOURCE.response'


describe('DHIR', () => {
  /* Generic behaviour of .identify<API>Error(...), just test that once,
     because all of the API functions "inherit" their behaviour from the generic
     version through partial application. */
  describe('.identify<API>Error(...)', () => {
    it('should NOT throw if called without arguments', () => {
      expect(() => DHIR.identifyClientStatusError()).not.to.throw
    })

    it('should NOT throw if passed a response object WITHOUT status, and WITHOUT body', () => {
      expect(() => DHIR.identifyClientStatusError({})).not.to.throw
    })

    it('should NOT throw if passed a response object WITH status, but WITHOUT body', () => {
      expect(() => DHIR.identifyClientStatusError({ status: 400 })).not.to.throw
    })

    it('should NOT throw if passed a response object WITHOUT status, but WITH body', () => {
      expect(() => DHIR.identifyClientStatusError({ data: { yo: 'mama' } })).not.to.throw
    })
  })

  describe('LOCKED_OUT', () => {
    it('should detect the LOCKED_OUT case correctly', () => {
      expect(DHIR.identifyClientStatusError(LOCKED_OUT))
      .to.equal(DHIR.error.ClientStatus.LOCKED_OUT)
    })
  })

  describe('THROTTLED', () => {
    it('should detect the THROTTLED case correctly', () => {
      expect(DHIR.identifyClientStatusError(RATE_LIMIT))
      .to.equal(DHIR.error.ClientStatus.RATE_LIMIT)
    })
  })

  describe('INTERAL_ERROR', () => {
    it('should detect the INTERAL_ERROR case correctly', () => {
      expect(DHIR.identifyClientStatusError(SERVER_INTERNAL_ERROR))
      .to.equal(DHIR.error.ClientStatus.SERVER_INTERNAL_ERROR)
    })
  })

  describe('RESOURCE_NOT_FOUND', () => {
    it('should detect the RESOURCE_NOT_FOUND case correctly', () => {
      expect(DHIR.identifyClientStatusError(RESOURCE_NOT_FOUND))
      .to.equal(DHIR.error.ClientStatus.RESOURCE_NOT_FOUND)
    })
  })

  describe('MALFORMED_DATA', () => {
    it ('should detect the MALFORMED_DATA case correctly', () => {
      expect(DHIR.identifyClientStatusError(MALFORMED_MISSING_REQUIRED_DATA))
        .to.equal(DHIR.error.ClientStatus.MALFORMED_MISSING_REQUIRED_DATA)
    })
  })

  /* Specific behaviour of .identifyClientStatusError(...) */
  describe('.identifyClientStatusError(...)', () => {

    describe('OIID_PIN_NOT_SET', () => {
      it('should detect the OIID_PIN_NOT_SET case correctly', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_NOT_SET))
          .to.equal(DHIR.error.ClientStatus.OIID_PIN_NOT_SET)
      })

      it('should NOT detect the OIID_PIN_NOT_SET_NO_HCN case as OIID_PIN_NOT_SET because of collision', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_NOT_SET_NO_HCN))
          .to.not.equal(DHIR.error.ClientStatus.OIID_PIN_NOT_SET)
        expect(DHIR.identifyClientStatusError(OIID_PIN_NOT_SET_NO_HCN))
          .to.not.equal(DHIR.error.NO_MATCHING_DHIR_ERROR_FOUND)
      })
    })

    describe('OIID_PIN_OUTDATED', () => {
      it ('should detect the OIID_PIN_OUTDATED case correctly', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_OUTDATED))
          .to.equal(DHIR.error.ClientStatus.OIID_PIN_OUTDATED)
      })

      it ('should NOT detect the OIID_PIN_OUTDATED_NO_HCN case as OIID_PIN_OUTDATED because of collision', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_OUTDATED_NO_HCN))
          .to.not.equal(DHIR.error.ClientStatus.OIID_PIN_OUTDATED)
        expect(DHIR.identifyClientStatusError(OIID_PIN_OUTDATED_NO_HCN))
          .to.equal(DHIR.error.ClientStatus.OIID_PIN_OUTDATED_NO_HCN)
      })
    })

    describe('OIID_PIN_REVOKED_AGE', () => {
      it ('should detect the OIID_PIN_REVOKED_AGE case correctly', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_REVOKED_AGE))
          .to.equal(DHIR.error.ClientStatus.OIID_PIN_REVOKED_AGE)
      })
    })

    describe('OIID_PIN_REVOKED_PHU', () => {
      it ('should detect the OIID_PIN_REVOKED_PHU case correctly', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_REVOKED_PHU))
          .to.equal(DHIR.error.ClientStatus.OIID_PIN_REVOKED_PHU)
      })
    })

    describe('OIID_PIN_SET_NO_EMAIL_AVAILABLE', () => {
      it ('should detect the OIID_PIN_SET_NO_EMAIL_AVAILABLE case correctly', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_SET_NO_EMAIL_AVAILABLE))
          .to.equal(DHIR.error.ClientStatus.OIID_PIN_SET_NO_EMAIL_AVAILABLE)
      })
    })

    describe('OIID_PIN_SET_NO_HCN_AVAILABLE', () => {
      it ('should detect the OIID_PIN_SET_NO_HCN_AVAILABLE case correctly', () => {
        expect(DHIR.identifyClientStatusError(OIID_PIN_SET_NO_HCN_AVAILABLE))
          .to.equal(DHIR.error.ClientStatus.OIID_PIN_SET_NO_HCN_AVAILABLE)
        expect(DHIR.identifyClientStatusError(OIID_PIN_SET_NO_HCN_AVAILABLE))
          .to.not.equal(DHIR.error.ClientStatus.OIID_PIN_OUTDATED_NO_HCN)
      })
    })
  })

  describe('.identifyValidateHCNError(...)', () => {
    describe('HCN_AND_OIID_DONT_MATCH', () => {
      it('should detect the HCN_AND_OIID_DONT_MATCH case correctly', () => {
        expect(DHIR.identifyValidateHCNError(HCN_AND_OIID_DONT_MATCH))
        .to.equal(DHIR.error.ValidateHCN.HCN_AND_OIID_DONT_MATCH)
      })
    })

    describe('HCN_NOT_AVAILABLE', () => {
      it('should detect the HCN_NOT_AVAILABLE case correctly', () => {
        expect(DHIR.identifyValidateHCNError(HCN_NOT_AVAILABLE))
        .to.equal(DHIR.error.ValidateHCN.HCN_NOT_AVAILABLE)
      })
    })

    describe('HCN_ALREADY_USED', () => {
      it('should detect the HCN_ALREADY_USED case correctly', () => {
        expect(DHIR.identifyValidateHCNError(HCN_ALREADY_USED))
        .to.equal(DHIR.error.ValidateHCN.HCN_ALREADY_USED)
      })
    })
  })

  describe('.identifyResetAccessError(...)', () => {
    describe('NO_EMAIL_ON_FILE', () => {
      it('should detect the NO_EMAIL_ON_FILE case correctly', () => {
        expect(DHIR.identifyResetAccessError(NO_EMAIL_ON_FILE))
        .to.equal(DHIR.error.ResetAccess.NO_EMAIL_ON_FILE)
      })
    })
    describe('WRONG_EMAIL_PROVIDED', () => {
      it('should detect the WRONG_EMAIL_PROVIDED case correctly', () => {
        expect(DHIR.identifyResetAccessError(WRONG_EMAIL_PROVIDED))
        .to.equal(DHIR.error.ResetAccess.WRONG_EMAIL_PROVIDED)
      })
    })
  })

  describe('.identifySetPINError(...)', () => {
    describe('HCN_NOT_AVAILABLE', () => {
      it('should detect the HCN_NOT_AVAILABLE case correctly', () => {
        expect(DHIR.identifySetPINError(SET_PIN_HCN_NOT_AVAILABLE))
        .to.equal(DHIR.error.SetPIN.HCN_NOT_AVAILABLE)
      })
    })

    describe('HCN_ALREADY_USED', () => {
      it('should detect the HCN_ALREADY_USED case correctly', () => {
        expect(DHIR.identifySetPINError(SET_PIN_HCN_ALREADY_USED))
        .to.equal(DHIR.error.SetPIN.HCN_ALREADY_USED)
      })
    })

    describe('HCN_OIID_MISMATCH', () => {
      it('should detect the HCN_OIID_MISMATCH case correctly', () => {
        expect(DHIR.identifySetPINError(HCN_OIID_MISMATCH))
        .to.equal(DHIR.error.SetPIN.HCN_OIID_MISMATCH)
      })
    })
  })

  describe('.identifyValidateTokenError(...)', () => {
    describe('TOKEN_EXPIRED', () => {
      it('should detect the TOKEN_EXPIRED case correctly', () => {
        expect(DHIR.identifyValidateTokenError(TOKEN_EXPIRED))
        .to.equal(DHIR.error.ValidateToken.TOKEN_EXPIRED)
      })
    })

    describe('TOKEN_INVALID', () => {
      it('should detect the HCN_NOT_AVAILABLE case correctly', () => {
        expect(DHIR.identifyValidateTokenError(TOKEN_INVALID))
        .to.equal(DHIR.error.ValidateToken.TOKEN_INVALID)
      })
    })
  })

  describe('.identifyResetPINError(...)', () => {
    describe('OIID_AND_TOKEN_DONT_MATCH', () => {
      it('should detect the OIID_AND_TOKEN_DONT_MATCH case correctly', () => {
        expect(DHIR.identifyResetPINError(OIID_AND_TOKEN_DONT_MATCH))
        .to.equal(DHIR.error.ResetPIN.OIID_AND_TOKEN_DONT_MATCH)
      })
    })

    describe('TOKEN_INVALID_FOR_PIN', () => {
      it('should detect the TOKEN_INVALID_FOR_PIN case correctly', () => {
        expect(DHIR.identifyResetPINError(TOKEN_INVALID_FOR_PIN))
        .to.equal(DHIR.error.ResetPIN.TOKEN_INVALID_FOR_PIN)
      })
    })

    describe('TOKEN_EXPIRED_FOR_PIN', () => {
      it('should detect the TOKEN_EXPIRED_FOR_PIN case correctly', () => {
        expect(DHIR.identifyResetPINError(TOKEN_EXPIRED_FOR_PIN))
        .to.equal(DHIR.error.ResetPIN.TOKEN_EXPIRED_FOR_PIN)
      })
    })

    describe('INVALID_RESOURCE', () => {
      it('should detect the INVALID_RESOURCE case correctly', () => {
        expect(DHIR.identifyResetPINError(INVALID_RESOURCE))
        .to.equal(DHIR.error.ResetPIN.INVALID_RESOURCE)
      })
    })
  })
})
