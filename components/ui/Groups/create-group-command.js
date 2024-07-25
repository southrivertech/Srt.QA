import label from '../../../cypress/fixtures/label.json'
import groupSelectors from '../../../selectors/groups/groups-selectors.json'
import generalSelectors from '../../../selectors/general-selectors.json'
import htmlSelectors from '../../../selectors/htlm-tag-selectors.json'

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
  cy.get(groupSelectors.parentGroup).within(() => {
    cy.get(generalSelectors.textSelector).contains(label.groupName).next().type(groupDetails.groupName)
    if (groupDetails.groupDescription) {
      cy.get(generalSelectors.textSelector).contains(label.groupDesc).next().type(groupDetails.groupDescription)
    }
  })
  if (groupDetails.groupDirectoryOption) {
    cy.get(groupSelectors.parentGroup).within(() => {
      cy.get(generalSelectors.textSelector).contains(label.homeDir).next().realClick()
    })
    cy.get(groupSelectors.listItem).contains(groupDetails.groupDirectoryOption).realClick()
    cy.get(htmlSelectors.label).contains(label.subDirectory).next().type(groupDetails.groupDirPath.replace(/\//g, '\\'))
  }
  cy.get(generalSelectors.button).contains(label.next).realClick()
  cy.get(generalSelectors.button).contains(label.finish).realClick()
})
