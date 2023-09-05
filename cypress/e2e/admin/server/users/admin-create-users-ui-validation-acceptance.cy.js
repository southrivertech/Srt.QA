import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
/**
 * @description
 * This spec file contains test to verify UI Validation while admin creates users for an existing server
 *
 * @file
 * cypress\e2e\admin\server\users\admin-create-users-ui-validation-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users
 *
 * @assertions
 * To verify UI Validation Error Messages while creating users on existing server
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Login > {existing server} > users', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const lookForText = {
    homeUrlText: '/Console'
  }

  const userDetails = {
    userName: `qa-auto server ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123'
  }

  beforeEach('login', () => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', lookForText.homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)
    // Navigate to users page
    cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
    cy.get(navigationSelectors.textLabelSelector).contains('qa acceptance server do not delete').should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains('Users').should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
  })

  it('Verify that Error Message is displayed when User didn\'t enter Username ', () => {
    cy.enterText('Password', userDetails.password)
    cy.enterText('Confirm Password', userDetails.userName)
    cy.clickButton('Next')
    cy.get(userSelectors.usernameRequiredMessage).should('have.text', 'Required')
  })

  it('Verify that Error Message is displayed when User didn\'t enter Password  ', () => {
    cy.enterText('User Name', userDetails.userName)
    cy.enterText('Confirm Password', userDetails.userName)
    cy.clickButton('Next')
    cy.get(userSelectors.passwordRequiredMessage).should('have.text', 'Required')
  })

  it('Verify that Error Message is displayed when User didn\'t enter Confirm Password  ', () => {
    cy.enterText('User Name', userDetails.userName)
    cy.enterText('Password', userDetails.password)
    cy.clickButton('Next')
    cy.get(userSelectors.confirmPasswordRequiredMessage).should('have.text', 'Required')
  })

  it('Verify that Error Message is displayed when Confirm Password doesn\'t match with Password  ', () => {
    cy.enterText('User Name', userDetails.userName)
    cy.enterText('Password', userDetails.password)
    cy.enterText('Confirm Password', userDetails.userName)
    cy.clickButton('Next')
    cy.get(userSelectors.confirmPasswordRequiredMessage).should('have.text', 'Passwords do not match')
  })
})
