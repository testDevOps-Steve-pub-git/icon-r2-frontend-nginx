welcomeController.$inject = [
  'EditReviewService',
  'FileUploadHandler',
  'GatingQuestionService',
  'ImmunizationRecordService',
  'MiscData',
  'Notify',
  'SessionHandler',
  'TokenHandler',
  'ICON_NOTIFICATION'
];
function welcomeController (
  EditReviewService,
  FileUploadHandler,
  GatingQuestionService,
  ImmunizationRecordService,
  MiscData,
  Notify,
  SessionHandler,
  TokenHandler,
  ICON_NOTIFICATION
) {

  this.$onInit = () => {
    /* Reset */
    ImmunizationRecordService.clear();
    GatingQuestionService.reset();
    TokenHandler.clearTransactionToken();
    EditReviewService.setFromReviewPage(false);
    MiscData.setSkipAUP(false);

    /* There was a bug where session expiration did not clear the queue after, so manually clear a queue*/
    FileUploadHandler.getUploader()
      .then((uploader) => {
        this.uploader = uploader;
        this.uploader.clearQueue();
      });

    let firstPageLoad = MiscData.getFirstPageLoad();
    if (firstPageLoad) MiscData.setFirstPageLoad(false);
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
