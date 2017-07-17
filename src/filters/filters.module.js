import ageFilter from './ageFilter.js'
import hCNFormat from './hCNFormat.js'
import slice from './slice.js'
import pinFormat from './pinFormat.js'

angular.module('icon.filters', [])
  .filter(ageFilter.name, ageFilter.filter)
  .filter(hCNFormat.name, hCNFormat.filter)
  .filter(slice.name, slice.filter)
  .filter(pinFormat.name, pinFormat.filter)
