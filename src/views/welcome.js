welcomeController.$inject = ['ImmunizationRecordService', 'GatingQuestionService','Notify', 'ICON_NOTIFICATION', 'TokenHandler', 'MiscData'];
function welcomeController (ImmunizationRecordService, GatingQuestionService, Notify, ICON_NOTIFICATION, TokenHandler, MiscData) {

  this.$onInit = () => {
    ImmunizationRecordService.clear();
    GatingQuestionService.reset();
    TokenHandler.clearTransactionToken();

    let firstPageLoad = MiscData.getFirstPageLoad();
    if (!firstPageLoad) {
      Notify.publish(ICON_NOTIFICATION.INFO_PATIENT_DATA_CLEARED);
    }
    else {
      MiscData.setFirstPageLoad(false);
    }
  };

}

module.exports = {
  controller: welcomeController,
  template: `
    <main>
      <welcome-landing-page></welcome-landing-page>

      <welcome-login></welcome-login>

      <ontario-immunization-schedule></ontario-immunization-schedule>
    </main>
  `
};
