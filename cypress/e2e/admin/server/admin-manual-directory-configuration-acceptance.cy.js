import serverSelectors from '../../../../selectors/server-selectors.json'
import label from '../../../fixtures/label.json'
/**
 * @description
 * This spec file contains tests to ensure that user must provide the Manual Directory Configuration values before moving to the next page
 *
 * @file
 * ui/cypress/e2e/server/manual-directory-configuration.acceptance.cy.js
 *
 * @breadcrumb
 * Login > Add New > Server > Database > Server Info > Add New
 *
 * @assertions
 * - To verify that admin user cannot navigate to next without manually configuring the directory
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

// skip due to an existing bug NX-I1134
describe.skip('Login > Add New > Server > Database > Server Info > Add New', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const serverName = `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`

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

  it('Verify that the user cannot navigate to the next page, until he/she configures directories manually', () => {
    cy.get(serverSelectors.addButtonContainer).contains(label.addNew).click()

    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()
    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()

    cy.get(serverSelectors.serverNameInputContainer).contains(label.serverNameText).parent('div').within(() => {
      cy.get('input').type(serverName)
    })

    cy.get('input[type=checkbox]').eq(1).click()

    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()

    cy.get(serverSelectors.gridContainerXS10).each(($outerContainer) => {
      cy.wrap($outerContainer).within(() => {
        cy.get(serverSelectors.textFieldRootContainer).within(() => {
          cy.get(serverSelectors.inputBaseContainer).within(() => {
            cy.get(serverSelectors.inputContainer).clear()
          })
        })
      })
    })

    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()

    cy.get(serverSelectors.gridContainerXS10)
      .find(serverSelectors.inputBaseContainer)
      .get(serverSelectors.inputContainer).should('exist')
  })
})
