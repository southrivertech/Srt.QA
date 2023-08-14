/**
 * @description
 * This spec file contains a test to ensure that user can click the checkboxes after disabling the default checkbox during FTPS configuration
 *
 * @file
 * ui/cypress/e2e/server/admin-to-enable-SSL-TLS-acceptance.cy.js
 *
 * @breadcrumb
 * - Login > Add New > Server > Database > Server Info > > FTPS Configuration
 *
 * @assertions
 * - To verify that admin user can enable the checkboxes in FTPS configuration after disabling the default checkbox
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Enable Checkbox Functionality Test', () => {
  const adminData = Cypress.env('admin')
  // These should come from secrets, I need admin permissions for that
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const homeUrlText = '/Console'
  const serverName = 'server58'

  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    // ? Login using valid credentials
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('verify that admin user can login successfully with correct credentials', () => {
    // ? Press the add new button
    cy.get('.MuiFab-label div').contains('Add New').click()

    // ? Click next twice
    cy.get('.MuiButton-label').contains('Next').click()
    cy.get('.MuiButton-label').contains('Next').click()

    // ? Enter Server Information
    cy.get('.MuiInputLabel-formControl').contains('Server Name').parent('div').within(() => {
      cy.get('input').type(serverName)
    })

    // ? Click next
    cy.get('.MuiButton-label').contains('Next').click()

    // ? Click on all checkboxes
    cy.get('.MuiFormControlLabel-root')
      .find('.MuiCheckbox-root')
      .find('.MuiIconButton-label')
      .get('input[type=checkbox]').click({ multiple: true })

    // ? Click next
    cy.get('.MuiButton-label').contains('Next').click()
    cy.get('.MuiButton-label').contains('Next').click()

    // ? Check all the boxes
    cy.get('.MuiFormControlLabel-root')
      .find('.MuiCheckbox-root')
      .find('.MuiIconButton-label')
      .get('input[type=checkbox]')
      .click({ multiple: true })
  })
})
