/**
 * @description
 * This spec file contains a test to ensure that  user can set any value for ZLIB Compression Level (set the value and check if the value is present or not)
 *
 * @file
 * ui/cypress/e2e/server/services/ssh-sftp-input-validations.acceptance.cy.js
 *
 * @breadcrumb
 * - Login to the application
 * - Press the add-new button
 * - Select server and click next
 * - Select database
 * - Enter server information, select manually configure directory locations
 * - Click next twice
 * - Select FTP and FTPS, click next
 * - Disable the default checkbox
 *
 * @assertions
 * - To verify that admin user can enable the checkboxes in FTPS configuration after disabling the default checkbox
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */
describe('Set ZLIB Compression Level Value Acceptance Test', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const homeUrlText = '/Console'

  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
  })

  it('Verify that the user can set any value for ZLIB Compression Level', () => {
    // ? Login as an admin with valid credentials
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)

    // ? Click on the domain name dropdown
    cy.get('.MuiTypography-root').click()

    // ? Select MySite

    // ? Select Services

    // ? Select SSh/SFTP

    // ? Enable SSh services in the server

    // ? Clear the ZLIB compression level box and type 6
  })
})
