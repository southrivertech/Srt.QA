import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
import label from '../../../../fixtures/label.json'
import { slowCypressDown } from 'cypress-slow-down'

/**
 * @description
 * This spec file contains test to verify that admin user can update home directory while creating users
 *
 * @file
 * cypress\e2e\admin\server\users\admin-create-users-with-home-directory.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users > add new user
 *
 * @assertions
 * To verify that admin can enter home directory while creating new users
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(300)

describe('Login > {existing server} > users > add new user', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const userDetails = {
    userName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123',
    groupName: label.autoGroupName,
    groupDirPath: `C:/qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`
  }
  const updatedGroupDirPath = userDetails.groupDirPath.replace(/\//g, '\\')
  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
    cy.enterText(label.userName, userDetails.userName)
    cy.enterText(label.password, userDetails.password)
    cy.enterText(label.confirmPassword, userDetails.password)
    cy.clickButton(label.next)
    cy.checkTextVisibility(userSelectors.userPageHeading, label.assignToGroups)
    cy.clickButton(label.next)
  })

  it('verify that admin can create users ', () => {
    cy.checkTextVisibility(userSelectors.userPageHeading, label.configureUserOptions)
    cy.get(userSelectors.roleBtn).contains(label.defaultHomeDir).click({ force: true })
    cy.get(userSelectors.dataValue2).contains(label.customDir).click({ force: true })
    cy.get(userSelectors.homeDirInputField).clear()
    cy.get(userSelectors.homeDirInputField).type(updatedGroupDirPath)
    cy.contains('span', label.createHomeDir)
      .prev('span').click()
    cy.clickButton(label.finish)
    cy.get(userSelectors.successMessage).should('be.visible')
    cy.editUser(userDetails.userName, label.editUserFileDirectories, false)
    cy.contains('div', updatedGroupDirPath).should('exist')
    cy.get(userSelectors.btnLabel).contains(label.closeText).click()
  })

  afterEach('deleting a user', () => {
    cy.delete(userDetails.userName)
    cy.get(userSelectors.parentCell).contains(userDetails.userName).should('not.exist')
  })
})
