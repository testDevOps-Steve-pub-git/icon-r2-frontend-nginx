authOtherReviewController.$inject = ['$state', 'ImmunizationRecordService'];
function authOtherReviewController ($state, ImmunizationRecordService) {
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
  controller: authOtherReviewController,
  template: `
   <h1>{{ 'authOtherReview.REVIEW' | translate}}</h1>
    <form id="reviewForm" name="reviewForm" novalidate>
      <h4>{{ 'authOtherReview.IMMUNIZATIONS' | translate }}</h4>

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
            button-text="{{'authOtherReview.EDIT' | translate}} {{'authOtherReview.IMMUNIZATIONS_TITLE' | translate}}"
            go-to-route="^.immunizations">
          </edit-button>
        </div>
      </div>
      <hr/>

      <h4>{{ 'authOtherReview.DOCUMENT_PLACEHOLDER' | translate }}</h4>
      <div class="row">
        <document-upload-display is-editable="false"></document-upload-display>
      </div>
      <div class="row">
        <div class="col-xs-12">
           <edit-button
            button-id="review-edit-documents-button"
            button-text="{{'authOtherReview.EDIT' | translate}} {{'authOtherReview.DOCUMENTS_TITLE' | translate}}"
            go-to-route="^.documents">
          </edit-button>
        </div>
      </div>
      <hr/>

     <patient-other-display
        client-info="$ctrl.clientInfo">
      </patient-other-display>
      <hr />

      <submitter-display
        submitter-info="$ctrl.submitterInfo">
      </submitter-display>
      <hr/>

      <submit-immunizations></submit-immunizations>
    </form>
  `
};
