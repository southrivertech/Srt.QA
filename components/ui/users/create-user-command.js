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
 * cy.deleteServer(userDetails)
 */

Cypress.Commands.add('createUser', (userDetails) => {
  cy.get(userSelectors.requiredLabel).contains('User Name').parent(htmlTagSelectors.div).within(() => {
    cy.get(htmlTagSelectors.input).type(userDetails.userName)
  })

  cy.get(userSelectors.requiredLabel).contains('Password').parent(htmlTagSelectors.div).within(() => {
    cy.get(htmlTagSelectors.input).type(userDetails.password)
  })

  cy.get(userSelectors.requiredLabel).contains('Confirm Password').parent(htmlTagSelectors.div).within(() => {
    cy.get(htmlTagSelectors.input).type(userDetails.password)
  })

  cy.get(serverSelectors.nextButtonContainer).contains('Next').click()
  cy.get(serverSelectors.serverPageHeading).contains('Assign to Groups').should('be.visible')
  cy.get(serverSelectors.nextButtonContainer).contains('Next').click()
  cy.get(serverSelectors.serverPageHeading).contains('Configure User Options').should('be.visible')
  cy.get(serverSelectors.nextButtonContainer).contains('Finish').click()
})
