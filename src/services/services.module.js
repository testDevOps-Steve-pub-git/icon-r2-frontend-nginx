import AcceptLegalAgreement from './AcceptLegalAgreement.service'
import AccessControl from './AccessControl.service'
import AnalyticsLogger from './AnalyticsLogger.service'
import BrowserChecker from './BrowserChecker.service'
import By from './By.service'
import DHIR from './DHIR.service'
import DhirErrorHandler from './DhirErrorHandler.service'
import EditReviewService from './EditReview.service'
import Endpoint from './Endpoint.service'
import FhirRecordConverter from './FhirRecordConverter.service'
import FileUploadHandler from './FileUploadHandler.service'
import GatingQuestion from './gatingQuestion.service'
import GroupsOf from './GroupsOf.service'
import ImmunizationRecordService from './ImmunizationRecord.service'
import ImmunizationRecordConverter from './ImmunizationRecordConverter.service'
import Is from './Is.service'
import Localization from './localization/Localization.service'
import MiscData from './MiscData.service'
import Multitenancy from './Multitenancy.service'
import Notify from './Notify.service'
import PdfMaker from './PdfMaker.service'
import SessionHandler from './SessionHandler.service'
import TokenHandler from './TokenHandler.service'
import Utility from './Utility.service'

angular.module('icon.services', [])
  .service(AcceptLegalAgreement.name, AcceptLegalAgreement.service)
  .service(AccessControl.name, AccessControl.service)
  .service(AnalyticsLogger.name, AnalyticsLogger.service)
  .service(BrowserChecker.name, BrowserChecker.service)
  .service(By.name, By.service)
  .service(DHIR.name, DHIR.service)
  .service(DhirErrorHandler.name, DhirErrorHandler.service)
  .service(EditReviewService.name, EditReviewService.service)
  .service(Endpoint.name, Endpoint.service)
  .service(FhirRecordConverter.name, FhirRecordConverter.service)
  .service(FileUploadHandler.name, FileUploadHandler.service)
  .service(GatingQuestion.name, GatingQuestion.service)
  .service(GroupsOf.name, GroupsOf.service)
  .service(ImmunizationRecordService.name, ImmunizationRecordService.service)
  .service(ImmunizationRecordConverter.name, ImmunizationRecordConverter.service)
  .service(Is.name, Is.service)
  .service(Localization.name, Localization.service)
  .service(MiscData.name, MiscData.service)
  .service(Multitenancy.name, Multitenancy.service)
  .service(Notify.name, Notify.service)
  .service(PdfMaker.name, PdfMaker.service)
  .service(SessionHandler.name, SessionHandler.service)
  .service(TokenHandler.name, TokenHandler.service)
  .service(Utility.name, Utility.service)
