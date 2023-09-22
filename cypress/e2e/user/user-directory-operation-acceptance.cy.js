import label from '../../fixtures/label.json'
import htmlSelectors from '../../../selectors/htlm-tag-selectors.json'
import userDirSelectors from '../../../selectors/user-dir-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
/**
 * @description
 * This spec file contains test to verify ui validation while admin creates users for an existing server
 *
 * @file
 * cypress\e2e\admin\server\users\admin-create-users-ui-validation-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users > add new user
 *
 * @assertions
 * To verify that error message is displayed when user didn\'t enter username
 * To verify that error message is displayed when user didn\'t enter password
 * To verify that error message is displayed when user didn\'t enter confirm password
 * To verify that error message is displayed when confirm password doesn\'t match with password
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */
slowCypressDown(100)
describe('Login > {existing server} > users > add new user', () => {
  const userData = Cypress.env('user')
  const userInfo = {
    username: userData.Username,
    password: userData.Password
  }

  beforeEach('login', () => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    cy.login(userData.userBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    // cy.url().should('include', label.homeUrlText)
    // cy.waitApiResponseStatusCode('@postApiLogin', 200)
    // Navigate to users page
  })

  it('verify user can create multiple  folders', () => {
    cy.get(userDirSelectors.addFolderIcon).click()
    cy.get(userDirSelectors.folderNameField).type('autoFolder1')
    cy.get(userDirSelectors.buttonList).contains(label.add).click()
    cy.get(userDirSelectors.folderNames).contains('autoFolder1').should('be.visible')
    cy.get(userDirSelectors.addFolderIcon).click()
    cy.get(userDirSelectors.folderNameField).type('autoFolder2')
    cy.get(userDirSelectors.buttonList).contains(label.add).click()
    cy.get(userDirSelectors.folderNames).contains('autoFolder2').should('be.visible')
  })

  it('verify user can select multiple  folders and download it', () => {
    cy.contains(userDirSelectors.roleCell, 'autoFolder1')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder2')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.parentUsers, '2 item')
      .next(htmlSelectors.div).within(() => {
        cy.get(userDirSelectors.buttonList).eq(0).click()
      })
  })

  it('verify user can select multiple folders and share it', () => {
    cy.contains(userDirSelectors.roleCell, 'autoFolder1')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder2')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.parentUsers, '2 item')
      .next(htmlSelectors.div).within(() => {
        cy.get(userDirSelectors.buttonList).eq(1).click()
      })
    cy.get(userDirSelectors.shareAsField).type('Link')
    cy.get(userDirSelectors.toField).click()
    cy.get(userDirSelectors.toField).type('testsftp')
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.sendText).click()
  })

  it('verify user can select multiple folders and move it', () => {
    cy.contains(userDirSelectors.roleCell, 'autoFolder1')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder2')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.parentUsers, '2 item')
      .next(htmlSelectors.div).within(() => {
        cy.get(userDirSelectors.buttonList).eq(2).click()
      })
    cy.get(userDirSelectors.folderNames).contains('My Computer').click()
    cy.get(userDirSelectors.folderNames).contains('qa-do-not-delete-folder').click()
    cy.get(userDirSelectors.buttonList).contains(label.select).click()
    cy.wait(4000)
    cy.get(userDirSelectors.roleCell).contains('qa-do-not-delete-folder').click()
    cy.get(userDirSelectors.folderNames).contains('autoFolder1').should('be.visible')
    cy.get(userDirSelectors.folderNames).contains('autoFolder2').should('be.visible')

    cy.contains(userDirSelectors.roleCell, 'autoFolder1')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder2')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.parentUsers, '2 item')
      .next(htmlSelectors.div).within(() => {
        cy.get(userDirSelectors.buttonList).eq(2).click()
      })
    cy.get(userDirSelectors.folderNames).contains('My Computer').click()
    cy.get(userDirSelectors.buttonList).contains(label.select).click()
    cy.wait(4000)
    cy.get(userDirSelectors.folderNames).contains('autoFolder1').should('not.exist')
    cy.get(userDirSelectors.folderNames).contains('autoFolder2').should('not.exist')
  })

  it('verify user can select multiple folders and copy it', () => {
    cy.contains(userDirSelectors.roleCell, 'autoFolder1')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder2')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.parentUsers, '2 item')
      .next(htmlSelectors.div).within(() => {
        cy.get(userDirSelectors.buttonList).eq(3).click()
      })
    cy.get(userDirSelectors.folderNames).contains('My Computer').click()
    cy.get(userDirSelectors.folderNames).contains('qa-do-not-delete-folder').click()
    cy.get(userDirSelectors.buttonList).contains(label.select).click()
    cy.get(userDirSelectors.folderNames).contains('qa-do-not-delete-folder').click()

    cy.get(userDirSelectors.folderNames).contains('autoFolder1').should('be.visible')
    cy.get(userDirSelectors.folderNames).contains('autoFolder2').should('be.visible')
    cy.get(userDirSelectors.folderNames).contains('..').click()
  })

  it('verify user can select multiple folders and delete it', () => {
    cy.get(userDirSelectors.folderNames).contains('qa-do-not-delete-folder').click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder1')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder2')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.parentUsers, '2 item')
      .next(htmlSelectors.div).within(() => {
        cy.get(userDirSelectors.buttonList).eq(4).click()
      })
    cy.get(userDirSelectors.folderNames).contains('..').click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder1')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, 'autoFolder2')
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.parentUsers, '2 item')
      .next(htmlSelectors.div).within(() => {
        cy.get(userDirSelectors.buttonList).eq(4).click()
      })
  })
})
