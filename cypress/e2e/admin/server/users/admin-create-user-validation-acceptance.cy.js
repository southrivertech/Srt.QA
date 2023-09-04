import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import userSelectors from '../../../../../selectors/user/user-selectors.json'
/**
 * @description
 * This spec file contains test to verify that all validations are displayed to a user if they
 * try to create a user without required parameters
 *
 * @file
 * cypress/e2e/admin/server/users/admin-create-user-validation-acceptance.cy.js
 *
 * @breadcrumb
 * Login > {existing server} > users
 *
 * @assertions
 * To verify that admin should not be able to create a user without username
 * To verify that admin should not be able to create a user without password
 * To verify that admin should not be able to create a user if confirm password is not same with password
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
    password: 'testing123',
    incorrectPassword: 'test123'
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
    cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
    cy.get(navigationSelectors.textLabelSelector).contains('qa auto DO NOT DELETE').should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains('Users').should('be.visible').click()
    cy.get(userSelectors.addButton).should('be.visible').click()
  })

  it('verify that admin should not be able to create a user without username', () => {
    cy.enterText('Password', userDetails.password)
    cy.enterText('Confirm Password', userDetails.password)
    cy.clickButton('Next')
    cy.get(userSelectors.requiredLabel).contains('User Name').parent('div').within(() => {
      cy.get('p.MuiFormHelperText-root').should('have.text', 'Required')
    })
  })

  it('verify that admin should not be able to create a user without password', () => {
    cy.enterText('User Name', userDetails.userName)
    cy.enterText('Confirm Password', userDetails.password)
    cy.clickButton('Next')
    cy.get(userSelectors.requiredLabel).contains('Password').parent('div').within(() => {
      cy.get('p.MuiFormHelperText-root').should('have.text', 'Required')
    })
  })

  it('verify that admin should not be able to create a user if confirm password is not same with password', () => {
    cy.enterText('User Name', userDetails.userName)
    cy.enterText('Password', userDetails.password)
    cy.enterText('Confirm Password', userDetails.incorrectPassword)
    cy.clickButton('Next')
    cy.get(userSelectors.requiredLabel).contains('Confirm Password').parent('div').within(() => {
      cy.get('p.MuiFormHelperText-root').should('have.text', 'Passwords do not match')
    })
  })
})
