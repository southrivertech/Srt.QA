import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import groupSelectors from '../../../../../selectors/groups/groups-selectors.json'
import label from '../../../../fixtures/label.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
 * @description
 * This spec file contains test to verify that admin user can create Groups for an existing server
 *
 * @file
 * cypress\e2e\admin\server\Groups\admin-create-groups-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > add new group
 *
 * @assertions
 * To verify that admin can create groups
 * To verify user can delete a group
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(300)

describe('Login > {existing server} > users', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const groupDetails = {
    groupName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    groupDescription: 'testing123'
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  it('verify that admin can create groups', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.groups).should('be.visible').click()
    cy.get(groupSelectors.addButton).should('be.visible').click()
    cy.get(groupSelectors.parentGroup).eq(1).within(() => {
      cy.createGroup(groupDetails)
    })
    cy.get(groupSelectors.parentCell).contains(groupDetails.groupName).should('be.visible')
  })

  afterEach('Verify user can delete a group', () => {
    cy.delete(groupDetails.groupName)
    cy.get(groupSelectors.parentCell).contains(groupDetails.groupName).should('not.exist')
  })
})
