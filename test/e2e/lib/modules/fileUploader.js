 /**
 * Created on 2017-01-05.
 * A function that returns a promise to allow for waiting on array of web elements.
 * @namespace fileUploader
 */
(function() {
'use strict';
  module.exports = {
    uploadFile: uploadFile,
  }

  function uploadFile(file, documentUploadButton) {
    var FILE_PATH = 'C:\\Users\\Public\\';
    var fileUploadPath  = FILE_PATH + file;
    var fileElem = element(by.css(documentUploadButton));
    browser.executeScript(
      "arguments[0].style.visibility = 'visible'; " + 
      "arguments[0].style.height = '1px'; " + 
      "arguments[0].style.width = '1px'; " + 
      "arguments[0].style.opacity = 1", 
      fileElem.getWebElement()
    );
    fileElem.sendKeys(fileUploadPath);
 }
}());
