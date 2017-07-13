/* @ngInject */
function oiidDisplayController () {
  this.$onInit = () => {
    this.oiidOptions = {
      maskDefinitions: {
        'A': /[2-9b-df-hj-np-tv-xzB-DF-HJ-NP-TV-XZ]/
      },
      addDefaultPlaceholder: false
    }
  }
}

export default {
  name: 'oiidDisplay',
  component: {
    bindings: {
      oiid: '<'
    },
    templateUrl: './components/form/oiidDisplay/oiidDisplay.template.html',
    controller: oiidDisplayController
  }
}
