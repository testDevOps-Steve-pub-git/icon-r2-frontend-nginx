/**
 * Created on 2017-03-28.
 * Service for storing misc data
 */
/* @ngInject */
function MiscData () {
  let firstPageLoad = true       // Page firstload
  let skipAUP = false            // If user submits again, they do not have to redo the AUP screen

  function setFirstPageLoad (choice) {
    firstPageLoad = choice
  }

  function getFirstPageLoad () {
    return firstPageLoad
  }

  function getSkipAUP () {
    return skipAUP
  }

  function setSkipAUP (aup) {
    skipAUP = aup
  }

  return {
    getFirstPageLoad: getFirstPageLoad,
    setFirstPageLoad: setFirstPageLoad,
    getSkipAUP: getSkipAUP,
    setSkipAUP: setSkipAUP
  }
}

export default {
  name: 'MiscData',
  service: MiscData
}
