import ageDisplay from './ageDisplay/ageDisplay.component'
import diseasesDisplay from './diseasesDisplay/diseasesDisplay.component'
import immunizationDisplay from './immunizationDisplay/immunizationDisplay.component'
import immunizationInput from './immunizationInput/immunizationInput.component'
import immunizationTypeahead from './immunizationTypeahead/immunizationTypeahead.component'
import tradeLotDisplay from './tradeLotDisplay/tradeLotDisplay.component'
import immunizationGating from './immunizationGating/immunizationGating.component'
import immunizationReviewContainer from './immunizationReviewDisplay/immunizationReviewContainer.component'
import immunizationLotInput from './immunizationLotInput/immunizationLotInput.component'
import editImmunization from './editImmunization/editImmunization.component'
// By Agent
import immunizationsByAgent from './byAgent/immunizationsByAgent/immunizationsByAgent.component'
import immunizationsGroupedByAgent from './byAgent/immunizationsGroupedByAgent/immunizationsGroupedByAgent.component'
import immunizationDisplayByAgent from './byAgent/immunizationDisplayByAgent/immunizationDisplayByAgent.component'
import immunizationReviewDisplayAgent from './immunizationReviewDisplay/immunizationReviewDisplayAgent/immunizationReviewDisplayAgent.component'
// By Date
import immunizationsByDate from './byDate/immunizationsByDate/immunizationsByDate.component'
import immunizationsGroupedByDate from './byDate/immunizationsGroupedByDate/immunizationsGroupedByDate.component'
import immunizationDisplayByDate from './byDate/immunizationDisplayByDate/immunizationDisplayByDate.component'
import immunizationReviewDisplayDate from './immunizationReviewDisplay/immunizationReviewDisplayDate/immunizationReviewDisplayDate.component'

export default function ImmunizationImports (module) {
  module
    .component(ageDisplay.name, ageDisplay.component)
    .component(diseasesDisplay.name, diseasesDisplay.component)
    .component(immunizationDisplay.name, immunizationDisplay.component)
    .component(immunizationInput.name, immunizationInput.component)
    .component(immunizationTypeahead.name, immunizationTypeahead.component)
    .component(tradeLotDisplay.name, tradeLotDisplay.component)
    .component(immunizationGating.name, immunizationGating.component)
    .component(immunizationReviewContainer.name, immunizationReviewContainer.component)
    .component(immunizationLotInput.name, immunizationLotInput.component)
    .component(editImmunization.name, editImmunization.component)
    // by Agent
    .component(immunizationsByAgent.name, immunizationsByAgent.component)
    .component(immunizationsGroupedByAgent.name, immunizationsGroupedByAgent.component)
    .component(immunizationDisplayByAgent.name, immunizationDisplayByAgent.component)
    .component(immunizationReviewDisplayAgent.name, immunizationReviewDisplayAgent.component)
    // by Date
    .component(immunizationsByDate.name, immunizationsByDate.component)
    .component(immunizationsGroupedByDate.name, immunizationsGroupedByDate.component)
    .component(immunizationDisplayByDate.name, immunizationDisplayByDate.component)
    .component(immunizationReviewDisplayDate.name, immunizationReviewDisplayDate.component)
}
