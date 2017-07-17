import dependencies from './dependencies.module.js'

import index from './index.controller.js'

import components from './components/components.module.js'
import directives from './directives/directives.module.js'
import filters from './filters/filters.module.js'
import models from './models/models.module.js'
import services from './services/services.module.js'
import views from './views/views.module.js'

import rejectDhirFalsePositive from './interceptors/rejectDhirFalsePositive.interceptor.js'
import ICON_NOTIFICATION from './ICON_NOTIFICATION.js'
import DHIR_ERROR from './DHIR_ERROR.js'
import Routes from './views/routes.js'

// Polyfill for window location origin
if (!window.location.origin) window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
let BASE_URL = window.location.origin

// NOTE: New setup -- use when running both front-end, and back-end server locally.
//       In browser, use http://xxsupportphu1.vcap.me:3001/
// BASE_URL = 'http://xxsupportphu1.vcap.me:6001'

angular.module('icon', [
  'app',

  'icon.components',
  'icon.directives',
  'icon.filters',
  'icon.models',
  'icon.services',
  'icon.views',

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
  'ngAnimate', /* This package is causing an intermittent bug. */
  'ng.deviceDetector',
  'duScroll',
  'angularCSS'
])

.constant('ICON_API', {
  BASE_URL: BASE_URL,

  /* PIN APIs for 2.1 */
  PIN_URL: `${BASE_URL}/api/access`,

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
  RETRIEVE_IMMUNIZATION_RECORD: `${BASE_URL}/api/immunizationRetrieval`,

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
    NAME: /^[0-9a-zàâçéèêëîïôûùüÿñæœ !.'\-]*$/i,
    EMAIL_ADDRESS: /^(?!.*\.{2})([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+([\.][a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*)@((([\-]?[a-zA-Z0-9]){2,}[\.])*(([a-zA-Z0-9][\-]?))+).(([\.]([a-zA-Z0-9][\-]?){2,}([a-zA-Z0-9])*)+)$/,
    PHONE_EXTENSION: /^\d*$/i,
    STREET_NAME: /^[0-9a-zàâçéèêëîïôûùüÿñæœ &'.#,\-]*$/i,
    STREET_NUMBER: /^[a-z0-9 \-#]*$/i,
    STREET_TYPE: /^[a-zàâçéèêëîïôûùüÿñæœ .\-]*$/i,
    STREET_DIRECTION: /^[a-zàâçéèêëîïôûùüÿñæœ .\-]*$/i,
    UNIT_NUMBER: /^[a-z0-9 \-#]*$/i,
    LINE2:  /^[a-z0-9 \-#]*$/i,
    CITY: /^[0-9a-zàâçéèêëîïôûùüÿñæœ ()@&!'.,\-]*$/i,
    POSTAL: /^[abceghjklmnprstvxy]\d[abceghjklmnprstvwxyz]( )?\d[abceghjklmnprstvwxyz]\d$/i,
    SCHOOL_NAME: /^[0-9a-zàâçéèêëîïôûùüÿñæœ ()@&!'’.,\-#/\?]*$/i,
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

.constant('DHIR_ERROR',         DHIR_ERROR)
.constant('ICON_NOTIFICATION',  ICON_NOTIFICATION)

.run(['$rootScope', '$state', 'uiMaskConfig', function ($rootScope, $state, uiMaskConfig) {
  //Globally set UIMask to clear
  uiMaskConfig.clearOnBlur = false;
  $rootScope.$state = $state;
  // Jump to top of page when route changes
  $rootScope.$on('$stateChangeSuccess', function () {
     window.document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
}])

/** Intercepts $http calls to reject false positive responses from DHIR.
NOTE: Causes DHIR responses with an operation outcome to be thrown to the
      caller's $q.catch() block instead of $q.then() when an operation
      outcome is found with a 200 HTTP code.
*/
.config(['$httpProvider', ($httpProvider) => {
  $httpProvider.interceptors.push(['$q', rejectDhirFalsePositive]);
}])
/* End interceptor */

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
  /* Suppresses error messages for transitions (See index JS transitions) */
  $stateProvider.stateService.defaultErrorHandler(() => {});

  $stateProvider
    .state('welcome', Routes.WELCOME)

    .state('aup', Routes.AUP)

    .state('verification', Routes.VERIFICATION)
      .state('verification.enter-pin',  Routes.ENTER_PIN)

      .state('verification.new-pin',              Routes.NEW_PIN)
      .state('verification.set-pin',              Routes.SET_PIN)
      .state('verification.set-pin-confirmation', Routes.SET_PIN_CONFIRMATION)

      .state('verification.forgot-pin',                   Routes.FORGOT_PIN)
      .state('verification.email-confirmation',           Routes.EMAIL_CONFIRMATION)
      .state('verification.reset-pin',                    Routes.RESET_PIN)
      .state('verification.reset-pin-confirmation',       Routes.RESET_PIN_CONFIRMATION)
      .state('verification.send-another-email',           Routes.SEND_ANOTHER_EMAIL)
      .state('verification.dispatch-after-verification',  Routes.DISPATCH_AFTER_VERIFICATION)

    .state('submission',  Routes.SUBMISSION)

    .state('auth',        Routes.AUTH)

      .state('auth.self',   Routes.SELF)
      .state('auth.self.patient',       Routes.AUTH_PATIENT)
      .state('auth.self.submission',    Routes.AUTH_SELF_SUBMISSION)
        .state('auth.self.submission.immunizations',  Routes.AUTH_IMMUNIZATIONS)
        .state('auth.self.submission.documents',      Routes.DOCUMENTS)
        .state('auth.self.submission.patient',        Routes.AUTH_SELF_PATIENT)
        .state('auth.self.submission.review',         Routes.AUTH_SELF_REVIEW)
        .state('auth.self.submission.confirmation',   Routes.AUTH_CONFIRMATION)

      .state('auth.other',  Routes.OTHER)
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
}])

// NOTE: This runs whenever the application bootstraps on page load.
//       By forcing a state transition, the user is prevented from loading the
//       application in a mid-completion state.
.run(['$state', '$timeout', function ($state, $timeout) {

  // TODO: Factor out $timeout, find a way to use $state async when it's ready.
  // $timeout(() => {
  //   const INITIAL_STATE_WHITELIST = [ 'welcome', 'reset-pin' ]
  //   const isInitialStateAllowed = INITIAL_STATE_WHITELIST.some($state.is)
  //   if (!isInitialStateAllowed) $state.go('welcome')
  // })

}])
// Comment the above function ^^^ if you want to be able to hot-reload on any screen for development.
