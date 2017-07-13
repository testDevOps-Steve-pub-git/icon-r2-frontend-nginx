/**
 * Created on 2017-01-23.
 * Confirmation component for confirmation message on final page
 */
/* @ngInject */
function confirmationMessage$ctrl (ImmunizationRecordService, Multitenancy, PdfMaker, TokenHandler) {
  this.$onInit = () => {
    Multitenancy
    .getPhuKeys()
    .then((phuAssets) => { this.multitenancy = phuAssets })

    let clientInfo = ImmunizationRecordService.getPatient()

    TokenHandler
    .getSessionToken()
    .then((token) => {
      this.sessionToken = token.decoded
    })
    .then(TokenHandler.getTransactionToken)
    .then((token) => { this.transactionToken = token.decoded.submissionId })
    .catch(console.warn)

    this.clientName = `${clientInfo.firstName} ${clientInfo.lastName}`
    this.openConfirmationPdf = PdfMaker.openConfirmationPdf
  }
}

export default {
  name: 'confirmationMessage',
  component: {
    templateUrl: './components/confirmation/confirmationMessage/confirmationMessage.template.html',
    controller: confirmationMessage$ctrl
  }
}
