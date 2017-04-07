authSelfReviewController.$inject = ['$state', 'ImmunizationRecordService'];
function authSelfReviewController ($state, ImmunizationRecordService) {
    this.progressBar = $state.$current.data.progressBar;

  this.$onInit = () => {
    this.clientInfo = ImmunizationRecordService.getPatient();
    this.submitterInfo = ImmunizationRecordService.getSubmitter();
    this.addressInfo = ImmunizationRecordService.getAddress();
    this.immunizations = ImmunizationRecordService.getNewImmunizations();
  }
}

module.exports = {
  bindings: { data: '<' },
  controller: authSelfReviewController,
  template: `
    <h1>{{ 'progressBar.REVIEW' | translate}}</h1>
    <form id="reviewForm" name="reviewForm" novalidate>
      <h4>{{ 'authSelfReview.IMMUNIZATIONS' | translate }}</h4>

      <div class="row">
        <div class="col-xs-12">
          <immunization-review-container
            patient="$ctrl.clientInfo"
            immunizations="$ctrl.immunizations">
          </immunization-review-container>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <edit-button
            button-id="review-edit-immunizations-button"
            button-text="{{'authSelfReview.EDIT' | translate}} {{'authSelfReview.IMMUNIZATIONS_TITLE' | translate}}"
            go-to-route="^.immunizations">
          </edit-button>
        </div>
      </div>
      <hr/>

      <h4>{{ 'authSelfReview.DOCUMENT_PLACEHOLDER' | translate }}</h4>
      <div class="row">
        <document-upload-display is-editable="false"></document-upload-display>
      </div>
      <div class="row">
        <div class="col-xs-12">
           <edit-button
            button-id="review-edit-documents-button"
            button-text="{{'authSelfReview.EDIT' | translate}} {{'authSelfReview.DOCUMENTS_TITLE' | translate}}"
            go-to-route="^.documents">
          </edit-button>
        </div>
      </div>
      <hr/>

      <patient-self-display
        client-info="$ctrl.clientInfo"
        submitter-info="$ctrl.submitterInfo">
      </patient-self-display>
      <hr/>

      <submit-immunizations></submit-immunizations>
    </form>
  `

};
