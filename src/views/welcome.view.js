/* @ngInject */
function welcome$ctrl (
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

export default {
  name: 'welcome',
  view: {
    controller: welcome$ctrl,
    template: `
      <div class="container">
        <main>
          <div class="row">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1">
              <h1 class = "text-center" translate="welcomeLandingPage.INTRO_2" aria-label="{{'welcomeLandingPage.INTRO_2' | translate}}"></h1>
              <hr />
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1">
              <welcome-login-choice></welcome-login-choice>
            </div>
          </div>

          <welcome-instructions></welcome-instructions>

          <ontario-immunization-schedule></ontario-immunization-schedule>
        </main>
      </div>
    `
  }
}
