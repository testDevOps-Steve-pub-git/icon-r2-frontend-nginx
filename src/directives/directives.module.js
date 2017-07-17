import iconCompareTo from './iconCompareTo.directive.js'
import iconHcnChecksum from './iconHcnChecksum.directive.js'
import iconPinFormat from './iconPinFormat.directive.js'
import focus from './focus.directive.js'
import ngEnter from './ngEnter.directive.js'
import './hcnChecksum.helper.js'

angular.module('icon.directives', [])
  .directive(iconCompareTo.name, iconCompareTo.directive)
  .directive(iconHcnChecksum.name, iconHcnChecksum.directive)
  .directive(iconPinFormat.name, iconPinFormat.directive)
  .directive(focus.name, focus.directive)
  .directive(ngEnter.name, ngEnter.directive)
