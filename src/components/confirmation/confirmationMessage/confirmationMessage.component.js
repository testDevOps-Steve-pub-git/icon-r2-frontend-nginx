/**
 * Created on 2017-01-23.
 * Confirmation component for confirmation message on final page
 */
(function(){
'use strict';

  module.exports = {
    templateUrl: './components/confirmation/confirmationMessage/confirmationMessage.template.html',
    controller: confirmationMessageController,
  };

  confirmationMessageController.$inject = ['ImmunizationRecordService', 'Multitenancy', 'PdfMaker', 'TokenHandler'];
  function confirmationMessageController (ImmunizationRecordService, Multitenancy, PdfMaker, TokenHandler) {
    this.$onInit = () => {
      Multitenancy
      .getPhuKeys()
      .then((phuAssets) => { return this.multitenancy = phuAssets; });

      let clientInfo = ImmunizationRecordService.getPatient();

      TokenHandler
      .getSessionToken()
      .then((token) => { return this.sessionToken = token.decoded; })
      .then(TokenHandler.getTransactionToken)
      .then((token) => { return this.transactionToken = token.decoded.submissionId; })
      .catch(console.warn);

      this.clientName = `${clientInfo.firstName} ${clientInfo.lastName}`;
      this.openConfirmationPdf = PdfMaker.openConfirmationPdf;
    };

  }

})();
