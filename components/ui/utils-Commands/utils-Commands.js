import userSelectors from '../../../selectors/user/user-selectors.json'
import htmlTagSelectors from '../../../selectors/htlm-tag-selectors.json'
import serverSelectors from '../../../selectors/server-selectors.json'
/**
 * Common Utils Commands
 *
 * This command is used to Perform UI Common Tasks
 *
 * This command takes server name as a parameter
 *
 * @location
 * Login > {existing server}
 *
 * @params
 * @param {required} UserName  // A variable containing server name
 * @example
 * cy.enterText('User Name', userDetails.userName)
 */
Cypress.Commands.add('enterText', (inputField, inputText) => {
  cy.get(userSelectors.requiredLabel).contains(inputField).parent(htmlTagSelectors.div).within(() => {
    cy.get(htmlTagSelectors.input).type(inputText)
  })
})

Cypress.Commands.add('clickButton', (buttonText) => {
  cy.get(serverSelectors.nextButtonContainer).contains(buttonText).click()
})

Cypress.Commands.add('checkTextVisibility', (text) => {
  cy.get(serverSelectors.serverPageHeading).contains(text).should('be.visible')
})

Cypress.Commands.add('delete', (inputName) => {
  cy.contains(inputName).parents(userSelectors.parentCell).click()
  cy.wait(5000).get(userSelectors.deleteButton).click()
})
