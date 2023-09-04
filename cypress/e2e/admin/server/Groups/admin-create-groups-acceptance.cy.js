import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import groupSelectors from '../../../../../selectors/groups/groups-selectors.json'

/**
 * @description
 * This spec file contains test to verify that admin user can create Groups for an existing server
 *
 * @file
 * cypress\e2e\admin\server\Groups\admin-create-groups-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > groups
 *
 * @assertions
 * To verify that admin can create groups
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Login > {existing server} > users', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const lookForText = {
    homeUrlText: '/Console'
  }

  const groupDetails = {
    groupName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    groupDescription: 'testing123'
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
    cy.url().should('include', lookForText.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
  })

  it('verify that admin can create users', () => {
    cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
    cy.get(navigationSelectors.textLabelSelector).contains('qa auto DO NOT DELETE').should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains('Groups').should('be.visible').click()
    cy.get(groupSelectors.addButton).should('be.visible').click()
    cy.get("div[role='presentation']").eq(3).invoke('remove')
    cy.createGroup(groupDetails)
  })

  afterEach('deleting a user', () => {
    // cy.deleteServer(serverDetails.serverName)
    // cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('not.exist')
  })
})
