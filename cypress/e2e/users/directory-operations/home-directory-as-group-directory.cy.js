import label from '../../../fixtures/label.json'
import htmlSelectors from '../../../../selectors/htlm-tag-selectors.json'
import userSelectors from '../../../../selectors/user/user-selectors.json'
import groupSelectors from '../../../../selectors/groups/groups-selectors.json'
import navigationSelectors from '../../../../selectors/navigation/left-navigation-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'

/**
 * @description
 * This spec file contains test to verify bulk users directory operations
 *
 * @file
 * Srt.QA\cypress\e2e\user\user-directory-bulk-commands-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing user}
 *
 * @assertions
 * verify user can create multiple directories
 * verify user can download multiple directories
 * verify user can share multiple directories
 * verify user can move multiple directories
 * verify user can copy multiple directories
 * verify user can delete multiple directories
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(100)

describe('Login > {existing user}', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const userDetails = {
    userName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123',
    groupName: label.autoGroupName
  }
  const groupDetails = {
    groupName1: 'groupWithGroupDir',
    groupDesc1: 'user home directory default to group directory',
    groupName2: 'groupWithGroupSubDir',
    groupDesc2: 'user home directory default to group directory'

  }
  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
  })
  it.only('verify user can select default to group directorygroup directory', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.groups).should('be.visible').click()
    cy.get(groupSelectors.addButton).should('be.visible').click()
    cy.get(groupSelectors.parentGroup).eq(1).within(() => {
      cy.enterText(label.groupName, groupDetails.groupName1)
      cy.get(groupSelectors.groupDesc).type(groupDetails.groupDesc1)
      cy.get(groupSelectors.homeDir).click({ force: true })
      cy.get("li[data-value='1']").contains('User home directories default to group directory').click()
      cy.get(groupSelectors.subDir).type(groupDetails.subDir)
      cy.clickButton(label.next)
      cy.clickButton(label.finish)
    })
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
    cy.enterText(label.userName, userDetails.userName)
    cy.enterText(label.password, userDetails.password)
    cy.enterText(label.confirmPassword, userDetails.password)
    cy.clickButton(label.next)
    cy.checkTextVisibility(userSelectors.userPageHeading, label.assignToGroups)
    cy.contains(htmlSelectors.div, groupDetails.groupName1).parents(userSelectors.parentCell)
      .prev(htmlSelectors.div).click()
    cy.clickButton(label.next)
    cy.clickButton(label.finish)
    cy.get(userSelectors.successMessage).should('exist')
    cy.wait(5000)
    cy.login(label.users, userDetails.userName, userDetails.password)
  })

  it('verify user can select default to group directory as sub group directory', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.groups).should('be.visible').click()
    cy.get(groupSelectors.addButton).should('be.visible').click()
    cy.get(groupSelectors.parentGroup).eq(1).within(() => {
      cy.enterText(label.groupName, groupDetails.groupName2)
      cy.get(groupSelectors.groupDesc).type(groupDetails.groupDesc2)
      cy.get(groupSelectors.homeDir).click({ force: true })
      cy.get("li[data-value='1']").contains('User home directories default to group subdirectory').click()
      cy.get(groupSelectors.subDir).type(groupDetails.subDir)
      cy.clickButton(label.next)
      cy.clickButton(label.finish)
    })
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
    cy.enterText(label.userName, userDetails.userName)
    cy.enterText(label.password, userDetails.password)
    cy.enterText(label.confirmPassword, userDetails.password)
    cy.clickButton(label.next)
    cy.checkTextVisibility(userSelectors.userPageHeading, label.assignToGroups)
    cy.contains(htmlSelectors.div, groupDetails.groupName2).parents(userSelectors.parentCell)
      .prev(htmlSelectors.div).click()
    cy.clickButton(label.next)
    cy.clickButton(label.finish)
    cy.get(userSelectors.successMessage).should('exist')
    cy.wait(5000)
    cy.login(label.users, userDetails.userName, userDetails.password)
  })
})
