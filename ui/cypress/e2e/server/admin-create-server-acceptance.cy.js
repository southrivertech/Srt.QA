import serverSelectors from '../../../selectors/server-selectors.json'
/**
 * @description
 * This spec file contains test to verify that admin user can create server
 *
 * @file
 * ui/cypress/e2e/server/admin-create-server-acceptance.cy.js
 *
 * @breadcrumb
 * Login > Add new
 *
 * @assertions
 * To verify that admin user can create server
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Login > Add new', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const lookForText = {
    addNew: 'Add New',
    nextText: 'Next',
    homeUrlText: '/Console',
    serverNameText: 'Server Name',
    finishText: 'Finish'
  }

  const serverDetails = {
    serverType: 'adsfad',
    selectDatabase: 'value',
    serverName: `Random Server Name ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    serverNameText: 'Server Name',
    serverDescriptionText: 'Server Description'
  }

  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    // Login using valid credentials
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', lookForText.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('verify that admin is able to create server with required parameters', () => {
    cy.get(serverSelectors.addButtonContainer).contains(lookForText.addNew).click()

    cy.get(serverSelectors.nextButtonContainer).contains(lookForText.nextText).click()
    cy.get(serverSelectors.nextButtonContainer).contains(lookForText.nextText).click()

    cy.get(serverSelectors.serverNameInputContainer).contains(serverDetails.serverNameText).parent('div').within(() => {
      cy.get('input').type(serverDetails.serverName)
    })
    cy.get(serverSelectors.serverNameInputContainer).contains(serverDetails.serverDescriptionText).parent('div').within(() => {
      cy.get('input').type('server info')
    })

    cy.get(serverSelectors.nextButtonContainer).contains(lookForText.nextText).click()
    cy.get(serverSelectors.nextButtonContainer).contains(lookForText.nextText).click()

    cy.get(serverSelectors.nextButtonContainer).contains(lookForText.finishText).click()
    cy.get(serverSelectors.nextButtonContainer).should('not.contain', lookForText.finishText)
  })
})
