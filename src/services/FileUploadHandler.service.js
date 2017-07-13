/* @ngInject */
function FileUploadHandler (
  $q,
  FileUploader,
  TokenHandler,
  ICON_API,
  ICON_FILE_UPLOAD
) {
  const FILE_FILTERS = [
    {
      name: 'enforceMaxFileSize',
      fn: (item) => (item.size <= ICON_FILE_UPLOAD.MAX_SIZE)
    },
    {
      name: 'enforceFileTypes',
      fn: (file) => {
        const VALID_EXTENSIONS = new RegExp(`^(${ICON_FILE_UPLOAD.VALID_EXTENSIONS.join('|')})$`, `ig`)
        let extension = file.name.substr((file.name.lastIndexOf('.') + 1))
        return VALID_EXTENSIONS.test(extension)
      }
    },
    {
      name: 'enforceNumberOfFiles',
      fn: () => (uploader.queue.length < ICON_FILE_UPLOAD.MAX_COUNT)
    },
    {
      name: 'enforceNoDuplicateFiles',
      fn: (item) => !uploader.queue.some(u => u.file.name === item.name)
    }
  ]

  let uploader = new FileUploader({
    url: ICON_API.FILE_UPLOAD,
    removeAfterUpload: true,
    queueLimit: ICON_FILE_UPLOAD.MAX_SIZE,
    headers: {
      'session-token': '',
      'x-access-token': ''
    }
  })

  FILE_FILTERS.forEach(f => uploader.filters.push(f))

  /**
   * Gets an instance of uploader from (from NPM angular-file-upload),
   * and appends the required header tokens.
   * @returns {Promise} uploader
   */
  function getUploader () {
    return TokenHandler.getSessionToken()
    .then((token) => { uploader.headers['session-token'] = token.encoded })
    .then(TokenHandler.getTransactionToken)
    .then((token) => { uploader.headers['x-access-token'] = token.encoded })
    .then(() => { return uploader })
  }

  /**
   * Uploads all files in an uploader instance (from NPM angular-file-upload).
   * @param {object} uploader
   * @returns {Promise}
   */
  function uploadAll (uploader) {
    return $q((resolve, reject) => {
      uploader.onCompleteAll = () => resolve()
      uploader.onErrorItem = (e) => reject(e._xhr)

      if (uploader.queue.length > 0) uploader.uploadAll()
      else resolve()
    })
  }

  return { getUploader, uploadAll }
}

export default {
  name: 'FileUploadHandler',
  service: FileUploadHandler
}
