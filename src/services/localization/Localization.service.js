(function () {
'use strict';
  module.exports = Localization;


  function Localization ($q, $timeout, $rootScope, tmhDynamicLocale) {

/* Private ********************************************************************/
    const EN = require('json!./dictionary_EN.json');
    const FR = require('json!./dictionary_FR.json');

    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      // Set the language attribute on the root html element.
      window.document.documentElement.setAttribute('lang', data.language);

      // Use angular-dynamic-locale to load and apply AngularJS $locale setting.
      // NOTE: replaces "_" character with "-" to match locale file naming convention
      tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
    });


/* Public *********************************************************************/
    return (language) => {
      return (language.key === 'fr') ? $q.when(FR) : $q.when(EN);
    }
  }
}());
