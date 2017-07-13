/**
 * Created on 2017-05-01.
 * Display component for grouping immunizations by agent
 * to be used on the review page
 */

/* @ngInject */
function immunizationReviewDisplayAgent$ctrl (ImmunizationRecordService) {
  this.$onInit = () => {
    /* If the user edits the DOB to be later than an Imms date, display an error */
    this.invalidDate = ImmunizationRecordService.checkDOBAgainstImmunizationDate(this.patient.dateOfBirth, this.immunizations)
  }
}

export default {
  name: 'immunizationReviewDisplayAgent',
  component: {
    templateUrl: './components/immunization/immunizationReviewDisplay/immunizationReviewDisplayAgent/immunizationReviewDisplayAgent.template.html',
    bindings: {
      patient: '<',
      immunizations: '<'
    },
    controller: immunizationReviewDisplayAgent$ctrl
  }
}
