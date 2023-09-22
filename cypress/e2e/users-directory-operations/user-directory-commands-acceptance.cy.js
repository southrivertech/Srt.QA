import label from '../../fixtures/label.json'
import htmlSelectors from '../../../selectors/htlm-tag-selectors.json'
import userDirSelectors from '../../../selectors/user-dir-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
/**
 * @description
 * This spec file contains test to verify user directory operations for existing user
 *
 * @file
 * cypress\e2e\user\user-directory-commands-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing user}
 *
 * @assertions
 * verify user can download directory
 * verify user can share directory
 * verify user can drop zone directory
 * verify user can rename directory
 * verify user can move directory
 * verify user can copy directory
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */
slowCypressDown(100)
describe('Login > {existing user}', () => {
  const userData = Cypress.env('user')
  const userInfo = {
    username: userData.Username,
    password: userData.Password
  }
  let folderName = 'autoFolder'
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
    cy.get(userDirSelectors.addFolderIcon).click()
    cy.get(userDirSelectors.folderNameField).type(folderName)
    cy.get(userDirSelectors.buttonList).contains(label.add).click()
    cy.get(userDirSelectors.folderNames).contains(folderName).should('be.visible')
    cy.contains(htmlSelectors.div, folderName).parents(userDirSelectors.parentCell)
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).click()
  })

  it('verify user can download directory', () => {
    cy.get(userDirSelectors.editParent).eq(5).within(() => {
      cy.get(userDirSelectors.buttonList).eq(0).click()
    })
  })

  it('verify user can share directory', () => {
    cy.get(userDirSelectors.editParent).eq(5).within(() => {
      cy.get(userDirSelectors.buttonList).eq(1).click()
    })
    cy.get(userDirSelectors.shareAsField).type('Link')
    cy.get(userDirSelectors.toField).click()
    cy.get(userDirSelectors.toField).type(label.sftpUser)
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.sendText).click()
  })

  it('verify user can drop zone directory', () => {
    cy.get(userDirSelectors.editParent).eq(5).within(() => {
      cy.get(userDirSelectors.buttonList).eq(2).click()
    })
    cy.get(userDirSelectors.shareAsField).type('Link')
    cy.get(userDirSelectors.toField).click()
    cy.get(userDirSelectors.toField).type(label.sftpUser)
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.sendText).click()
  })

  it('verify user can rename directory', () => {
    cy.get(userDirSelectors.editParent).eq(5).within(() => {
      cy.get(userDirSelectors.buttonList).eq(3).click()
    })
    folderName = 'autoFolderNew'
    cy.get(userDirSelectors.folderNameField).eq(1).clear()
    cy.get(userDirSelectors.folderNameField).eq(1).type(folderName)
    cy.get(userDirSelectors.buttonList).contains(label.rename).click()
    cy.get(userDirSelectors.folderNames).contains(folderName).should('be.visible')
  })

  it('verify user can move directory', () => {
    cy.get(userDirSelectors.editParent).eq(5).within(() => {
      cy.get(userDirSelectors.buttonList).eq(4).click()
    })
    cy.get(userDirSelectors.folderNames).contains(label.myComputer).click()
    cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.buttonList).contains(label.select).click()
    cy.wait(4000)
    cy.get(userDirSelectors.roleCell).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.folderNames).contains(folderName).should('be.visible')
  })

  it.skip('verify user can copy directory', () => {
    cy.get(userDirSelectors.editParent).eq(5).within(() => {
      cy.get(userDirSelectors.buttonList).eq(5).click()
    })
    cy.get(userDirSelectors.folderNames).contains(label.myComputer).click()
    cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.buttonList).contains(label.select).click()

    cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.folderNames).contains(folderName).should('be.visible')
    cy.get(userDirSelectors.folderNames).contains('..').click()
  })

  afterEach('deleting a directory', () => {
    cy.contains(htmlSelectors.div, folderName).parents(userDirSelectors.parentCell)
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).click()
    cy.get(userDirSelectors.editParent).eq(5).within(() => {
      cy.get(userDirSelectors.buttonList).eq(6).click()
    })
  })
})
