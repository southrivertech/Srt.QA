import userSelectors from '../../../selectors/user/user-selectors.json'
import htmlTagSelectors from '../../../selectors/htlm-tag-selectors.json'
import serverSelectors from '../../../selectors/server-selectors.json'
/**
 * User Creation Command
 *
 * This command is used to create a user
 *
 * This command takes server name as a parameter
 *
 * @location
 * Login > {existing server} > users
 *
 * @params
 * parameters on enter user information page
 * @param {optional} userFullName  // A variable containing user full name
 * @param {required} userName  // A variable containing user name
 * @param {required} password  // A variable containing password
 * @param {required} confirmPassword  // A variable containing confirm password
 * @param {optional} emailAddress  // A variable containing email address
 * @param {optional} mobileNumber  // A variable containing mobile number
 * @param {required} checkboxPreferredNotificationMethod  // A variable containing preferred notification method, by default email is selected
 * @param {optional} additionalUserRoles  // A variable containing additional user roles
 * @param {optional} userDescription  // A variable containing server name
 * parameters on assign to groups page
 * @param {optional} currentGroups  // A variable containing server name
 * @param {optional} availableGroups  // A variable containing server name
 * parameters on configure user options page
 * @param {optional} primaryGroup  // A variable containing server name
 * @param {optional} homeDirectory  // A variable containing server name
 * @param {optional} checkboxCreateHomeDirectoryNow  // A variable containing server name
 * @param {optional} checkboxAlwaysAllowUserLogin  // A variable containing server name
 * @param {optional} checkboxAccountEnabled  // A variable containing server name
 *
 * @example
 * cy.createUser(userDetails)
 */

Cypress.Commands.add('createUser', (userDetails) => {
  Cypress.log({
    name: 'createUserCommand'
  })
  cy.enterText('User Name', userDetails.userName)
  cy.enterText('Password', userDetails.password)
  cy.enterText('Confirm Password', userDetails.password)
  cy.clickButton('Next')
  cy.checkTextVisibility('Assign to Groups')
  cy.clickButton('Next')
  cy.checkTextVisibility('Configure User Options')
  cy.clickButton('Finish')
})

Cypress.Commands.add('enterText', (inputField, inputText) => {
  cy.get(userSelectors.requiredLabel).contains(inputField).parent(htmlTagSelectors.div).within(() => {
    cy.get(htmlTagSelectors.input).type(inputText)
  })
})

Cypress.Commands.add('clickButton', (buttonText) => {
  cy.get(serverSelectors.nextButtonContainer).contains(buttonText).click()
})

Cypress.Commands.add('checkTextVisibility', (text) => {
  cy.get(serverSelectors.serverPageHeading).contains(text).should('be.visible')
})
