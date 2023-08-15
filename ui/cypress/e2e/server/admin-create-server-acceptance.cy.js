import serverSelectors from '../../../selectors/server-selectors.json'
/**
 * @description
 * 
 *
 * @file
 * 
 *
 * @breadcrumb
 * - 
 *
 * @assertions
 * - 
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('', () => {
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

  const serverDetails = {
    surverType: 'adsfad',
    selectDatabase: 'value',
    surverName: `Random Server Name ${Cypress.dayjs().format('ssmmhhMMYY')}`,
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

  it('verify that admin is able to create server with required parameters', () => {
    // cy.createSurver(serverDetails)
  })
})
