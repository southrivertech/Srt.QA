import serverSelectors from '../../../../selectors/server-selectors.json'
import label from '../../../fixtures/label.json'
import generalSelectors from '../../../../selectors/general-selectors.json'
import { afterEach } from 'mocha'
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

// skip due to an existing bug NX-I1134
describe('Login > Add New > Server > Database > Server Info > > FTPS Configuration', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  function checkBoxSelector (optionText) {
    cy.get(serverSelectors.addButtonContainer).contains(label.addNew).click()

    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()
    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()

    cy.get(serverSelectors.serverNameInputContainer).contains(label.serverNameText).parent('div').within(() => {
      cy.get('input').type(`qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`)
    })

    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()

    cy.get(serverSelectors.serviceRootContainer)
      .find(serverSelectors.serviceCheckboxContainer)
      .find(serverSelectors.serviceButtonLabelContainer)
      .get('input[type=checkbox]').click({ multiple: true })

    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()
    cy.get(serverSelectors.nextButtonContainer).contains(label.next).click()

    cy.get(serverSelectors.serviceRootLabelContainer)
      .contains(optionText).parent().within(() => {
        cy.get('input').click()
        cy.get('input').click()
      })
  }

  beforeEach(() => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  afterEach(() => {
    cy.get(generalSelectors.closeModal).click()
  })

  it('verify that admin user can Enable Explicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    checkBoxSelector(label.enableExSSLTLSAccess)
  })

  it('verify that admin user can Enable Implicit SSL/TLS Access checkboxes on (Setup FTPS Access for this Server) page after disabling it', () => {
    checkBoxSelector(label.enableImpSSLTLSAccess)
  })
})
