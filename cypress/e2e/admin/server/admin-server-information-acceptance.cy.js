import serverSelectors from '../../../../selectors/server-selectors.json'
/**
 * @description
 * This spec file contains tests to verify that server information is not removed when user navigates back from services to database
 *
 * @file
 * ui/cypress/e2e/server/server-information-acceptance.cy.js
 *
 * @breadcrumb
 * - Login > Add New > Server > Database > Server Info >
 *
 * @assertions
 * - To verify that server information is not removed when user navigates back from services to database
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */
describe('Login > Add New > Server > Database > Server Info >', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const homeUrlText = '/Console'
  const serverName = `Random Server Name ${Cypress.dayjs().format('ssmmhhMMYY')}`
  const addNew = 'Add New'
  const next = 'Next'
  const back = 'Back'
  const serverNameText = 'Server Name'
  const serverDescriptionText = 'Server Description'

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
    cy.get(serverSelectors.addButtonContainer).contains(addNew).click()

    cy.get(serverSelectors.nextButtonContainer).contains(next).click()
    cy.get(serverSelectors.nextButtonContainer).contains(next).click()

    cy.get(serverSelectors.serverNameInputContainer).contains(serverNameText).parent('div').within(() => {
      cy.get('input').type(serverName)
    })
    cy.get(serverSelectors.serverNameInputContainer).contains(serverDescriptionText).parent('div').within(() => {
      cy.get('input').type('server info')
    })

    cy.get(serverSelectors.nextButtonContainer).contains(next).click()

    cy.wait(1000)
    cy.get(serverSelectors.nextButtonContainer).contains(back).click()
    cy.wait(1000)
    cy.get(serverSelectors.nextButtonContainer).contains(back).click()

    cy.wait(1000)
    cy.get(serverSelectors.nextButtonContainer).contains(next).click()

    cy.get(serverSelectors.serverNameInputContainer).contains(serverNameText).parent('div').within(() => {
      cy.get('input').should('contain', serverName)
    })
  })
})
