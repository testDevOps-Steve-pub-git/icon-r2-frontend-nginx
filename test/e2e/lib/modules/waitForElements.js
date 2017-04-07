 /**
 * Created on 2017-01-05.
 * A function that returns a promise to allow for waiting on array of web elements.
 * @namespace waitForElements 
 */
(function() {
'use strict';
  var TIMEOUT_TIME = 10000;

  module.exports = {
    waitForElements: waitForElements,
    TIMEOUT_TIME: TIMEOUT_TIME
  }

  function waitForElements(elementID) {
    var waitPromise;
    elementID.forEach((elem) => {
      waitPromise = browser.wait(() => {
        return browser.isElementPresent(element(by.css(elem)));
      },TIMEOUT_TIME)
    });
    return waitPromise;
  }
}());
