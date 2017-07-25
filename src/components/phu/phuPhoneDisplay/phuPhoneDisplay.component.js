/**
 * Created on 2017-07-20
 */
/* @ngInject */
function phuPhoneDisplay$ctrl (Multitenancy, $translate) {
  this.$onInit = () => {
    Multitenancy.getPhuKeys()
                .then((phuAssets) => { this.multitenancy = phuAssets })
    this.translate = $translate.instant
  }
}

export default {
  name: 'phuPhoneDisplay',
  component: {
    templateUrl: '../../components/phu/phuPhoneDisplay/phuPhoneDisplay.template.html',
    controller: phuPhoneDisplay$ctrl
  }
}
