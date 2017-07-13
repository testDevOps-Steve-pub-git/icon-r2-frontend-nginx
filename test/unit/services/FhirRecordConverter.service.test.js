import Agent                         from '../../../src/models/Agent.model'
import Disease                       from '../../../src/models/Disease.model'
import Immunization                  from '../../../src/models/Immunization.model'
import Lot                           from '../../../src/models/Lot.model'
import Patient                       from '../../../src/models/Patient.model'
import Recommendation                from '../../../src/models/Recommendation.model'
import Trade                         from '../../../src/models/Trade.model'
import { expect }                    from 'chai'
/* NOTE: Manual dependency injection for a testable service.
         "$" prefix is to indicate a pre-injection state. */
import $FhirRecordConverter          from '../../../src/services/FhirRecordConverter.service.js'
import consentBlock                  from '../../fixtures/RetrievalResponse.consentBlock.json'
import missingOrIncorrectOiid        from '../../fixtures/RetrievalResponse.missingOrIncorrectOiid.json'
import missingOrIncorrectPin         from '../../fixtures/RetrievalResponse.missingOrIncorrectPin.json'
import validForecastOnly             from '../../fixtures/RetrievalResponse.validForecastOnly.json'
import validImmunizationsAndForecast from '../../fixtures/RetrievalResponse.validImmunizationsAndForecast.json'
import validImmunizationsOnly        from '../../fixtures/RetrievalResponse.validImmunizationsOnly.json'

const FhirRecordConverter = $FhirRecordConverter.service(
  null, /* $q */
  null, /* Endpoint */
  Agent.model,
  Disease.model,
  Immunization.model,
  Lot.model,
  Patient.model,
  Recommendation.model,
  Trade.model
)

describe('FhirRecordConverter', () => {

/* Negative cases *************************************************************/

  describe('Use case -- convert a response without data:', () => {
    it('should throw an error', () => {
      let convertWithoutData = () => { FhirRecordConverter.convert(); }
      expect(convertWithoutData).to.throw;
    });
  });

  describe('Use case -- convert response with negative \"Operation Outcome\":', () => {
    it('should throw an error', () => {
      let convertWithNegativeOperationOutcome = () => { FhirRecordConverter.convert(missingOrIncorrectPin); }

      expect(convertWithNegativeOperationOutcome).to.throw;
    });
  });

  describe('Use case -- convert a response from request without valid OIID:', () => {
    it('should throw an error', () => {
      let convertWithoutValidOiid = () => { FhirRecordConverter.convert(missingOrIncorrectOiid); }

      expect(convertWithoutValidOiid).to.throw;
    });
  });

  describe('Use case -- convert a response from request without valid PIN:', () => {
    it('should throw an error', () => {
      let convertWithoutValidPin = () => { FhirRecordConverter.convert(missingOrIncorrectPin); }
      expect(convertWithoutValidPin).to.throw;
    });
  });

  describe('Use case -- convert response from request when a \"Consent Block\" is enforced:', () => {
    it('should throw an error', () => {
      let convertWithConsentBlock = () => { FhirRecordConverter.convert(consentBlock); }
      expect(convertWithConsentBlock).to.throw;
    });
  });



/* Positive cases *************************************************************/

  describe('Use case -- convert a record with forecast only:', function() {
    let validForecastOnlyData = null;
    beforeEach(() => {
      validForecastOnlyData = FhirRecordConverter.convert(validForecastOnly)
    });

    it('should not throw any error(s)', () => {
      let convertRecordValidForecastOnly = () => { FhirRecordConverter.convert(validForecastOnly); }
      expect(convertRecordValidForecastOnly).not.to.throw();
    });

    it('should be an accurate record for patient \"Kim Park\"', () => {
      expect(validForecastOnlyData.patient.firstName).to.equal('Kim');
      expect(validForecastOnlyData.patient.lastName).to.equal('Park');
      expect(validForecastOnlyData.patient.dateOfBirth).to.equal('2016-09-08');
      expect(validForecastOnlyData.patient.healthCardNumber).to.equal('');
      expect(validForecastOnlyData.patient.oiid).to.equal('P6XRBK7QBK');
      expect(validForecastOnlyData.patient.gender).to.equal('male');
    });

    it('should have 0 retrieved immunizations', () => {
      expect(validForecastOnlyData.retrievedImmunizations.length).to.equal(0);
    });

    it('should have 7 recommendations', () => {
      expect(validForecastOnlyData.recommendations.length).to.equal(7);
    });

    it('should have 0 \"DUE\" recommendations', () => {
      let dueRecommendations = validForecastOnlyData.recommendations
                               .filter(r => r.status === 'DUE');
      expect(dueRecommendations.length).to.equal(0);
    });

    it('should have 7 \"OVERDUE\" recommendations', () => {
      let overdueRecommendations = validForecastOnlyData.recommendations
                                   .filter(r => r.status === 'OVERDUE');
      expect(overdueRecommendations.length).to.equal(7);
    });
  });


  describe('Use case -- convert a record with forecast and immunization history:', () => {
    let validImmunizationsAndForecastData = null;
    beforeEach(() => {
      validImmunizationsAndForecastData = FhirRecordConverter.convert(validImmunizationsAndForecast)
    });

    it('should not throw any error(s)', () => {
      let convertRecordValidImmunizationsAndForecast = () => { FhirRecordConverter.convert(validImmunizationsAndForecast); }
      expect(convertRecordValidImmunizationsAndForecast).not.to.throw();
    });

    it('should be an accurate record for patient \"Sam Smith\"', () => {
      expect(validImmunizationsAndForecastData.patient.firstName).to.equal('Merrill');
      expect(validImmunizationsAndForecastData.patient.lastName).to.equal('Parker');
      expect(validImmunizationsAndForecastData.patient.dateOfBirth).to.equal('2000-01-14');
      expect(validImmunizationsAndForecastData.patient.healthCardNumber).to.equal('5057573114');
      expect(validImmunizationsAndForecastData.patient.oiid).to.equal('ZPH6BL29BP');
      expect(validImmunizationsAndForecastData.patient.gender).to.equal('male');
    });

    it('should have 5 retrieved immunizations', () => {
      expect(validImmunizationsAndForecastData.retrievedImmunizations.length).to.equal(5);
    });

    // TODO: Another test case required specific to practitioners.
    // it('should have 1 immunization administered by \"Fiona Fryer RN\"', () => {
    //   let providerFionaFryerRnImmunizations = validImmunizationsAndForecastData.retrievedImmunizations
    //                                           .filter(i => i.provider === 'Fiona Fryer RN');
    //   expect(providerFionaFryerRnImmunizations.length).to.equal(1);
    // });
    //
    // it('should have 1 immunization administered by \"Janice Smith\"', () => {
    //   let providerJaniceSmithImmunizations = validImmunizationsAndForecastData.retrievedImmunizations
    //                                          .filter(i => i.provider === 'Janice Smith');
    //   expect(providerJaniceSmithImmunizations.length).to.equal(1);
    // });

    it('should have 9 recommendations', () => {
      expect(validImmunizationsAndForecastData.recommendations.length).to.equal(9);
    });

    // TODO: Another test case specific to due recommendations...
    // it('should have 3 \"DUE\" recommendations', () => {
    //   let dueRecommendations = validImmunizationsAndForecastData.recommendations
    //                            .filter(r => r.status === 'DUE');
    //   expect(dueRecommendations.length).to.equal(3);
    // });

    it('should have 9 \"OVERDUE\" recommendations', () => {
      let overdueRecommendations = validImmunizationsAndForecastData.recommendations
                                   .filter(r => r.status === 'OVERDUE');
      expect(overdueRecommendations.length).to.equal(9);
    });
  });
});
