import label from '../../../cypress/fixtures/label.json'
/**
 * group creation command
 *
 * This command is used to create a group
 *
 * This command takes group details as a parameter
 *
 * @location
 * Login > {existing server} > groups
 *
 * @params
 * parameters on enter group information page
 * @param {required} groupName  // A variable containing user full name
 * @param {optional} groupDescription  // A variable containing user name
 *
 * @example
 * cy.createGroup(groupDetails)
 */

Cypress.Commands.add('createGroup', (groupDetails) => {
  Cypress.log({
    name: 'createGroupCommand'
  })
  cy.enterText(label.groupName, groupDetails.groupName)
  cy.clickButton(label.next)
  cy.clickButton(label.Finish)
})
