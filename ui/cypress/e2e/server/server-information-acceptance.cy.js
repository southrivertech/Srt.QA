import serverSelectors from '../../../selectors/server-selectors.json'
/**
 * @description
 * This spec file contains tests to verify that server information is not removed when user navigates back from services to database
 *
 * @file
 * ui/cypress/e2e/login/user-navigate-to-login-acceptance.cy.js
 *
 * @breadcrumb
 * - Login > Add New > Server > Database > Server Info
 *
 * @assertions
 * - To verify that server information is not removed when user navigates back from services to database
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */
describe('Server Information Preservation Test', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const homeUrlText = '/Console'
  const serverName = `Random Server Name ${Cypress.dayjs().format('ssmmhhMMYY')}`

  function isServerInfoPreserved () {
    cy.get(serverSelectors.addButtonContainer).contains('Add New').click()

    cy.get(serverSelectors.nextButtonContainer).contains('Next').click()
    cy.get(serverSelectors.nextButtonContainer).contains('Next').click()

    cy.get(serverSelectors.serverNameInputContainer).contains('Server Name').parent('div').within(() => {
      cy.get('input').type(serverName)
    })
    cy.get(serverSelectors.serverNameInputContainer).contains('Server Description').parent('div').within(() => {
      cy.get('input').type('server info')
    })

    cy.get(serverSelectors.nextButtonContainer).contains('Next').click()

    cy.wait(1000)
    cy.get(serverSelectors.nextButtonContainer).contains('Back').click()
    cy.wait(1000)
    cy.get(serverSelectors.nextButtonContainer).contains('Back').click()

    cy.wait(1000)
    cy.get(serverSelectors.nextButtonContainer).contains('Next').click()

    cy.get(serverSelectors.serverNameInputContainer).contains('Server Name').parent('div').within(() => {
      cy.get('input').should('contain', serverName)
    })
  }

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
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('Verify that server information is not removed when user navigates back from services to database', () => {
    isServerInfoPreserved()
  })
})
