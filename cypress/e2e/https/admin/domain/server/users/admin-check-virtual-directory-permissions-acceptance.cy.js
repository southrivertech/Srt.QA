import navigationSelectors from '../../../../../../../selectors/navigation/left-navigation-selectors.json'
import label from '../../../../../../fixtures/label.json'
import loginSelectors from '../../../../../../../selectors/login-selectors.json'
import generalSelectors from '../../../../../../../selectors/general-selectors.json'
import htmlTagSelectors from '../../../../../../../selectors/htlm-tag-selectors.json'
import userSelectors from '../../../../../../../selectors/user/user-selectors.json'
import dashboardSelectors from '../../../../../../../selectors/dashboard-selectors.json'
import userDirSelectors from '../../../../../../../selectors/user-dir-selectors.json'

/**
 * @description
 * This spec file contains test to verify that all virtual directory permissions are visible or not
 *
 * @file
 * cypress/e2e/admin/server/users/admin-check-virtual-directory-permissions-acceptance.cy.js
 *
 * @breadcrumb
 * User Login > check permissions
 *
 * @assertions
 * To verify that allowed permissions of a virtual directory are working or not
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
  const userDetails = {
    username: 'test123',
    password: '123'
  }

  const virtualDirectoryDetails = {
    actualPath: 'C:/customefolder/dkjbfvdfkg',
    virtualFolderName: 'user level'
  }
  const folder = 'autoFolder'
  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  it('verify that user can create a virtual directory and allow permissions', () => {
    // navigate to users > virtual directory

    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.parentCell).contains(userDetails.username)
    cy.editUser(userDetails.username, label.editUserFileDirectories, userDetails.password)

    // navigate to virtual directory tab

    cy.get(generalSelectors.roleTab).contains(label.virtualDirectoryAccess).should('be.visible').click()
    cy.get(dashboardSelectors.domainDropDown).contains(label.virtualDirectoryAccess).parent().parent().parent(dashboardSelectors.gridRoot).next(htmlTagSelectors.div).click()
    // adding virtual directory

    cy.get(generalSelectors.inputLabel).contains('Actual Path').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.actualPath)
    cy.get(generalSelectors.inputLabel).contains('Virtual Folder Name').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.virtualFolderName)

    cy.get(htmlTagSelectors.tableData).contains(label.checkAll).next(htmlTagSelectors.tableData).within(() => {
      cy.get(generalSelectors.inputTypeCheckbox).click()
    })
    cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.add).click()
    cy.get(userSelectors.successMessage).should('exist')
    // checking permissions

    cy.visit(Cypress.env('baseUrl'))
    cy.get(loginSelectors.inputUsername).type(userDetails.username)
    cy.get(loginSelectors.inputPassword).type(userDetails.password)
    cy.get(loginSelectors.loginButton).contains(label.login).click()
    cy.get(userDirSelectors.roleCell).contains(virtualDirectoryDetails.virtualFolderName).click()

    // creating new folder

    cy.get(userDirSelectors.addFolderIcon).click()
    cy.get(userDirSelectors.folderNameField).type(folder)
    cy.get(userDirSelectors.buttonList).contains(label.add).click()
    cy.contains(userDirSelectors.roleCell, folder)
      .prev(htmlTagSelectors.div).click()

    // checking permissions

    // delete permission
    cy.contains(userDirSelectors.parentUsers, label.oneItem).next(htmlTagSelectors.div).within(() => {
      cy.get(userDirSelectors.bulkDelete).should('be.visible')
    })
    // copy permission
    cy.contains(userDirSelectors.parentUsers, label.oneItem).next(htmlTagSelectors.div).within(() => {
      cy.get(userDirSelectors.bulkCopy).should('be.visible')
    })
    // move permission

    cy.get(userDirSelectors.buttonList).eq(3).should('be.visible')
    // share permission
    cy.get(userDirSelectors.buttonList).eq(2).should('be.visible')
    // download permission
    cy.contains(userDirSelectors.parentUsers, label.oneItem).next(htmlTagSelectors.div).within(() => {
      cy.get(userDirSelectors.bulkDownload).should('be.visible')
    })
  })
  afterEach('deleting new folder and virtual directory', () => {
    // deleting new folder
    cy.contains(userDirSelectors.roleCell, folder)
      .prev(htmlTagSelectors.div).click()
    cy.contains(htmlTagSelectors.div, folder).parents(userDirSelectors.parentCell)
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).should('exist')
      .next(htmlTagSelectors.div).click()
    cy.get(userDirSelectors.editParent).eq(5).within(() => { cy.get(userDirSelectors.bulkDelete).click() })
  })
})
