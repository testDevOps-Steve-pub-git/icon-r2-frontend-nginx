/**
 * Created on 2017-03-28.
 * Service for storing misc data
 */
(function() {
'use strict';

  module.exports = MiscData;

  function MiscData () {
    let firstPageLoad = true;       //Page firstload

    function setFirstPageLoad(choice){
      firstPageLoad = choice;
    }

    function getFirstPageLoad() {
      return firstPageLoad;
    }

    return {
      getFirstPageLoad: getFirstPageLoad,
      setFirstPageLoad: setFirstPageLoad
    };
  }

})();
