/* @ngInject */
function ageDisplay$ctrl (moment) {
  this.$onChanges = () => {
    let difference = moment.duration(
      moment(this.date, 'YYYY-MM-DD')
            .diff(moment(this.dateOfBirth, 'YYYY-MM-DD'))
    )

    this.age = {
      years: Math.floor(difference.asYears()) || 0,
      months: Math.floor(difference.asMonths() % 12) || 0,
      days: difference._data.days || 0
    }
    if (difference._data.days > 15) {
      if (this.age.months === 12) { this.age.years++ } else { this.age.months++ }
    }
  }
}

export default {
  name: 'ageDisplay',
  component: {
    bindings: {
      dateOfBirth: '<',
      date: '<'
    },
    controller: ageDisplay$ctrl,
    templateUrl: './components/immunization/ageDisplay/ageDisplay.template.html'
  }
}
