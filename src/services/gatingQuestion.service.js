/**
 * Created on 2017-02-27.
 * Service to keep track of gating question selection
 * Gating choices are to keep the user button choices for the gating questions intact
 * Gating questions:
 * 1- Selected YES to Have you received a letter from your PHU?-International typeahead
 * 2- Selected YES to All the Immunizations being in Ontario - Ontario typeahead
 * 3- Selected YES to All the immunizations being in Canada - Canada typeahead
 * 4- Selected NO to All Immunizatons being in Canada - International typeahead
 */
(function () {
  'use strict';
  module.exports = GatingQuestionService;

  function GatingQuestionService () {
    let gatingQuestion = 1;

    let gatingChoices = {
      question1Choice: '',
      question2Choice: '',
      question3Choice: ''
    };


    function reset() {
      gatingQuestion = 1;
      gatingChoices = {
        question1Choice: '',
        question2Choice: '',
        question3Choice: ''
      };
    }

    function getGatingQuestion () {
      return gatingQuestion;
    }

    function setGatingQuestion (value) {
      gatingQuestion = value;
    }

    function setGatingChoices(value) {
      gatingChoices = value;
    }

    function getGatingChoices() {
      return gatingChoices;
    }

    return {
      reset: reset,
      getGatingQuestion: getGatingQuestion,
      setGatingQuestion: setGatingQuestion,
      getGatingChoices: getGatingChoices,
      setGatingChoices: setGatingChoices
    };
  }

}());