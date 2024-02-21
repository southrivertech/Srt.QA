import serverSelectors from '../../../../../../../../selectors/server-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
import navigationSelectors from '../../../../../../../../selectors/navigation/left-navigation-selectors.json'
import label from '../../../../../../../fixtures/label.json'
import generalSelectors from '../../../../../../../../selectors/general-selectors.json'

/**
 * @description
 * This spec file contains test to verify that admin user can add a RSA521
 *
 * @file
 * ui/cypress/e2e/server/services/SSH/admin-create-ECSA-251-acceptance.cy.js
 *
 * @breadcrumb
 * Login > create new server > services > SSH > Manage host key
 *
 * @assertions
 * To verify that admin is able to add a RSA521 key
 *
 */
slowCypressDown(100)

describe('login > add new server ', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const serverDetails = {
    serverType: 'New standalone or primary cluster server.',
    selectDatabase: 'SQLite Database',
    serverName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`
  }
  const hostKeyDetails = {
    keyType: 'RSA',
    keyName: `qa-auto key ${Cypress.dayjs().format('ssmmhhMMYY')}`
  }

  beforeEach('login and create server', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.createServer(serverDetails)
    cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('be.visible')
    // navigate to services
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(serverDetails.serverName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.services).should('be.visible').click()
    // clicking on SSH/SFTP tab
    cy.get(generalSelectors.roleTab).contains(label.sshSftpText).should('be.visible').click()
    cy.get(generalSelectors.typeButton).contains(label.manageHostKeys).should('be.visible').click()
  })

  it('verify that user can create RSA 1024 key', () => {
    hostKeyDetails.keySize = '1024'
    cy.createServerKey(hostKeyDetails)
  })

  it('verify that user can create RSA 2048 key', () => {
    hostKeyDetails.keySize = '2048'
    cy.createServerKey(hostKeyDetails)
  })

  it('verify that user can create RSA 4096 key', () => {
    hostKeyDetails.keySize = '4096'
    cy.createServerKey(hostKeyDetails)
  })
  afterEach('deleting a server', () => {
    // deleting the created server
    cy.deleteServer(serverDetails.serverName)
    cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('not.exist')
  })
})
