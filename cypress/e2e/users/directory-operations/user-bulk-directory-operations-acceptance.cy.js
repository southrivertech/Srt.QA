import label from '../../../fixtures/label.json'
import htmlSelectors from '../../../../selectors/htlm-tag-selectors.json'
import userDirSelectors from '../../../../selectors/user-dir-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
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
  const userData = Cypress.env('user')
  const userInfo = {
    username: userData.Username,
    password: userData.Password
  }
  const path = 'qa-do-not-delete-folder/autoFolder1'
  const path2 = 'qa-do-not-delete-folder/autoFolder2'

  function folderSelection (folderName) {
    switch (folderName) {
      case 'QA':
        cy.get(userDirSelectors.folderNames).contains(label.myComputer).click()
        cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
        cy.get(userDirSelectors.bbreakbulkMenuNavigationuttonList).contains(label.select).click()
        break
      case 'Root':
        cy.get(userDirSelectors.folderNames).contains(label.myComputer).click()
        cy.get(userDirSelectors.buttonList).contains(label.select).click()
        break
    }
  }
  function bulkMenuNavigation (operation) {
    cy.contains(userDirSelectors.roleCell, label.autoFolder1)
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, label.autoFolder2)
      .prev(htmlSelectors.div).click()

    switch (operation) {
      case 'Download':
        cy.get(userDirSelectors.bulkDownload).click()
        break
      case 'Share':
        cy.get(userDirSelectors.bulkShare).click()
        break
      case 'Move':
        cy.get(userDirSelectors.bulkMove).click()
        break
      case 'Copy':
        cy.get(userDirSelectors.bulkCopy).click()
        break
      case 'Delete':
        cy.get(userDirSelectors.bulkDelete).click()
        break
    }
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
    cy.get(userDirSelectors.addFolderIcon).click()
    cy.get(userDirSelectors.folderNameField).type(label.autoFolder1)
    cy.get(userDirSelectors.buttonList).contains(label.add).click()
    cy.get(userDirSelectors.addFolderIcon).click()
    cy.get(userDirSelectors.folderNameField).type(label.autoFolder2)
    cy.get(userDirSelectors.buttonList).contains(label.add).click()
  })

  it('verify user can download multiple directories', () => {
    bulkMenuNavigation('Download')
    cy.contains(userDirSelectors.roleCell, label.autoFolder1)
      .prev(htmlSelectors.div).click()
    cy.contains(userDirSelectors.roleCell, label.autoFolder2)
      .prev(htmlSelectors.div).click()
  })

  it('verify user can share multiple directories', () => {
    bulkMenuNavigation('Share')
    cy.get(userDirSelectors.shareAsField).type(label.link)
    cy.get(userDirSelectors.toField).click()
    cy.get(userDirSelectors.toField).type(label.sftpUser)
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.sendText).click()
  })

  it('verify user can move multiple directories', () => {
    bulkMenuNavigation('Move')
    folderSelection('QA')
    cy.wait(5000)
    cy.get(userDirSelectors.roleCell).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.folderNames).contains(label.autoFolder1).should('be.visible')
    cy.get(userDirSelectors.folderNames).contains(label.autoFolder2).should('be.visible')
    cy.task('sftpDirectoryExist', path).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"d"')
    })
    cy.task('endSFTPConnection')
    cy.task('sftpDirectoryExist', path2).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"d"')
    })
    cy.task('endSFTPConnection')

    // Moving back autoFolder to root directory
    bulkMenuNavigation('Move')
    cy.folderSelection('Root')
    cy.get(userDirSelectors.folderNames).contains('..').click()
  })

  it.skip('verify user can copy multiple directories', () => {
    bulkMenuNavigation('Copy')
    folderSelection('QA')
    cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.folderNames).contains(label.autoFolder1).should('be.visible')
    cy.get(userDirSelectors.folderNames).contains(label.autoFolder2).should('be.visible')
    cy.task('sftpDirectoryExist', path).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"d"')
    })
    cy.task('endSFTPConnection')
    cy.task('sftpDirectoryExist', path2).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"d"')
    })
    cy.task('endSFTPConnection')
    bulkMenuNavigation('Delete')
    cy.get(userDirSelectors.folderNames).contains('..').click()
  })

  afterEach('verify user can delete multiple directories', () => {
    bulkMenuNavigation('Delete')
  })
})
