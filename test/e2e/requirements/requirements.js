/**
* A function for referencing and populating each of the ICON test requirement groups which are completed in the test case scenarios.
* @namespace icon.test.e2e.requirements 
*/
(function() {
'use strict';
  // The variable storing all of the objects that each of the requirement groups are dependent upon. 
  var lib = require('../lib/lib.js');
  // Populates the selected group of requirements with the neccessary objects.  
  var populate = function (requirementGroup) {
    return require(requirementGroup)(lib.fileUploader, lib.form, lib.wait, lib.global, lib.retrieval, lib.submission);
  };
  // Makes each of the the requirement groups visible to the test case scenarios.
  module.exports = {
    _1: () => {return populate('./_1.js')},
    _2: () => {return populate('./_2.js')},
    _3: () => {return populate('./_3.js')},
    _4: () => {return populate('./_4.js')},
    _5: () => {return populate('./_5.js')},
    _6: () => {return populate('./_6.js')},
    _7: () => {return populate('./_7.js')},
    _8: () => {return populate('./_8.js')},
    _12: () => {return populate('./_12.js')},
    _13: () => {return populate('./_13.js')},
    _14: () => {return populate('./_14.js')},
    _15: () => {return populate('./_15.js')},
    _16: () => {return populate('./_16.js')},
    _17: () => {return populate('./_17.js')},
    _18: () => {return populate('./_18.js')},
    _19: () => {return populate('./_19.js')},
    _21: () => {return populate('./_21.js')}
  };
}());
