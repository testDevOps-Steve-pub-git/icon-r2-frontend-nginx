import welcomeLoginChoice from './welcomeLogin/welcomeLoginChoice.component'
import welcomeInstructions from './welcomeInstructions/welcomeInstructions.component'
import ontarioImmunizationSchedule from './ontarioImmunizationSchedule/ontarioImmunizationSchedule.component'
import welcomeAup from './welcomeAUP/welcomeAUP.component.js'
import welcomeSubmitContainer from './welcomeSubmitActions/welcomeSubmitContainer.component'
import welcomeAuthAction from './welcomeSubmitActions/welcomeAuthAction.component'
import welcomeAnonAction from './welcomeSubmitActions/welcomeAnonAction.component'

export default function WelcomeImports (module) {
  module
    .component(welcomeLoginChoice.name, welcomeLoginChoice.component)
    .component(welcomeInstructions.name, welcomeInstructions.component)
    .component(ontarioImmunizationSchedule.name, ontarioImmunizationSchedule.component)
    .component(welcomeAup.name, welcomeAup.component)
    .component(welcomeSubmitContainer.name, welcomeSubmitContainer.component)
    .component(welcomeAuthAction.name, welcomeAuthAction.component)
    .component(welcomeAnonAction.name, welcomeAnonAction.component)
}
