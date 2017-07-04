/**
 * Initial View when user logs in with OIID and PIN, before submitting
 */
 authPatientController.$inject = ['$uibModal'];
 function authPatientController ($uibModal) {

  this.$onInit = ()=> {
    this.openSurveyModal = () => {
      var modalInstance = $uibModal.open({
        template: `<auth-survey $close="$close(result)"></auth-survey>`,
        controller: () => {},
        size: 'sm',
      }).result
        .catch((error)=>{});
    };
  };
}

module.exports = {
  bindings: { data: '<' },
  controller: authPatientController,
  template: `
    <div class="col-xs-12 col-sm-8 col-sm-offset-2">
      <h1>{{ 'authPatient.IMMUNIZATION_RECORD' | translate }}</h1>

      <patient-auth-display
      page="login"
      client-info="$ctrl.clientInfo">
      </patient-auth-display>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <yellow-card-display></yellow-card-display>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <yellow-card-recommendations></yellow-card-recommendations>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="col-sm-8 col-sm-offset-2">
          <hr />

          <h2>{{ 'authPatient.INFORMATION_MISSING' | translate }}</h2>

          <button class="btn btn-primary" ui-sref="^.submission.immunizations">{{ 'authPatient.SUBMIT_IMMUNIZATIONS' | translate }}</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="row col-xs-12 col-sm-8 col-sm-offset-2">
          <h2>{{ 'authPatient.RETURN_HOME_LABEL' | translate }}</h2>

          <button class="btn btn-primary" ng-click="$ctrl.openSurveyModal()">{{ 'authPatient.RETURN_HOME' | translate }}</button>
        </div>
      </div>
    </div>
  `
};
