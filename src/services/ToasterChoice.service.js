/**
 * Created on 2017-02-15.
 * To keep track of toaster choice, to display different toasters
 * For observer callback bit, based off slackoverflow: http://stackoverflow.com/questions/12576798/angularjs-how-to-watch-service-variables
 *
 * Current choices available to set toaster:
 * 'error' - error toaster
 * 'clear' - clear info toaster
 * 'session' - extend session toaster
 * 'loading' - loading data toaster
 */
(function() {
'use strict';

  module.exports = ToasterChoiceService;

  function ToasterChoiceService () {
    /* Variable Init */
    let observerCallBacks = [];
    let toasterChoice = 'null';
    let toasterParams = {
      title: '',
      body: ''
    };


    /**
     * Sets toaster params
     * @param params: params to set
     */
    function setToasterParams(params) {
      toasterParams = params;
    }

    /**
     * Gets toaster params to use in message
     * @returns {{title: string, body: string}} Current toaster params
     */
    function getToasterParams() {
      return toasterParams;
    }


    /* Setter and Getter */
    function getToasterChoice() {
      return toasterChoice;
    }

    function setToasterChoice(value) {
      toasterChoice = value;
      notifyObservers();
    }

    /* Observer callback functions*/
    function registerObserverCallback(callback){
      observerCallBacks.push(callback);
    }

    function notifyObservers(){
      angular.forEach(observerCallBacks, function(callback){
        callback();
      });
    }


    return {
      getToasterChoice: getToasterChoice,
      setToasterChoice: setToasterChoice,
      getToasterParams: getToasterParams,
      setToasterParams: setToasterParams,

      registerObserverCallback: registerObserverCallback,
    }
  }

})();
