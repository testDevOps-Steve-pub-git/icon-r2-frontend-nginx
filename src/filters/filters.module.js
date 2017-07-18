import hcnFormat from './hcnFormat.js'
import slice from './slice.js'
import pinFormat from './pinFormat.js'

angular.module('icon.filters', [])
  .filter(hcnFormat.name, hcnFormat.filter)
  .filter(slice.name, slice.filter)
  .filter(pinFormat.name, pinFormat.filter)
