import serverSelectors from '../../../../selectors/server-selectors.json'
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

  function checkBoxSelector (optionText) {
    cy.get(serverSelectors.addButtonContainer).contains(lookForText.AddNew).click()

    cy.get(serverSelectors.nextButtonContainer).contains(nextText).click()
    cy.get(serverSelectors.nextButtonContainer).contains(nextText).click()

    cy.get(serverSelectors.serverNameInputContainer).contains('Server Name').parent('div').within(() => {
      cy.get('input').type(serverName)
    })

    cy.get(serverSelectors.nextButtonContainer).contains(nextText).click()

    cy.get(serverSelectors.serviceRootContainer)
      .find(serverSelectors.serviceCheckboxContainer)
      .find(serverSelectors.serviceButtonLabelContainer)
      .get('input[type=checkbox]').click({ multiple: true })

    cy.get(serverSelectors.nextButtonContainer).contains(nextText).click()
    cy.get(serverSelectors.nextButtonContainer).contains(nextText).click()

    cy.get(serverSelectors.serviceRootLabelContainer)
      .contains(optionText).parent().within(() => {
        cy.get('input').click()
        cy.get('input').click()
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
    // Login using valid credentials
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('verify that admin user can Enable Explicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    checkBoxSelector('Enable Explicit SSL/TLS Access')
  })

  it('verify that admin user can Enable Implicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    checkBoxSelector('Enable Implicit SSL/TLS Access')
  })
})
