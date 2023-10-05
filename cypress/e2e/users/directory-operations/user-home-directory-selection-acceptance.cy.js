import label from '../../../fixtures/label.json'
import htmlSelectors from '../../../../selectors/htlm-tag-selectors.json'
import userSelectors from '../../../../selectors/user/user-selectors.json'
import groupSelectors from '../../../../selectors/groups/groups-selectors.json'
import navigationSelectors from '../../../../selectors/navigation/left-navigation-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'

/**
 * @description
 * This spec file contains test to verify home directory selection for users
 *
 * @file
 *  cypress\e2e\users\directory-operations\user-home-directory-selection-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing admin user} > create group > create new user > assign group >login with new user
 *
 * @assertions
 * verify user can select default to home directory as group directory
 * verify user can select default to home directory as sub group directory
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
    groupDesc2: 'user home directory default to group directory',
    groupDirPath: 'C:/TitanFTP/Usr/'
  }

  const updatedGroupDirPath = groupDetails.groupDirPath.replace(/\//g, '\\')

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
  })

  it('verify user can select default to home directory as group directory', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.groups).should('be.visible').click()
    cy.get(groupSelectors.addButton).should('be.visible').click()
    cy.get(groupSelectors.parentGroup).eq(1).within(() => {
      cy.enterText(label.groupName, groupDetails.groupName1)
      cy.get(groupSelectors.groupDesc).type(groupDetails.groupDesc1)
      cy.get(groupSelectors.homeDir).click({ force: true })
    })
    cy.get('[data-value="1"]').contains('User home directories default to group directory').click({ force: true })
    cy.get(groupSelectors.subDir).eq(1).type(updatedGroupDirPath)
    cy.get(groupSelectors.parentGroup).eq(1).within(() => {
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

  it.only('verify user can select default to home directory as sub group directory', () => {
    cy.get(navigationSelectors.textLabelSelector).contains(label.groups).should('be.visible').click()
    cy.get(groupSelectors.addButton).should('be.visible').click()
    cy.get(groupSelectors.parentGroup).eq(1).within(() => {
      cy.enterText(label.groupName, groupDetails.groupName1)
      cy.get(groupSelectors.groupDesc).type(groupDetails.groupDesc1)
      cy.get(groupSelectors.homeDir).click({ force: true })
    })
    cy.get('[data-value="2"]').contains('User home directories default to group subdirectory').click({ force: true })
    cy.get(groupSelectors.subDir).eq(1).type(updatedGroupDirPath)
    cy.get(groupSelectors.parentGroup).eq(1).within(() => {
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
})
