welcomeController.$inject = ['ImmunizationRecordService', 'GatingQuestionService','Notify', 'ICON_NOTIFICATION', 'TokenHandler', 'MiscData', 'EditReviewService', 'SessionHandler'];
function welcomeController (ImmunizationRecordService, GatingQuestionService, Notify, ICON_NOTIFICATION, TokenHandler, MiscData, EditReviewService, SessionHandler) {

  this.$onInit = () => {
    /* Reset */
    ImmunizationRecordService.clear();
    GatingQuestionService.reset();
    TokenHandler.clearTransactionToken();
    EditReviewService.setFromReviewPage(false);
    MiscData.setSkipAUP(false);

    let firstPageLoad = MiscData.getFirstPageLoad();
    if (!firstPageLoad) {
      // Notify.publish(ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED);
    }
    else {
      MiscData.setFirstPageLoad(false);
    }
  };
}

module.exports = {
  controller: welcomeController,
  template: `
    <div class="container">
      <main>
        <welcome-landing-page></welcome-landing-page>
  
        <welcome-login></welcome-login>
  
        <ontario-immunization-schedule></ontario-immunization-schedule>
      </main>
    </div>

  `
};
