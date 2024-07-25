import serverSelectors from '../../../../../selectors/server-selectors.json'
import label from '../../../../fixtures/label.json'
import generalSelectors from '../../../../../selectors/general-selectors.json'
import htmlTagSelectors from '../../../../../selectors/htlm-tag-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
 * @description
 * This spec file contains a test to ensure that user can click the checkboxes after disabling the default checkbox during FTPS configuration
 *
 * @issueID - NX-i1134, NX-i1125
 *
 * @breadcrumb
 * - Login > Add New > Server > Database > Server Info > > FTPS Configuration
 *
 * @assertions
 * - To verify that admin user can Enable Explicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it
 * - To verify that admin user can Enable Implicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

slowCypressDown(100)
// skip due to an existing bug NX-I1134
describe('Login > Add New > Server > Database > Server Info > > FTPS Configuration', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const serverName = `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`

  function checkBoxSelector (optionText) {
    cy.get(generalSelectors.textSelector).contains(label.autoDomainName).click()
    cy.waitForNetworkIdle(1000, { log: false })
    cy.get(serverSelectors.titleAddNew).click()

    cy.get(generalSelectors.button).contains(label.next).realClick()
    cy.get(generalSelectors.button).contains(label.next).realClick()

    cy.get(generalSelectors.textSelector).contains(label.serverNameText).next(htmlTagSelectors.div).type(serverName)
    cy.get(serverSelectors.serviceCheckboxContainer).first().within(() => {
      cy.get(htmlTagSelectors.div).realClick()
    })
    cy.get(generalSelectors.button).contains(label.next).realClick()
    cy.waitForNetworkIdle(1000, { log: false })
    cy.get(serverSelectors.serviceRootContainer)
      .find(serverSelectors.serviceCheckboxContainer)
      .get(generalSelectors.inputTypeCheckbox).eq(0).realClick()
      .get(generalSelectors.inputTypeCheckbox).eq(1).realClick()

    cy.get(generalSelectors.button).contains(label.next).realClick()
    cy.get(generalSelectors.button).contains(label.next).realClick()

    cy.get(generalSelectors.textSelector)
      .contains(optionText).prev().click()
  }

  beforeEach(() => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  it('verify that admin user can Enable Explicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    checkBoxSelector(label.enableExSSLTLSAccess)
  })

  it('verify that admin user can Enable Implicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    checkBoxSelector(label.enableImpSSLTLSAccess)
  })

  afterEach(() => {
    cy.get(generalSelectors.closeModal).realClick()
    cy.waitForNetworkIdle(1000, { log: false })
    cy.get(htmlTagSelectors.tableData).then(($response) => {
      if ($response.text().includes(serverName)) {
        cy.deleteServer(serverName)
      }
    })
  })
})
