(function () {
'use strict';

  require('angular');
  require('./dependencies.module.js');

  require('./index.js');
  require('./index.controller.js');

  require('./components/components.module.js');
  require('./directives/directives.module.js');
  require('./filters/filters.module.js');
  require('./models/models.module.js');
  require('./services/services.module.js');
  require('./views/views.module.js');

  // Polyfill for window location origin
  if (!window.location.origin) { window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''); }
  let BASE_URL = window.location.origin;

  // NOTE: New setup -- use when running both front-end, and back-end server locally.
  //       In browser, use http://xxsupportphu1.vcap.me:3001/
  // BASE_URL = 'http://xxsupportphu1.vcap.me:6001';

  angular.module('icon', [
    'app',

    'icon.components',
    'icon.directives',
    'icon.filters',
    'icon.models',
    'icon.services',
    'icon.views',

    /* Service Factories */
    'icon.Retrieval',
    'icon.acceptLegalAgreementService',
    'icon.yellowCardFormatterService',

    /* External libraries */
    'mgcrea.bootstrap.affix',
    'ui.router',
    'ui.bootstrap',
    'ngMessages',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'angularFileUpload',
    'ui.mask',
    'angularMoment',
    'angular-jwt',
    'angulartics',
    // 'ngAnimate', /* This package is causing an intermittent bug. */
    'toaster',
    'ng.deviceDetector',
    'duScroll'
  ])

  .constant('ICON_API', {
    BASE_URL: BASE_URL,

    // Token APIs
    GET_SESSION_TOKEN:          `${BASE_URL}/api/token/session`,
    REFRESH_SESSION_TOKEN:      `${BASE_URL}/api/token/refresh/session`,
    GET_TRANSACTION_TOKEN:      `${BASE_URL}/api/token/submission`,
    REFRESH_TRANSACTION_TOKEN:  `${BASE_URL}/api/token/refresh/submission`,

    // New v2 lookup APIs
    LOOKUP_DISEASES:      `${BASE_URL}/api/lookup/disease`,
    LOOKUP_IMMUNIZATIONS: `${BASE_URL}/api/lookup/immunization`,
    LOOKUP_AGENT_TRADE:   `${BASE_URL}/api/lookup/agent-trade`,
    LOOKUP_LOTS:          `${BASE_URL}/api/lookup/lots`,

    // Old lookup APIs (deprecated in v2)
    // TODO: remove unused APIs once they've been factored out
    ADDRESS:  `${BASE_URL}/api/lookup/address`,
    CITY:     `${BASE_URL}/api/lookup/city`,
    DISEASE:  `${BASE_URL}/api/lookup/disease`,
    SCHOOL:   `${BASE_URL}/api/lookup/school`,
    VACCINE:  `${BASE_URL}/api/lookup/vaccine`,

    // PDF generation
    GENERATE_PDF: `${BASE_URL}/api/pdf`,

    // Submission APIs
    FILE_UPLOAD:          `${BASE_URL}/api/SubmissionAttachments`,
    SUBMIT_IMMUNIZATIONS: `${BASE_URL}/api/ImmunizationSubmissions`,

    // Retrieval APIs
    RETRIEVE_IMMUNIZATION_RECORD: `${BASE_URL}/api/yellowCard`,

    // Analytics / tracking API
    TRACKING: `${BASE_URL}/api/tracking`,
  })

  .constant('DISEASE_YC_ORDER',
    {
      '397428000':   1,   // Diphtheria
      '76902006':    2,   // Tetanus
      '27836007':    3,   // Pertussis
      '398102009':   4,   // Polio
      '406583002':   5,   // Hib
      '16814004':    6,   // Pneumococcal
      '186150001':   7,   // Rotavirus
      '14189004':    8,   // Measles
      '36989005':    9,   // Mumps
      '36653000':   10,   // Rubella
      '38907003':   11,   // Varicella
      '23511006':   12,   // Meningococcal
      '66071002':   13,   // Hepatitis B
      '240532009':  14,   // HPV
      '6142004':    15,   // Influenza
      '40468003':   16,   // Hepatitis A
      'DEFAULT':   999,   // Everything else
    }
  )

  .constant('ICON_RGX', {
    rgx: {
      NAME: /^[a-zàâçéèêëîïôûùüÿñæœ !.'\-]*$/i,
      EMAIL_ADDRESS: /^(?!.*\.{2})([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+([\.][a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*)@((([\-]?[a-zA-Z0-9]){2,}[\.])*(([a-zA-Z0-9][\-]?))+).(([\.]([a-zA-Z0-9][\-]?){2,}([a-zA-Z0-9])*)+)$/,
      PHONE_NUMBER: /^(\(?\+?[0-9]{1,3}\)?)?[. \-]?\(?[2-9]{1}[0-9]{2}\)?[. \-]?\d{3}[. \-]?\d{4}$/i,
      PHONE_EXTENSION: /^\d*$/i,
      STREET_NAME: /^[0-9a-zàâçéèêëîïôûùüÿñæœ &'.#,\-]*$/i,
      STREET_NUMBER: /^[a-z0-9 \-#]*$/i,
      STREET_TYPE: /^[a-zàâçéèêëîïôûùüÿñæœ .\-]*$/i,
      STREET_DIRECTION: /^[a-zàâçéèêëîïôûùüÿñæœ .\-]*$/i,
      UNIT_NUMBER: /^[a-z0-9 \-#]*$/i,
      LINE2:  /^[a-z0-9 \-#]*$/i,
      CITY: /^[0-9a-zàâçéèêëîïôûùüÿñæœ ()@&!'.,\-]*$/i,
      POSTAL: /^[abceghjklmnprstvxy]\d[abceghjklmnprstvwxyz]( )?\d[abceghjklmnprstvwxyz]\d$/i,
      SCHOOL_NAME: /^[0-9a-zàâçéèêëîïôûùüÿñæœ ()@&!'.,\-]*$/i,
      COMMENT: /^[a-zàâçéèêëîïôûùüÿñæœ !'"\-+&$%#@:;«»().,]*$/i,
      OIID: /^[2-9b-df-hj-np-tv-xz]{4}[\- ]?[2-9b-df-hj-np-tv-xz]{3}[\- ]?[2-9b-df-hj-np-tv-xz]{3}[\- ]?$/i,
      OIID_PIN: /^\d*$/i,
      HCN: /^\d{4}\s?\-?\d{3}\s?\-?\d{3}$/,
      LOT:/^[0-9a-zA-Z]+$/i,
      GATING: /^\d*$/i,
      AGENT_SNOMED: /^\d*$/i,
      EXT: /^\d*$/i
    }
  })

  .constant('ICON_FILE_UPLOAD', {
    MAX_COUNT: 2,
    MAX_SIZE: (1024 * 1024 * 5),
    VALID_EXTENSIONS: ['doc', 'docx', 'jpeg', 'jpg', 'pdf', 'png'],
  })

  .constant('ICON_EVENT', {
    ANALYTICS_EVENT_TRACK:    '$analyticsEventTrack',
    ANALYTICS_PAGE_TRACK:     '$analyticsPageTrack',
    TOKEN_SESSION_EXPIRY:     '$tokenSessionExpiry',
    TOKEN_SESSION_KILL:       '$tokenSessionKill',
    TOKEN_TRANSACTION_EXPIRY: '$tokenTransactionExpiry',
  })

  .constant('ICON_NOTIFICATION', {
    // NOTE: Progress modals are NOT dismissable, therefore push (opening),
    //       and pop (closing) must be done programatically.
    PUSH_SUBMISSION_PROGRESS:         '$pushProgressSubmission',
    PUSH_RETRIEVAL_PROGRESS:          '$pushProgressRetrieval',
    PUSH_YELLOW_CARD_PDF_PROGRESS:    '$pushProgressYellowCardPdf',
    PUSH_CONFIRMATION_PDF_PROGRESS:   '$pushProgressConfirmationPdf',

    POP_SUBMISSION_PROGRESS:          '$popProgressSubmission',
    POP_RETRIEVAL_PROGRESS:           '$popProgressRetrieval',
    POP_YELLOW_CARD_PDF_PROGRESS:     '$popProgressYellowCardPdf',
    POP_CONFIRMATION_PDF_PROGRESS:    '$popProgressConfirmationPdf',

    // NOTE: Modals are dismissable by the user taking an action,
    //       or programatically.
    PUSH_TRANSACTION_TOKEN_TIMEOUT:   '$pushTransactionTokenTimeout',
    POP_TRANSACTION_TOKEN_TIMEOUT:    '$popTransactionTokenTimeout',

    // Informational and error notifications are user dismissable.
    INFO_PATIENT_DATA_CLEARED:        '$infoPatientDataCleared',
    INFO_SESSION_EXPIRED:             '$infoSessionExpired',

    WARN_DOCUMENT_FILE_BAD_TYPE:      '$warnDocumentFileBadType',
    WARN_DOCUMENT_FILE_TOO_LARGE:     '$warnDocumentFileTooLarge',
    WARN_DOCUMENT_FILE_DUPLICATE:     '$warnDocumentFileDuplicate',
    WARN_DOCUMENT_FILE_QUEUE_LIMIT:   '$warnDocumentFileQueueLimit',

    WARN_RETRIEVAL_CONSENT_BLOCK:     '$warnRetrievalConsentBlock',
    WARN_RETRIEVAL_BAD_OIID:          '$warnRetrievalBadOiid',
    WARN_RETRIEVAL_BAD_PIN:           '$warnRetrievalBadPin',
    WARN_RETRIEVAL_NETWORK_PROBLEM:   '$warnRetrievalNetworkProblem',
    WARN_RETRIEVAL_UNKNOWN:           '$warnRetrievalUnknown',

    WARN_SUBMISSION_INVALID_FHIR:     '$warnSubmissionInvalidFhir',
    WARN_SUBMISSION_NETWORK_PROBLEM:  '$warnSubmissionNetworkProblem',
    WARN_SUBMISSION_UNKNOWN:          '$warnSubmissionUnkown',

    WARN_GENERAL_NETWORK_PROBLEM:     '$warnGeneralNetworkProblem',
  })

  .constant('ICON_ERROR', require('./ICON_ERROR.js'))

  .run(['$rootScope', '$state', 'uiMaskConfig', function ($rootScope, $state, uiMaskConfig) {
    //Globally set UIMask to clear
    uiMaskConfig.clearOnBlur = false;
    $rootScope.$state = $state;
    // Jump to top of page when route changes
    $rootScope.$on('$stateChangeSuccess', function () {
       window.document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  }])

/* Localization configuration *************************************************/
  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider
    .addInterpolation('$translateMessageFormatInterpolation')
    .preferredLanguage('en')
    .useLoader('Localization')
    .useSanitizeValueStrategy('escapeParameters');
  }])
  .config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('./lib/angular-locale_{{locale}}-ca.js');
  }])
/* End localization */

/* Analytics configuration ****************************************************/
/* NOTE: Uses event system to dispatch analytics events to a service,
         this is because services are not available during .config() evaluation. */
  .config(['$analyticsProvider', 'ICON_EVENT', function ($analyticsProvider, ICON_EVENT) {
    $analyticsProvider.registerPageTrack((path) => {
      window.document.dispatchEvent(new CustomEvent(
        ICON_EVENT.ANALYTICS_PAGE_TRACK,
        { detail: path, bubbles: true, cancelable: true }
      ));
    });

    $analyticsProvider.registerEventTrack((action, properties) => {
      window.document.dispatchEvent(new CustomEvent(
        ICON_EVENT.ANALYTICS_EVENT_TRACK,
        { detail: action, bubbles: true, cancelable: true }
      ));
    });
  }])

  .run(['AnalyticsLogger', 'ICON_EVENT', function (AnalyticsLogger, ICON_EVENT) {
    window.document.addEventListener(
      ICON_EVENT.ANALYTICS_PAGE_TRACK,
      AnalyticsLogger.handlePageTrack
    );

    window.document.addEventListener(
      ICON_EVENT.ANALYTICS_EVENT_TRACK,
      AnalyticsLogger.handleEventTrack
    );
  }])
/* End analytics config */

  .config(['$uiViewScrollProvider', function ($uiViewScrollProvider) {
    $uiViewScrollProvider.useAnchorScroll();
  }])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    /* Suppresses error messages for transitions (See index JS transitions)  */
    $stateProvider.stateService.defaultErrorHandler((e) => {
      //console.warn(e);
    });

    var Routes = require('./views/routes.js');
    $stateProvider
      .state('welcome', Routes.WELCOME)

      .state('auth', Routes.AUTH)

        .state('auth.self',   Routes.SELF)
        .state('auth.self.login', Routes.LOGIN)
        .state('auth.self.patient',       Routes.AUTH_PATIENT)
        .state('auth.self.submission',    Routes.AUTH_SELF_SUBMISSION)
          .state('auth.self.submission.immunizations',  Routes.AUTH_IMMUNIZATIONS)
          .state('auth.self.submission.documents',      Routes.DOCUMENTS)
          .state('auth.self.submission.patient',        Routes.AUTH_SELF_PATIENT)
          .state('auth.self.submission.review',         Routes.AUTH_SELF_REVIEW)
          .state('auth.self.submission.confirmation',   Routes.AUTH_CONFIRMATION)

        .state('auth.other',  Routes.OTHER)
        .state('auth.other.login', Routes.LOGIN)
        .state('auth.other.patient',      Routes.AUTH_PATIENT)
        .state('auth.other.submission',   Routes.AUTH_OTHER_SUBMISSION)
          .state('auth.other.submission.immunizations', Routes.AUTH_IMMUNIZATIONS)
          .state('auth.other.submission.documents',     Routes.DOCUMENTS)
          .state('auth.other.submission.patient',       Routes.AUTH_OTHER_PATIENT)
          .state('auth.other.submission.submitter',     Routes.SUBMITTER)
          .state('auth.other.submission.review',        Routes.AUTH_OTHER_REVIEW)
          .state('auth.other.submission.confirmation',  Routes.AUTH_CONFIRMATION)

      .state('anon', Routes.ANON)

        .state('anon.self', Routes.SELF)
          .state('anon.self.submission',  Routes.ANON_SELF_SUBMISSION)
            .state('anon.self.submission.patient',       Routes.ANON_SELF_PATIENT)
            .state('anon.self.submission.address',       Routes.ADDRESS)
            .state('anon.self.submission.immunizations', Routes.ANON_IMMUNIZATIONS)
            .state('anon.self.submission.documents',     Routes.DOCUMENTS)
            .state('anon.self.submission.review',        Routes.ANON_SELF_REVIEW)
            .state('anon.self.submission.confirmation',  Routes.ANON_CONFIRMATION)

        .state('anon.other', Routes.OTHER)
          .state('anon.other.submission',  Routes.ANON_OTHER_SUBMISSION)
            .state('anon.other.submission.patient',      Routes.ANON_OTHER_PATIENT)
            .state('anon.other.submission.address',      Routes.ADDRESS)
            .state('anon.other.submission.immunizations',Routes.ANON_IMMUNIZATIONS)
            .state('anon.other.submission.documents',    Routes.DOCUMENTS)
            .state('anon.other.submission.submitter',    Routes.SUBMITTER)
            .state('anon.other.submission.review',       Routes.ANON_OTHER_REVIEW)
            .state('anon.other.submission.confirmation', Routes.ANON_CONFIRMATION);

    $urlRouterProvider.otherwise('/welcome');
  }]);

}());
