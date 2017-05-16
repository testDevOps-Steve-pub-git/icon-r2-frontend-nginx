angular.module('icon.services', [])
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
      .service('GroupsOf', [require('./GroupsOf.service.js')])
      .service('EditReviewService', [require('./EditReview.service.js')])
      .service('Endpoint', [
          '$http', '$q', '$translate',
          'ImmunizationRecordService', 'SessionHandler', 'TokenHandler',
          'Agent', 'Disease', 'Immunization', 'Lot', 'Trade',
          'ICON_API',
          require('./Endpoint.service.js')
      ])
      .service('FileUploadHandler', [
          '$http', '$q', 'FileUploader', 'TokenHandler', 'ICON_API', 'ICON_FILE_UPLOAD',
          require('./FileUploadHandler.service.js')
      ])
      .service('ImmunizationRecordService', [
          'ImmunizationRecordSubmission',
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
        'ICON_ERROR',
        require('./FhirRecordConverter.service.js')
      ])
      .service('Multitenancy', [
          '$http', '$q',
          require('./Multitenancy.service.js')
      ])
      .service('TokenHandler', [
          '$http', '$q', '$interval',
          'jwtHelper',
          'Token',
          'ICON_API', 'ICON_EVENT',
          require('./TokenHandler.service.js')
      ])
      .service('ToasterChoiceService', [require('./ToasterChoice.service.js')])
      .service('Localization', [
          '$q', '$timeout', '$rootScope', 'tmhDynamicLocale',
          require('./localization/Localization.service.js')
      ])
      .service('BrowserChecker', [
          'deviceDetector',
          require('./BrowserChecker.service.js')
      ])
      .service('GatingQuestionService', [require('./gatingQuestion.service.js')])
      .service('PdfMaker', [
          '$q', '$translate',
          'moment',
          'By', 'Endpoint', 'GroupsOf', 'ImmunizationRecordService', 'Multitenancy', 'Notify', 'TokenHandler',
          'Address',
          'DISEASE_YC_ORDER', 'ICON_NOTIFICATION',
          require('./PdfMaker.service.js')
      ])
      .service('Notify', [
          'ICON_NOTIFICATION', 'ICON_ERROR',
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
