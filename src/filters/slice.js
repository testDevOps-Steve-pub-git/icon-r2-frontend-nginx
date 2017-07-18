/**
 * Slice Pipe for displaying chunks of a string
 * @name slice
 * @module widget.slice
 * @namespace slice
 */

/* @ngInject */
function slice () {
  return function (arr, start, end) {
    if (!arr) {
      return
    }
    return arr.slice(start, end)
  }
}

export default {
  name: 'slice',
  filter: slice
}
