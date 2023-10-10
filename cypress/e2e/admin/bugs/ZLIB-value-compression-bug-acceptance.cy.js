import navigationSelectors from '../../../../selectors/navigation/left-navigation-selectors.json'
import label from '../../../fixtures/label.json'
import sshSftpSelectors from '../../../../selectors/ssh-sft-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
 * @description
 * This spec file contains test to verify ZLIB value compression bug
 *
 * @file
 * Srt.QA\cypress\e2e\admin\bugs\ZLIB-value-compression-bug-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > services
 *
 * @assertions
 * To verify that adhoc and native users are displayed successfully
 *
 * @prerequisites
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

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.mySite).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.services).should('be.visible').click()
  })

  it('verify that admin can create groups', () => {
    cy.get(sshSftpSelectors.roleTab).contains(label.sshSftpText).click()
    cy.get(sshSftpSelectors.advancedParent).within(() => {
      cy.get(sshSftpSelectors.zlibValue).eq(0).clear()
      cy.get(sshSftpSelectors.value0).should('be.visible')
      cy.get(sshSftpSelectors.zlibValue).eq(0).type('6')
      cy.get(sshSftpSelectors.value6).should('be.visible')
    })
  })
})
