/* @ngInject */
function oiidStatus$ctrl (
  $state,
  $stateParams,
  DhirErrorHandler,
  Endpoint,
  ImmunizationRecordService,
  Notify,
  DHIR,
  DHIR_ERROR,
  ICON_NOTIFICATION
) {
  this.$onInit = () => {
    this.patient = ImmunizationRecordService.getPatient()
    this.showOiidError = false

    this.resetShowOiidError = () => {
      this.showOiidError = false
    }

    this.openHelpModal = () => Notify.publish(ICON_NOTIFICATION.INFO_LEARN_MORE_ABOUT_OIID)

    this.getStatus = (oiid) => {
      Endpoint.ClientStatus(oiid)
      .then(() => {
        ImmunizationRecordService.setPatient(this.patient)
        $state.go('verification.enter-pin', { action: $stateParams.action })
      })
      .catch((dhirErrorId) => {
        switch (dhirErrorId) {
          case DHIR.error.ClientStatus.OIID_PIN_OUTDATED:
            Notify.publish(ICON_NOTIFICATION.INFO_OIID_PIN_OUTDATED)
          case DHIR.error.ClientStatus.OIID_PIN_NOT_SET:
            ImmunizationRecordService.setPatient(this.patient)
            $state.go('verification.new-pin', { action: $stateParams.action })
            break

          case DHIR.error.ClientStatus.RESOURCE_NOT_FOUND:
            Notify.publish(ICON_NOTIFICATION.INFO_OIID_RESOURCE_NOT_FOUND)
            this.showOiidError = true
            break

          case DHIR.error.ClientStatus.RATE_LIMIT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_TOO_MANY_FAILED_ATTEMPTS)
            break

          case DHIR.error.ClientStatus.LOCKED_OUT:
            Notify.publish(ICON_NOTIFICATION.WARN_STATUS_SECURITY_LOCK_OUT)
            break

          case DHIR.error.ClientStatus.OIID_PIN_REVOKED_AGE:
          case DHIR.error.ClientStatus.OIID_PIN_REVOKED_PHU:
          case DHIR.error.ClientStatus.OIID_PIN_NOT_SET_NO_HCN:
          case DHIR.error.ClientStatus.OIID_PIN_OUTDATED_NO_HCN:
          case DHIR.error.ClientStatus.OIID_PIN_SET_NO_EMAIL_AVAILABLE:
          case DHIR.error.ClientStatus.OIID_PIN_SET_NO_HCN_AVAILABLE:
            Notify.publish(ICON_NOTIFICATION.INFO_CALL_PHU_GENERIC)
            break

          case DHIR.error.ClientStatus.MALFORMED_REQUEST:
          case DHIR.error.ClientStatus.MALFORMED_MISSING_REQUIRED_DATA:
          case DHIR.error.ClientStatus.MALFORMED_INVALID_VALUE:
          case DHIR.error.ClientStatus.SERVER_INTERNAL_ERROR:
          default:
            Notify.publish(ICON_NOTIFICATION.WARN_GENERAL_SERVER_ERROR)
            break
        }
      })
    }

    this.verifyOiid = (form) => {
      if (form.$valid) this.getStatus(this.patient.oiid)
      else form.OIID.$setTouched()
    }
  }
}

export default {
  name: 'oiidStatus',
  component: {
    controller: oiidStatus$ctrl,
    templateUrl: './components/oiidStatus/oiidStatus.template.html',
  },
}
