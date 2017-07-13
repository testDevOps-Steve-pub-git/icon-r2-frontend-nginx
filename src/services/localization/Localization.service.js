import EN from 'json-loader!./dictionary_EN.json'
import FR from 'json-loader!./dictionary_FR.json'

/* @ngInject */
function Localization ($q, $timeout, $rootScope, tmhDynamicLocale) {
/* Private ********************************************************************/

  $rootScope.$on('$translateChangeSuccess', function (event, data) {
    // Set the language attribute on the root html element.
    window.document.documentElement.setAttribute('lang', data.language)

    // Use angular-dynamic-locale to load and apply AngularJS $locale setting.
    // NOTE: replaces "_" character with "-" to match locale file naming convention
    tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'))
  })

/* Public *********************************************************************/
  return (language) => {
    return (language.key === 'fr') ? $q.when(FR) : $q.when(EN)
  }
}

export default {
  name: 'Localization',
  service: Localization
}
