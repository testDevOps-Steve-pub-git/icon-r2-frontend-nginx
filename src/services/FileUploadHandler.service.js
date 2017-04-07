/**
* Document upload service
* @namespace Services
*/
(function() {
  'use strict';
  module.exports = FileUploadHandler;

  /**
   * @namespace fileUploadService
   * @desc Service for handling file uploading using angular-file-upload
   * @memberOf Services
   */
  function FileUploadHandler ($http, $q, FileUploader, TokenHandler, ICON_API, ICON_FILE_UPLOAD) {

    const FILE_FILTERS = [
      {
        name: 'enforceMaxFileSize',
        fn: (item) => { return (item.size <= ICON_FILE_UPLOAD.MAX_SIZE); }
      },
      {
        name: 'enforceFileTypes',
        fn: (file) => {
          const VALID_EXTENSIONS = new RegExp(`^(${ICON_FILE_UPLOAD.VALID_EXTENSIONS.join('|')})$`, `ig`);
          let extension = file.name.substr((file.name.lastIndexOf('.') + 1));
          return VALID_EXTENSIONS.test(extension);
        }
      },
      {
        name: 'enforceNumberOfFiles',
        fn: () => {
          return (uploader.queue.length < ICON_FILE_UPLOAD.MAX_COUNT);
        }
      },
      {
        name: 'enforceNoDuplicateFiles',
        fn: (item) => {
          return (uploader.queue
                          .filter(fileItem => fileItem.file.name === item.name)
                          .length === 0);
        }
      },
    ];

    let uploader = new FileUploader({
      url: ICON_API.FILE_UPLOAD,
      removeAfterUpload: true,
      queueLimit: ICON_FILE_UPLOAD.MAX_SIZE,
      headers: {
        'session-token': '',
        'x-access-token': '',
      }
    });

    FILE_FILTERS.forEach((filter) => { uploader.filters.push(filter); });

    function getUploader () {
      return TokenHandler.getSessionToken()
                         .then((token) => { uploader.headers['session-token'] = token.encoded; })
                         .then(TokenHandler.getTransactionToken)
                         .then((token) => { uploader.headers['x-access-token'] = token.encoded; })
                         .then(() => { return uploader });
    }

    return { getUploader: getUploader };
  }

}());
