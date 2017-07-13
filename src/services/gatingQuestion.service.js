/**
 * Created on 2017-02-27.
 * Service to keep track of gating question selection
 * Gating choices are to keep the user button choices for the gating questions intact
 * Gating question values:
 * 1- Selected YES to Have you received a letter from your PHU?-International typeahead
 * 2- Selected YES to All the Immunizations being in Ontario - Ontario typeahead
 * 3- Selected YES to All the immunizations being in Canada - Canada typeahead
 * 4- Selected NO to All Immunizatons being in Canada - International typeahead
 *
 * Gating1Question: Letter from PHU?
 * Gating2Question: All Immunizations in Ontario?
 * Gating3Question: All Immunizations in Canada?
 * Gating4Question: Immunization displayed by agent or by date?
 *
 * Questions 1-3 are yes/no/unsure, question 4 is for the displayMode (date, or agent)
 */
/* @ngInject */
function GatingQuestionService () {
  let gatingQuestion = 1

  let gatingChoices = {
    question1Choice: '',
    question2Choice: '',
    question3Choice: '',
    question4Choice: ''
  }

  function reset () {
    gatingQuestion = 1
    gatingChoices = {
      question1Choice: '',
      question2Choice: '',
      question3Choice: '',
      question4Choice: ''
    }
  }

  function getGatingQuestion () {
    return gatingQuestion
  }

  function setGatingQuestion (value) {
    gatingQuestion = value
  }

  function setGatingChoices (value) {
    gatingChoices = value
  }

  function getGatingChoices () {
    return gatingChoices
  }

  return {
    reset: reset,
    getGatingQuestion: getGatingQuestion,
    setGatingQuestion: setGatingQuestion,
    getGatingChoices: getGatingChoices,
    setGatingChoices: setGatingChoices
  }
}

export default {
  name: 'GatingQuestionService',
  service: GatingQuestionService
}
