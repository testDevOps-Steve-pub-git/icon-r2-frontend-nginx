/**
 * Component displaying PHU footer information, and for a global scroll-to-top button.
 * @namespace phuFooter
 */
/* @ngInject */
function phuFooter$ctrl ($state, Multitenancy) {
  this.$onInit = () => {
    Multitenancy.getPhuKeys()
                .then((phuAssets) => { this.multitenancy = phuAssets })
  }
  this.scrollToTop = (offsetPx) => {
    document.body.scrollTop = document.documentElement.scrollTop = offsetPx
    document.getElementById('content-skip').focus()
  }
}

export default {
  name: 'phuFooter',
  component: {
    templateUrl: './components/index/phuFooter/phuFooter.template.html',
    controller: phuFooter$ctrl
  }
}
