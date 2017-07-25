/* @ngInject */
function languageSelector$ctrl ($state, $translate, Utility) {
  this.$onInit = () => {
    this.lang = { EN: 'en', FR: 'fr' }
    this.currentLanguage = $translate.use()

    this.isCurrentLanguage = (lang) => { return (lang === this.currentLanguage) }

    this.updateLocalization = (lang) => {
      this.currentLanguage = lang
      $translate.use(this.currentLanguage)
        .then(() => {
          Utility.updateTitle()
        })
    }
  }
}

export default {
  name: 'languageSelector',
  component: {
    templateUrl: './components/index/phuHeader/languageSelector/languageSelector.template.html',
    controller: languageSelector$ctrl
  }
}
