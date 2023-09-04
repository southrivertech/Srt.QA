/**
 * group Creation Command
 *
 * This command is used to create a group
 *
 * This command takes server name as a parameter
 *
 * @location
 * Login > {existing server} > groups
 *
 * @params
 * parameters on enter group information page
 * @param {required} groupName  // A variable containing user full name
 * @param {optional} groupDescription  // A variable containing user name
 * @example
 * cy.createGroup(groupDetails)
 */

Cypress.Commands.add('createGroup', (groupDetails) => {
  Cypress.log({
    name: 'createGroupCommand'
  })
  cy.enterText('Group Name', groupDetails.groupName)
  cy.clickButton('Next')
  cy.clickButton('Finish')
})
