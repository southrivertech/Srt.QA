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
  const serverName = 'server51'

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
    // ? Press the add new button
    cy.get('.MuiFab-label div').contains('Add New').click()

    // ? Click next twice
    cy.get('.MuiButton-label').contains('Next').click()
    cy.get('.MuiButton-label').contains('Next').click()

    // ? Enter Server Information
    cy.get('.MuiInputLabel-formControl').contains('Server Name').parent('div').within(() => {
      cy.get('input').type(serverName)
    })
    cy.get('.MuiInputLabel-formControl').contains('Server Description').parent('div').within(() => {
      cy.get('input').type('server info')
    })

    // ? Click next
    cy.get('.MuiButton-label').contains('Next').click()

    // ? Click back twice
    cy.wait(1000)
    cy.get('.MuiButton-label').contains('Back').click()
    cy.wait(1000)
    cy.get('.MuiButton-label').contains('Back').click()

    // ? Click next
    cy.wait(1000)
    cy.get('.MuiButton-label').contains('Next').click()

    // ? Check whether the server information is preserved or not
    cy.get('.MuiInputLabel-formControl').contains('Server Name').parent('div').within(() => {
      cy.get('input').should('contain', 'server1234')
    })
  })
})
