import serverSelectors from '../../../../selectors/server-selectors.json'
import label from '../../../fixtures/label.json'
/**
 * @description
 * This spec file contains test to verify that admin user can create a server
 *
 * @file
 * ui/cypress/e2e/server/admin-create-server-acceptance.cy.js
 *
 * @breadcrumb
 * Login > Add new
 *
 * @assertions
 * To verify that admin user can create a server
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('login > add new server ', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const serverDetails = {
    serverType: 'New standalone or primary cluster server.',
    selectDatabase: 'SQLite Database',
    serverName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`
  }

  beforeEach('login', () => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', label.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('verify that admin is able to create server with required parameters', () => {
    cy.createServer(serverDetails)
    cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('be.visible')
  })

  afterEach('deleting a server', () => {
    cy.deleteServer(serverDetails.serverName)
    cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('not.exist')
  })
})
