import serverSelectors from '../../../../selectors/server-selectors.json'
import label from '../../../fixtures/label.json'
/**
 * @description
 * This spec file contains tests to verify that server information is removed when user navigates back from services to database
 *
 * @file
 * ui/cypress/e2e/server/server-information-acceptance.cy.js
 *
 * @breadcrumb
 * - Login > Add New > Server > Database > Server Info
 *
 * @assertions
 * - To verify that server information is removed when user navigates back from services to database
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

// skip due to an existing bug NX-I1134
describe.skip('Login > Add New > Server > Database > Server Info', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const serverName = `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`
  const back = 'Back'

  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    // ? Login as an admin with valid credentials
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', label.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('Verify that server information is removed when user navigates back from services to database', () => {
    cy.get(serverSelectors.addButtonContainer).contains(label.addNew).click()
    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()
    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()
    cy.waitUntil(() => cy.get(serverSelectors.spinner).should('not.be.visible'))
    cy.get(serverSelectors.serverNameInputContainer).contains(label.serverNameText).parent('div').within(() => {
      cy.get('input').type(serverName)
    })
    cy.get(serverSelectors.serverNameInputContainer).contains(label.serverDescriptionText).parent('div').within(() => {
      cy.get('input').type(label.serverDescription)
    })
    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()
    cy.get(serverSelectors.serverPageHeading).contains(label.selectServices).should('be.visible')
    cy.get(serverSelectors.nextButtonContainer).should('be.visible').contains(back).click()
    cy.get(serverSelectors.serverNameInputContainer).contains(label.serverNameText).parent('div').within(() => {
      cy.get('input').invoke('val').should('equal', serverName)
    })
    // Select Database
    cy.get(serverSelectors.nextButtonContainer).should('be.visible').contains(back).click()
    cy.get(serverSelectors.serverPageHeading).contains('Select Database').should('be.visible')
    cy.get(serverSelectors.nextButtonContainer).should('be.visible').contains(label.next).click()
    cy.waitUntil(() => cy.get(serverSelectors.spinner).should('not.be.visible'))
    cy.get(serverSelectors.serverPageHeading).contains('Enter Server Information').should('be.visible')
    cy.get(serverSelectors.serverNameInputContainer).contains(label.serverNameText).parent('div').within(() => {
      cy.get('input').should('not.contain', serverName)
    })
  })
})
