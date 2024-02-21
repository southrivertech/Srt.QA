import htmlTagSelectors from '../../../../../../selectors/htlm-tag-selectors.json'
import generalSelectors from '../../../../../../selectors/general-selectors.json'
import label from '../../../../../../cypress/fixtures/label.json'
import serverSelectors from '../../../../../../selectors/server-selectors.json'
import navigationSelectors from '../../../../../../selectors/navigation/left-navigation-selectors.json'

/**
* @description
* The createServerKey Command  is used to get the list of domains
*
* @example
* cy.createServerKeyCommand(bearerToken)
*/

Cypress.Commands.add('createServerKey', (hostKeyDetails) => {
  Cypress.log({
    name: 'createServerKeyCommand'
  })
  // adding a new key
  cy.get(generalSelectors.typeButton).contains(label.new).should('be.visible').click()
  // clicking on key type dropdown
  cy.get(generalSelectors.inputLabel).contains(label.keyType).parent(htmlTagSelectors.div).within(() => {
    cy.get(generalSelectors.roleButton).click()
  })
  cy.log(hostKeyDetails.keyType)
  cy.get(generalSelectors.roleButton).contains(hostKeyDetails.keyType).click({ force: true })
  // clicking on key size dropdown
  cy.get(generalSelectors.inputLabel).contains(label.keySize).parent(htmlTagSelectors.div).within(() => {
    cy.get(generalSelectors.roleButton).click({ force: true })
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
