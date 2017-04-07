(function() {
'use strict';

  /**
  * A Library for storing the ICON test requirements in group 5 which are completed in the test case scenarios.
  * @namespace requirementGroup_5
  */
  module.exports = (fileUploader, form, wait, global, retrieval, submission) => { 
    var _5 = {

      /**
        * @desc 5.01 -- The solution SHALL provide the user ability to select individual files stored locally on their machine. 
        * @memberof requirementGroup_5 
      */
      _01: () => {
        wait.waitForElements([submission.documents.chooseFile])
          .then(() => {
            fileUploader.uploadFile('jpg.jpg', submission.documents.chooseFile);
          });
        element.all(by.css('.file-upload-table tr td')).get(0).getText()
          .then((value) => {
            expect(value).toBe('jpg.jpg');
          });
      },
    
      /**
        * @desc 5.02 -- The solution SHALL provide the user with a information on approved file types and maximum file sizes. 
        * @memberof requirementGroup_5 
      */
      _02: () => {
        element(by.css('.documentsUploadExample')).getText()
          .then((value) => {
            expect(
              value.toContain('The uploaded files must each be less than 5MB in size') &&
              value.toContain('and of the following file types: .doc, .docx, .jpeg, .jpg, .pdf, .png')
            );
          });
      },
    
      /**
        * @desc 5.03 -- The solution SHALL only allow .doc, docx, jpeg, jpg, .png, .pdf to be uploaded and provide the user with a clear error if the file is not of the approved type. 
        * @memberof requirementGroup_5 
      */
      _03: () => {
        // Upload a file of an invalid type.
        wait.waitForElements([submission.documents.chooseFile])
          .then(() => {
           fileUploader.uploadFile('exe.exe', submission.documents.chooseFile);
          });
        // Ensure an error message is present indicating the the file uploaded is of an invalid type.
        element(by.css('.alert-danger')).getText()
          .then((value) => {
            expect(value)
              .toContain('invalid file type');
          });
      },
    
      /**
        * @desc 5.04 -- The solution SHALL only allow file types smaller than 5 MB (up to 2 files) and provide the user with a clear error if the file is not of the approved file size. 
        * @memberof requirementGroup_5 
      */
      _04: () => {
        // Upload a file exceeding the maximum allowable file size.
        wait.waitForElements([submission.documents.chooseFile])
          .then(() => {
            fileUploader.uploadFile('maxfilesize.jpg', submission.documents.chooseFile);
          });
        // Ensure an error is provided indicating that the file uploaded exceeds the maximum size.   
        element(by.css('.alert-danger')).getText()
          .then((value) => {
            expect(value)
              .toContain('Maximum file size is 5MB');
            });
        // Upload two additional files.
        fileUploader.uploadFile('jpeg.jpeg', submission.documents.chooseFile);
        fileUploader.uploadFile('png.png', submission.documents.chooseFile);
        // Ensure an error is present indicating that the maximum number of files that can be uploaded has been exceeded.
        element(by.css('.alert-danger')).getText()
          .then(function (value) {
            expect(value)
              .toContain('upload limit');
          });
      }
    };
  return _5;
  }
}());
