/**
 * Component for document capture
 */
(function(){
'use strict';

  module.exports = {
    templateUrl: './components/documents/documentUploadCapture/documentUploadCapture.template.html',
    controller: documentUploadCaptureController
  };

  documentUploadCaptureController.$inject = ['$translate', 'FileUploadHandler', 'ICON_FILE_UPLOAD', 'ToasterChoiceService'];
  function documentUploadCaptureController ($translate, FileUploadHandler, ICON_FILE_UPLOAD, ToasterChoiceService) {

    this.$onInit = () => {

     let toasterParams = {};

     $translate('documentCapture.UPLOADER_ERROR').then((value) => {
       toasterParams.title = value;
     })

      const errors = { 
        SIZE:        {
                       error: 'enforceMaxFileSize',
                       message: 'documentCapture.UPLOADER_ERROR_FILE_SIZE'
                     },
        TYPE:        { 
                       error: 'enforceFileTypes',
                       message: 'documentCapture.UPLOADER_ERROR_FILE_TYPE'
                     },
        NUMBER:      { 
                       error: 'enforceNumberOfFiles',
                       message: 'documentCapture.UPLOADER_ERROR_QUEUE_LIMIT'
                     },
        DUPLICATE:   { 
                       error: 'enforceNoDuplicateFiles',
                       message: 'documentCapture.UPLOADER_ERROR_FILE_DUPLICATE'
                     }
                   }

      FileUploadHandler.getUploader()
                       .then((uploader) => { 
                         this.uploader = uploader; 

                         this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
                           let error = Object.keys(errors)
                                             .filter((a) => errors[a].error === filter.name)
                                             .map((a) => errors[a].message);
 
                           $translate(error.toString()).then((value) => {
                             toasterParams.body = value;
                           })
 
                           ToasterChoiceService.setToasterParams(toasterParams);
                           ToasterChoiceService.setToasterChoice('error');
                         }
                       });


     this.acceptFileExtensions = ICON_FILE_UPLOAD.VALID_EXTENSIONS
                                                 .map((extension) => { return `.${extension}`})
                                                 .join(',');
      } 
    };

})();
