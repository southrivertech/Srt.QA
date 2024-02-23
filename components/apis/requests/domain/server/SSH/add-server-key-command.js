import htmlTagSelectors from '../../../../../../selectors/htlm-tag-selectors.json'
import generalSelectors from '../../../../../../selectors/general-selectors.json'
import label from '../../../../../../cypress/fixtures/label.json'
import serverSelectors from '../../../../../../selectors/server-selectors.json'
import navigationSelectors from '../../../../../../selectors/navigation/left-navigation-selectors.json'

/**
* @description
* The addServerKey Command  is used to add a SSH server key
*
* @example
* cy.addServerKeyCommand(hostKeyDetails)
*/

Cypress.Commands.add('addServerKey', (hostKeyDetails) => {
  Cypress.log({
    name: 'addServerKeyCommand'
  })
  // adding a new key
  cy.get(generalSelectors.typeButton).contains(label.new).should('be.visible').click()
  // clicking on key type dropdown
  cy.get(generalSelectors.inputLabel).contains(label.keyType).parent(htmlTagSelectors.div).within(() => {
    cy.get(generalSelectors.roleButton).click()
  })
  cy.log(hostKeyDetails.keyType)
  cy.get(`[data-value='${hostKeyDetails.keyType}']`).click()
  // clicking on key size dropdown
  cy.get(generalSelectors.inputLabel).contains(label.keySize).parent(htmlTagSelectors.div).within(() => {
    cy.get(generalSelectors.roleButton).click()
  })
  // entering key name
  cy.get(generalSelectors.roleListBox).contains(hostKeyDetails.keySize).click()
  cy.get(serverSelectors.hostKeyNameinput).type(hostKeyDetails.keyName)
  // clicking add button
  cy.get(generalSelectors.ariaLabel).within(() => cy.get(htmlTagSelectors.span).contains(label.add).click())

  cy.get(generalSelectors.labelSelector).contains(label.closeText).click()
  // navigating back to domain name
  cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
})
