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
 * To verify UI Validation Error Messages while creating users on exixting server
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
    })

    it('Verify that Error Message is displayed when User didnt enter Username ', () => {
      cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
      cy.get(navigationSelectors.textLabelSelector).contains('qa auto DO NOT DELETE').should('be.visible').click()
      cy.get(navigationSelectors.textLabelSelector).contains('Users').should('be.visible').click()
      cy.get(userSelectors.addButton).should('be.visible').click()
      cy.clickButton('Next')
      cy.get(userSelectors.usernameRequiredMessage).should('have.text', 'Required');
      })

    it('Verify that Error Message is displayed when User didnt enter Password  ', () => {
      cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
      cy.get(navigationSelectors.textLabelSelector).contains('qa auto DO NOT DELETE').should('be.visible').click()
      cy.get(navigationSelectors.textLabelSelector).contains('Users').should('be.visible').click()
      cy.get(userSelectors.addButton).should('be.visible').click()
      cy.clickButton('Next')
      cy.get(userSelectors.passwordRequiredMessage).should('have.text', 'Required');
      })

    it('Verify that Error Message is displayed when User didnt enter Confirm Password  ', () => {
      cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
      cy.get(navigationSelectors.textLabelSelector).contains('qa auto DO NOT DELETE').should('be.visible').click()
      cy.get(navigationSelectors.textLabelSelector).contains('Users').should('be.visible').click()
      cy.get(userSelectors.addButton).should('be.visible').click()
      cy.clickButton('Next')
      cy.get(userSelectors.confirmPasswordRequiredMessage).should('have.text', 'Required');
      })

    it('Verify that Error Message is displayed when Confirm Password doesnt match with Password  ', () => {
      cy.get(navigationSelectors.textLabelSelector).contains('ws01').click()
      cy.get(navigationSelectors.textLabelSelector).contains('qa auto DO NOT DELETE').should('be.visible').click()
      cy.get(navigationSelectors.textLabelSelector).contains('Users').should('be.visible').click()
      cy.get(userSelectors.addButton).should('be.visible').click()
      cy.enterText('User Name', userDetails.userName)
      cy.enterText('Password', userDetails.password)
      cy.enterText('Confirm Password',userDetails.userName )
      cy.clickButton('Next')
      cy.get(userSelectors.confirmPasswordRequiredMessage).should('have.text', 'Passwords do not match');       
      })
    
      afterEach('deleting a user', () => {
        // cy.deleteServer(serverDetails.serverName)
        // cy.get(serverSelectors.serverName).contains(serverDetails.serverName).should('not.exist')
      })
    })