(function () {
'use strict';

  module.exports = {
    bindings: {
      model: '=',
      minDate: '@?',
      maxDate: '@?',
      formName: '<',
      inputId: '@',
      inputName: '@',
      required: '@',
      onAfterSelect: '&',
    },
    templateUrl: './components/form/datepicker/datepicker.template.html',
    controller: datepickerController,
    transclude: true,
  };

  datepickerController.$inject = ['moment'];
  function datepickerController (moment) {
    this.$onInit = () => {

      this.dateMaskOptions = {
        maskDefinitions: {
          'A': /[0-9]/
        },
        addDefaultPlaceholder:false
      };

      this.date = moment(this.model, 'YYYY-MM-DD').toDate();
      this.required = !!this.required || false;

      this.getMinMaxDates = () => {
        this.minDate = (this.minDate)
                        ? moment(this.minDate, 'YYYY-MM-DD').toDate()
                        : moment('1900-01-01', 'YYYY-MM-DD').toDate();
        this.maxDate = (this.maxDate)
                        ? moment(this.maxDate, 'YYYY-MM-DD').toDate()
                        : new Date();
      };

      this.datePickerFormat = [ 'yyyy-MM-dd' ];
      this.getMinMaxDates();
      this.datepickerOptions = {
        datepickerMode: 'year',
        minDate:        this.minDate,
        maxDate:        this.maxDate,
        showWeeks:      false,
      };
      this.popup = { opened: false };

      this.open = () => { this.popup.opened = true; };

      this.checkDateRange = () => {

        /* For clear button*/
        if(!this.date) {
          this.datepickerOptions.datepickerMode = 'year';
        }

        if (this.date) {
          this.model = moment(this.date, 'YYYY-MM-DD').toDate();
          this.getMinMaxDates();

          if (moment(this.date, 'YYYY-MM-DD').toDate() < this.minDate) {
            this.formName[this.inputName].$setValidity('date', false);
          }

          else if (moment(this.date, 'YYYY-MM-DD').toDate() > this.maxDate) {
            this.formName[this.inputName].$setValidity('date', false);
          }
        }

        if (!!this.onAfterSelect) this.onAfterSelect({ date: this.model });
      };
    };
  }

}());
