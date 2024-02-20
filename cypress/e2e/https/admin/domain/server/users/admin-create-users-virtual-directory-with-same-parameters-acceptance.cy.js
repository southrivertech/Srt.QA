import navigationSelectors from '../../../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../../../selectors/user/user-selectors.json'
import label from '../../../../../../fixtures/label.json'
import { slowCypressDown } from 'cypress-slow-down'
import htmlTagSelectors from '../../../../../../../selectors/htlm-tag-selectors.json'
import generalSelectors from '../../../../../../../selectors/general-selectors.json'
import dashboardSelectors from '../../../../../../../selectors/dashboard-selectors.json'

/**
 * @description
 * This spec file contains test to verify that admin user can create a virtual directory again with the same parameters after deleting
 *
 * @file
 * cypress/e2e/admin/server/users/admin-create-users-virtual-directory-with-same-parameters-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > create new user
 *
 * @assertions
 * To verify that admin can create a virtual directory again after deleting it with same parameters
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(100)

describe('Login > {existing server} > users > add new user', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const userDetails = {
    userName: `qa-auto user ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123',
    groupName: label.autoGroupName
  }
  const virtualDirectoryDetails = {
    actualPath: 'C:/gpdirone',
    virtualFolderName: 'gpdirone'
  }

  beforeEach('login and create user', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
    cy.createUser(userDetails)
    cy.get(userSelectors.successMessage).should('be.visible')
    cy.get(userSelectors.parentCell).contains(userDetails.userName).scrollIntoView().should('be.visible')
  })

  it('creating a virtual folder with the same name after deleting', () => {
    cy.contains(htmlTagSelectors.div, userDetails.userName).parents(userSelectors.parentCell)
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).scrollIntoView().click()
    cy.get(userSelectors.parentUsers).contains(label.editUserFileDirectories).click()
    cy.get(generalSelectors.roleTab).contains(label.virtualDirectoryAccess).click()
    cy.get(dashboardSelectors.domainDropDown).contains(label.virtualDirectoryAccess).parent().parent().parent(dashboardSelectors.gridRoot).next(htmlTagSelectors.div).click()

    // creating virtual directory
    cy.get(generalSelectors.inputLabel).contains('Actual Path').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.actualPath)
    cy.get(generalSelectors.inputLabel).contains('Virtual Folder Name').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.virtualFolderName)
    // adding virtual directory
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.add).click()

    // Clicking on edit button
    cy.contains(htmlTagSelectors.div, virtualDirectoryDetails.virtualFolderName).parents(userSelectors.parentCell)
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist').click()

    // Deleting virtual directory created
    cy.get(dashboardSelectors.dashBoardList).contains(label.delete).should('be.visible').click()
    cy.get(dashboardSelectors.dashBoardList).contains(label.confirmDelete).should('be.visible').click()
      .wait(3000)
    cy.get(generalSelectors.close).should('be.visible').click()

    // Creating virtual directory with same name again

    // Clicking on edit button
    cy.contains(htmlTagSelectors.div, userDetails.userName).parents(userSelectors.parentCell)
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).scrollIntoView().click()
    cy.get(userSelectors.parentUsers).contains(label.editUserFileDirectories).click()

    // Again adding virtual directory with same name
    cy.get(dashboardSelectors.domainDropDown).contains(label.virtualDirectoryAccess).parent().parent().parent(dashboardSelectors.gridRoot).next(htmlTagSelectors.div).click()
    cy.get(generalSelectors.inputLabel).contains('Actual Path').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.actualPath)
    cy.get(generalSelectors.inputLabel).contains('Virtual Folder Name').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.virtualFolderName)
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.add).click()
      .wait(5000)

    cy.get(generalSelectors.close).should('be.visible').click()
  })

  afterEach('deleting a user', () => {
    cy.delete(userDetails.userName)
    cy.get(userSelectors.parentCell).contains(userDetails.userName).should('not.exist')
  })
})
