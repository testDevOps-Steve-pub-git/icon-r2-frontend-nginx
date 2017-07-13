  import {expect}   from 'chai'
  import ImmunizationRecordConverter from '../../../src/services/ImmunizationRecordConverter.service.js'
  import dummyData from '../../fixtures/MultitenancyService.SamSmith.data.json'

  let Mock_MultitenancyService = { getPhuKeys: url => { return  dummyData} }

  // describe('ImmunizationRecordConverter', () => {
  //
  //   import submission from '../../fixtures/ImmunizationRecordService.SamSmith.data.js'
  //
  //   describe('.convertToFhir(...)', () => {
  //     var converter = null;
  //
  //     beforeEach(() => { converter = ImmunizationRecordConverter(Mock_MultitenancyService); });
  //
  //     it('should throw an exception if called without an ImmunizationRecordService argument', () => {
  //       let observedCallee = () => { converter.convertToFhir(); };
  //       let expectedError = new Error('A valid ImmunizationRecordService is required to convert to FHIR.');
  //
  //       expect(observedCallee).to.throw();
  //     });
  //
  //     it('should create a FHIR object including top-level keys', () => {
  //       let observedFhirObject = converter.convertToFhir(submission);
  //
  //       expect(observedFhirObject).to.include.keys([
  //         'resourceType',
  //         'contained',
  //         'identifier',
  //         'sender',
  //         'recipient',
  //         'status',
  //         'subject'
  //       ]);
  //     });
  //
  //   });
  //
  //
  //   describe('.convertToPost(...)', () => {
  //     var converter = null;
  //
  //     beforeEach(() => { converter = ImmunizationRecordConverter(Mock_MultitenancyService); });
  //
  //     it('should throw an exception if called without an ImmunizationRecordService argument', () => {
  //       let missingDependecyInjection = () => { ImmunizationRecordConverter() };
  //       expect(missingDependecyInjection).to.throw(Error);
  //     });
  //
  //     it('should create a Post object including top-level keys', () => {
  //       let observedPostObject = converter.convertToPost(submission, 'https://sub.domain.tld/endpoint');
  //       expect(observedPostObject).to.include.keys([
  //         'url',
  //         'data'
  //       ]);
  //     });
  //
  //   });
  // });
