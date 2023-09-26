import label from '../../../fixtures/label.json'
import htmlSelectors from '../../../../selectors/htlm-tag-selectors.json'
import userDirSelectors from '../../../../selectors/user-dir-selectors.json'
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
  const folderName = 'autoFolder'
  const folderName2 = 'autoFolderNew'

  Cypress.Commands.add('dotNavigation', (operation) => {
    cy.contains(htmlSelectors.div, folderName).parents(userDirSelectors.parentCell)
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).should('exist')
      .next(htmlSelectors.div).click()

    switch (operation) {
      case 'Download':
        cy.get(userDirSelectors.editParent).eq(5).within(() => {
          cy.get(userDirSelectors.buttonList).eq(0).click()
        })
        break
      case 'Share':
        cy.get(userDirSelectors.editParent).eq(5).within(() => {
          cy.get(userDirSelectors.buttonList).eq(1).click()
        })
        break
      case 'Drop Zone':
        cy.get(userDirSelectors.editParent).eq(5).within(() => {
          cy.get(userDirSelectors.buttonList).eq(2).click()
        })
        break
      case 'Rename':
        cy.get(userDirSelectors.editParent).eq(5).within(() => {
          cy.get(userDirSelectors.buttonList).eq(3).click()
        })
        break
      case 'Move':
        cy.get(userDirSelectors.editParent).eq(5).within(() => {
          cy.get(userDirSelectors.buttonList).eq(4).click()
        })
        break
      case 'Copy':
        cy.get(userDirSelectors.editParent).eq(5).within(() => {
          cy.get(userDirSelectors.buttonList).eq(5).click()
        })
        break
      case 'Delete':
        cy.get(userDirSelectors.editParent).eq(5).within(() => {
          cy.get(userDirSelectors.buttonList).eq(6).click()
        })
        break
    }
  })

  Cypress.Commands.add('enterShareInfo', (toUser) => {
    cy.dotNavigation('Share')
    cy.get(userDirSelectors.shareAsField).type('Link')
    cy.get(userDirSelectors.toField).click()
    cy.get(userDirSelectors.toField).type(toUser)
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.next).click()
    cy.get(userDirSelectors.buttonList).contains(label.sendText).click()
  })

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
    cy.get(userDirSelectors.folderNameField).type(folderName)
    cy.get(userDirSelectors.buttonList).contains(label.add).click()
  })
  const pathMove = 'qa-do-not-delete-folder/autoFolder'
  const pathRename = '/autoFolderNew'

  it('verify user can download directory', () => {
    cy.dotNavigation('Download')
  })

  it('verify user can share directory', () => {
    cy.enterShareInfo(label.sftpUser)
  })

  it('verify user can drop zone directory', () => {
    cy.enterShareInfo(label.sftpUser)
  })

  it('verify user can rename directory', () => {
    cy.dotNavigation('Rename')
    cy.get(userDirSelectors.folderNameField).eq(1).clear()
    cy.get(userDirSelectors.folderNameField).eq(1).type(folderName2)
    cy.get(userDirSelectors.buttonList).contains(label.rename).click()
    cy.get(userDirSelectors.folderNames).contains(folderName2).should('be.visible')
    cy.task('sftpDirectoryExist', pathRename).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"d"')
    })
    cy.task('endSFTPConnection')

    // changing it back to "autoFolder"
    cy.dotNavigation('Rename')
    cy.get(userDirSelectors.folderNameField).eq(1).clear()
    cy.get(userDirSelectors.folderNameField).eq(1).type(folderName)
    cy.get(userDirSelectors.buttonList).contains(label.rename).click()
  })

  it('verify user can move directory', () => {
    cy.dotNavigation('Move')
    cy.get(userDirSelectors.folderNames).contains(label.myComputer).click()
    cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.buttonList).contains(label.select).click()
    cy.wait(4000)
    cy.get(userDirSelectors.roleCell).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.folderNames).contains(folderName).should('be.visible')
    cy.task('sftpDirectoryExist', pathMove).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"d"')
    })
    cy.task('endSFTPConnection')
  })

  it.skip('verify user can copy directory', () => {
    cy.dotNavigation('Copy')
    cy.get(userDirSelectors.folderNames).contains(label.myComputer).click()
    cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.buttonList).contains(label.select).click()

    cy.get(userDirSelectors.folderNames).contains(label.qaAutoFolder).click()
    cy.get(userDirSelectors.folderNames).contains(folderName).should('be.visible')
    cy.get(userDirSelectors.folderNames).contains('..').click()
    cy.task('sftpDirectoryExist', pathMove).then(p => {
      expect(`${JSON.stringify(p)}`).to.equal('"d"')
    })
    cy.task('endSFTPConnection')
  })

  afterEach('deleting a directory', () => {
    cy.dotNavigation('Delete')
  })
})
