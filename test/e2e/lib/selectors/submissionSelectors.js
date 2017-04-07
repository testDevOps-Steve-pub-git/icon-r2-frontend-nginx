(function () {
'use strict';

  /* Gives context to CSS / ID selectors facilitating manipulation of various inputs required to mock user interaction. */
  module.exports = {
    /* Patient page specific. */
    patient: {
      firstName: '#patient-first-name',
      middleName: '#patient-middle-name',
      lastName: '#patient-last-name',
      healthCard: '#patient-hcn',
      birthDate: '#patient-dob',
      sex: {
        populate: '#patient-sex',
        male: '#patient-sex-male',
        female: '#patient-sex-female',
        other: '#patient-sex-other'
      },
      oiid: '#patient-oiid',
      schoolOrDayCare: '#patient-school',
    },

    /* Address page specific. */
    address: {
      postalAutoComplete: '#address-postal-autocomplete',
      type: {
        populate: '#address-type',
        street: '#address-type-street',
        rural: '#address-type-rural',
        poBox: '#address-type-pobox'
      },
      addressSkipTypeahead: '#address-skip-typeahead',
      ruralRouteNumber: '#address-rural-route',
      station: '#address-station',
      additionalInfo: "#address-additional-info",
      poBoxNumber: '#address-pobox-number',
      rpo: '#address-retail-post-outlet',
      streetNumber: '#address-street-number',
      streetName: '#address-street-name',
      streetDirection: '#address-street-direction',
      streetType: '#address-street-type',
      unitNumber: '#address-unit-number',
      city: '#address-city',
      province: '#address-province',
      postalCode: '#address-postal',
    },

    /* Immunizations page specific. */
    immunizations: {
      questionOne: {
        yes: '#immunizations-first-yes-button',
        no: '#immunizations-first-no-button'
      },
      questionTwo: {
        yes:'#immunizations-second-yes-button',
        no:'#immunizations-second-no-button',
        unsure:'#immunizations-second-unsure-button'
      },
      date: '#immunizations-date-input',
      dateEstimated: '#immunizations-approximate-label-',
      saveDate: '#immunizations-date-save',
      saveImmunization: '#immunizations-save',
      saveImmunizationAndAdd: '#immunizations-save-and-add',
      ageWhenImmunized: '#immunizations-immunization-age',
      add: '#immunizations-add',
      tradeName: '#immunizations-trade-brand',
      lotNumber: '#immunizations-lot-number',
      addImmunizationToDate: '#immunizations-add-immunization-to-date-',
      addDateToImmunization: '#immunizations-add-date-to-immunization-',
      dateHeader: '#immunizations-date-header-',
      dateEdit: '#immunizations-date-edit-',
      dateTitle: '#immunizations-date-',
      immunizationEdit: '#immunizations-immunization-edit-',
      immunizationHeader: '#immunizations-immunization-header-',
      immunizationTitle: '#immunizations-immunization-',
      deleteImmunization: '#immunizations-delete',
      groupByDates: '#immunizations-group-date',
      groupByImmunizations: '#immunizations-group-immunizations'
    },

    /* Documents page specific. */
    documents: {
      chooseFile : '#documents-file-upload-button'
    },

    submitter: {
      firstName: '#submitter-first-name',
      lastName: '#submitter-last-name',
      phoneNumber: '#submitter-phone',
      phoneExt: '#submitter-phone-extension',
      email: '#submitter-email',
      confirmEmail: '#submitter-email-confirm',
    },

    /* Review page specific. */
    review: {
      editPatient: '#review-edit-patient-button',
      editAddress: '#review-edit-address-button',
      editImmunizations: '#review-edit-immunizations-button',
      editDocuments: '#review-edit-documents-button',
      editSubmitter: '#review-edit-submitter-button'
    },

    /* Review page specific. */
    completion: {
      surveyLink: '#completion-survey-link',
      print: '#completion-print-button',
      startAnother: '#completion-start-another-button',
      home: '#completion-home-button'
    }
  };
}());
