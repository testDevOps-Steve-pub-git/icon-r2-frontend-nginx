anonOtherReviewController.$inject = ['ImmunizationRecordService'];
function anonOtherReviewController (ImmunizationRecordService) {

  this.$onInit = () => {
    this.clientInfo = ImmunizationRecordService.getPatient();
    this.submitterInfo = ImmunizationRecordService.getSubmitter();
    this.addressInfo = ImmunizationRecordService.getAddress();
    this.immunizations = ImmunizationRecordService.getNewImmunizations();
  }
}

module.exports = {
  controller: anonOtherReviewController,
  template: `
    <h1>{{ 'progressBar.REVIEW' | translate}}</h1>
    <form id="reviewForm" name="reviewForm" novalidate>

      <h4>{{ 'anonOtherReview.IMMUNIZATIONS' | translate }}</h4>

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
            button-text="{{'anonOtherReview.EDIT' | translate}} {{'anonOtherReview.IMMUNIZATIONS_TITLE' | translate}}"
            go-to-route="^.immunizations">
          </edit-button>
        </div>
      </div>
      <hr/>

      <h4>{{ 'anonOtherReview.DOCUMENT_PLACEHOLDER' | translate }}</h4>
      <div class="row">
        <document-upload-display is-editable="false"></document-upload-display>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <edit-button
            button-id="review-edit-documents-button"
            button-text="{{'anonOtherReview.EDIT' | translate}} {{'anonOtherReview.DOCUMENTS_TITLE' | translate}}"
            go-to-route="^.documents">
          </edit-button>
        </div>
      </div>
      <hr/>

      <patient-other-display
        client-info="$ctrl.clientInfo">
      </patient-other-display>
      <hr />

      <address-display
        address-info="$ctrl.addressInfo">
      </address-display>
      <hr />

      <submitter-display
        submitter-info="$ctrl.submitterInfo">
      </submitter-display>
      <hr/>

      <submit-immunizations></submit-immunizations>
    </form>
  `
};
