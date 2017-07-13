/**
 * Component for document capture
 */
/* @ngInject */
function documentUploadCapture$ctrl ($translate, Notify, ICON_NOTIFICATION, FileUploadHandler, ICON_FILE_UPLOAD) {
  this.$onInit = () => {
    const errors = {
      SIZE: {
        error: 'enforceMaxFileSize',
        message: ICON_NOTIFICATION.WARN_DOCUMENT_FILE_TOO_LARGE
      },
      TYPE: {
        error: 'enforceFileTypes',
        message: ICON_NOTIFICATION.WARN_DOCUMENT_FILE_BAD_TYPE
      },
      NUMBER: {
        error: 'enforceNumberOfFiles',
        message: ICON_NOTIFICATION.WARN_DOCUMENT_FILE_QUEUE_LIMIT
      },
      DUPLICATE: {
        error: 'enforceNoDuplicateFiles',
        message: ICON_NOTIFICATION.WARN_DOCUMENT_FILE_DUPLICATE
      }
    }

    FileUploadHandler.getUploader()
    .then((uploader) => {
      this.uploader = uploader

      this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
        const [error] = Object.keys(errors)
        .filter((a) => errors[a].error === filter.name)
        .map((a) => errors[a].message)

        Notify.publish(error)
      }
    })

    this.acceptFileExtensions = ICON_FILE_UPLOAD.VALID_EXTENSIONS
    .map((extension) => { return `.${extension}` })
    .join(',')
  }
}

export default {
  name: 'documentUploadCapture',
  component: {
    templateUrl: './components/documents/documentUploadCapture/documentUploadCapture.template.html',
    controller: documentUploadCapture$ctrl
  }
}
