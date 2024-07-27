import navigationSelectors from '../../../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../../../selectors/user/user-selectors.json'
import label from '../../../../../../fixtures/label.json'
import generalSelectors from '../../../../../../../selectors/general-selectors.json'
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

describe('Login > {existing server} > users > add new user', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  const userDetails = {
    userName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123'
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    // Navigate to users page
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.users).should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
  })

  it('Verify that Error Message is displayed when User didn\'t enter Username', () => {
    cy.get(generalSelectors.textSelector).contains(label.password).next().type(userDetails.password).click()
    cy.get(generalSelectors.textSelector).contains(label.confirmPassword).next().type(userDetails.password).click()
    cy.clickButton(label.next)
  })

  it('Verify that Error Message is displayed when User didn\'t enter Password', () => {
    cy.get(generalSelectors.textSelector).contains(label.userFullName).next().type(userDetails.userName).click()
    cy.get(generalSelectors.textSelector).contains(label.userName).next().type(userDetails.userName).click()
    cy.clickButton(label.next)
  })

  it('Verify that Error Message is displayed when User didn\'t enter Confirm Password', () => {
    cy.get(generalSelectors.textSelector).contains(label.userName).next().type(userDetails.userName).click()
    cy.get(generalSelectors.textSelector).contains(label.password).next().type(userDetails.password).click()
    cy.clickButton(label.next)
  })

  it('Verify that Error Message is displayed when Confirm Password doesn\'t match with Password', () => {
    cy.get(generalSelectors.textSelector).contains(label.userName).next().type(userDetails.userName).click()
    cy.get(generalSelectors.textSelector).contains(label.password).next().type(userDetails.password).click()
    cy.get(generalSelectors.textSelector).contains(label.confirmPassword).next().type(userDetails.password).click()
    cy.clickButton(label.next)
  })
})
