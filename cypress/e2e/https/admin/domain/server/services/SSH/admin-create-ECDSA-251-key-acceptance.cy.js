import serverSelectors from '../../../../../../../../selectors/server-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
import navigationSelectors from '../../../../../../../../selectors/navigation/left-navigation-selectors.json'
import label from '../../../../../../../fixtures/label.json'
import generalSelectors from '../../../../../../../../selectors/general-selectors.json'
import dashboardSelectors from '../../../../../../../../selectors/dashboard-selectors.json'

/**
 * @description
 * This spec file contains test to verify that admin user can create a server
 *
 * @file
 * ui/cypress/e2e/server/admin-create-server-acceptance.cy.js
 *
 * @breadcrumb
 * Login > Add new server > services > SSH > Manage host key
 *
 * @assertions
 * To verify that admin is able to create server with required parameters
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */
slowCypressDown(100)

describe('login > add new server ', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const serverDetails = {
    serverType: 'New standalone or primary cluster server.',
    selectDatabase: 'ECDSA 251',
    serverName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`
  }

  beforeEach('login and create server', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.createServer(serverDetails)
    cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('be.visible')
  })

  it('verify that user can create ECDSA 251 key', () => {
    // navigate to services
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(serverDetails.serverName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.services).should('be.visible').click()
    cy.get(generalSelectors.roleTab).contains(label.sshSftpText).should('be.visible').click()
    cy.get(generalSelectors.typeButton).contains(label.manageHostKeys).should('be.visible').click()
    cy.get(generalSelectors.typeButton).contains(label.new).should('be.visible').click()
    cy.get(dashboardSelectors.gridRoot).contains(label.RSA).should('be.visible').click()
  })

  afterEach('deleting a server', () => {
    cy.deleteServer(serverDetails.serverName)
    cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('not.exist')
  })
})
