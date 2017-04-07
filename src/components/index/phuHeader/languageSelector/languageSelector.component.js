(function () {
'use strict';

  module.exports = {
    templateUrl: './components/index/phuHeader/languageSelector/languageSelector.template.html',
    controller: languageSelectorController,
  };

  languageSelectorController.$inject = ['$state', '$translate'];
  function languageSelectorController ($state, $translate) {
    this.$onInit = () => {
      this.lang = { EN: 'en', FR: 'fr' };
      this.currentLanguage = $translate.use();

      this.isCurrentLanguage = (lang) => { return (lang === this.currentLanguage) };

      this.updateLocalization = (lang) => {
        this.currentLanguage = lang;
        $translate.use(this.currentLanguage);
      };
    }
  }

}());
