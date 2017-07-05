import TokenHandler     from './TokenHandler.service'
import DhirErrorHandler from './DhirErrorHandler.service'
import DHIR             from './DHIR.service'
import Endpoint         from './Endpoint.service'

angular.module('icon.services', [])
  .service(TokenHandler.name,     TokenHandler.service)
  .service(DhirErrorHandler.name, DhirErrorHandler.service)
  .service(DHIR.name,             DHIR.service)
  .service(Endpoint.name,         Endpoint.service)

  .service('AnalyticsLogger', [
    'Endpoint',
    require('./AnalyticsLogger.service.js')
  ])
  .service('Is', [
    'Immunization',
    require('./Is.service.js')
  ])
  .service('By', [
    'Is', 'Immunization', 'DISEASE_YC_ORDER',
    require('./By.service.js')
  ])
  .service('GroupsOf', [
    require('./GroupsOf.service.js')
  ])
  .service('EditReviewService', [
    require('./EditReview.service.js')
  ])
  .service('FileUploadHandler', [
    '$http', '$q', 'FileUploader', 'TokenHandler', 'ICON_API', 'ICON_FILE_UPLOAD',
    require('./FileUploadHandler.service.js')
  ])
  .service('ImmunizationRecordService', [
    'moment', 'ImmunizationRecordSubmission',
    require('./ImmunizationRecord.service.js')
  ])
  .service('ImmunizationRecordConverter', [
    'Multitenancy', 'TokenHandler', 'ImmunizationRecordService', 'GatingQuestionService', '$translate', 'moment',
    'Patient', 'Immunization', 'Agent', 'Trade', 'Disease',
    require('./ImmunizationRecordConverter.service.js')
  ])
  .service('FhirRecordConverter', [
    '$q',
    'Endpoint',
    'Agent', 'Disease', 'Immunization', 'Lot', 'Patient', 'Recommendation', 'Trade',
    require('./FhirRecordConverter.service.js')
  ])
  .service('Multitenancy', [
    '$http', '$q',
    require('./Multitenancy.service.js')
  ])
  .service('Localization', [
    '$q', '$timeout', '$rootScope', 'tmhDynamicLocale',
    require('./localization/Localization.service.js')
  ])
  .service('BrowserChecker', [
    'deviceDetector',
    require('./BrowserChecker.service.js')
  ])
  .service('GatingQuestionService', [
    require('./GatingQuestion.service.js')
  ])
  .service('PdfMaker', [
      '$q', '$translate',
      'moment',
      'By', 'Endpoint', 'GroupsOf', 'ImmunizationRecordService', 'Multitenancy', 'Notify', 'TokenHandler',
      'Address',
      'DISEASE_YC_ORDER', 'ICON_NOTIFICATION',
      require('./PdfMaker.service.js')
  ])
  .service('Notify', [
      'ICON_NOTIFICATION',
      require('./Notify.service.js')
  ])
  .service('MiscData', [
      require('./MiscData.service.js')
  ])
  .service('SessionHandler', [
      '$interval', '$state',
      'Notify', 'TokenHandler',
      'ICON_NOTIFICATION',
      require('./SessionHandler.service.js')
  ])
  .service('AcceptLegalAgreement', [
      require('./AcceptLegalAgreement.service.js')
  ])
