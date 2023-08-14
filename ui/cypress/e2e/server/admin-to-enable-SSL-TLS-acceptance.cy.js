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
 * - To verify that admin user can Enable Explicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it
 * - To verify that admin user can Enable Implicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Login > Add New > Server > Database > Server Info > > FTPS Configuration', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const homeUrlText = '/Console'
  const serverName = `Random Server Name ${Cypress.dayjs().format('ssmmhhMMYY')}`
  const nextText = 'Next'
  const lookForText = {
    AddNew: 'Add New'
  }

  function nameofFunction(parameter) {

  };

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
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('verify that admin user can Enable Explicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    nameofFunction(asdf)
    
    cy.get('.MuiFab-label div').contains(lookForText.AddNew).click()

    cy.get('.MuiButton-label').contains('Next').click()
    cy.get('.MuiButton-label').contains('Next').click()

    cy.get('.MuiInputLabel-formControl').contains('Server Name').parent('div').within(() => {
      cy.get('input').type(serverName)
    })

    cy.get('.MuiButton-label').contains('Next').click()

    cy.get('.MuiFormControlLabel-root')
      .find('.MuiCheckbox-root')
      .find('.MuiIconButton-label')
      .get('input[type=checkbox]').click({ multiple: true })

    cy.get('.MuiButton-label').contains(nextText).click()
    cy.get('.MuiButton-label').contains('Next').click()

    cy.get('.MuiFormControlLabel-root')
      .find('.MuiCheckbox-root')
      .find('.MuiIconButton-label')
      .get('input[type=checkbox]')
      .click({ multiple: true })
  })

  it('verify that admin user can Enable Implicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    sfadsf
  })
})
