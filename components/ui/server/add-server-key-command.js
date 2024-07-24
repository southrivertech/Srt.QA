import htmlTagSelectors from '../../../selectors/htlm-tag-selectors.json'
import generalSelectors from '../../../selectors/general-selectors.json'
import label from '../../../cypress/fixtures/label.json'
import serverSelectors from '../../../selectors/server-selectors.json'

/**
* @description
* The addServerKey Command  is used to add a server key
*
* @example
* cy.addServerKey(hostKeyDetails)
*/

const { button, span, input } = htmlTagSelectors
const { typeButton, textSelector } = generalSelectors

Cypress.Commands.add('addServerKey', (hostKeyDetails) => {
  Cypress.log({
    name: 'addServerKey'
  })
  // clicking on new button to add a new key
  cy.get(generalSelectors.typeButton).contains(label.new).should('be.visible').realClick()

  // clicking on key type dropdown
  cy.get(`${htmlTagSelectors.label}${textSelector}`).contains(label.keyType).next('div').realClick()
  // choosing key type from dropdown options
  cy.get(serverSelectors.dropdownItem).contains(hostKeyDetails.keyType).realClick()

  // clicking on key size dropdown
  cy.get(`${htmlTagSelectors.label}${textSelector}`).contains(label.keySize).next('div').realClick()
  // choosing key size from dropdown options
  cy.get(serverSelectors.dropdownItem).contains(hostKeyDetails.keySize).realClick()

  // entering key name
  // cy.get(`${inputEditor} ${typeText}`).type(hostKeyDetails.keyName)
  cy.get(`${htmlTagSelectors.label}${textSelector}`).contains(label.hostKeyName).next('div').within(() => {
    cy.get(input).type(hostKeyDetails.keyName)
  })

  // clicking save button
  cy.get(`${button}${typeButton} ${span}`).contains('Save').realClick()
})
