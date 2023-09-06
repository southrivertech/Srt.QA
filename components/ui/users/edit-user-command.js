import htmlTagSelectors from '../../../selectors/htlm-tag-selectors.json'
import userSelectors from '../../../selectors/user/user-selectors.json'
import label from '../../../cypress/fixtures/label.json'
/**
 * User Edit Command
 *
 * This command is used to Edit a user
 *
 * This command takes user name as a parameter
 *
 * @location
 * Login > {existing server} > users
 * @params
 * @param {required} username  // A variable containing server name
 * @example
 * cy.createUser(userDetails)
 *
* @example
* cy.editUser(userDetails)
*/
Cypress.Commands.add('addAssignedGroup', (username) => {
  cy.contains(htmlTagSelectors.div, username).parents(userSelectors.parentCell)
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).click()
  cy.get(userSelectors.parentUsers).contains(label.editUserAssignedGroups).click()
  cy.clickButton(label.next)
  cy.checkTextVisibility(label.assignToGroups)
  cy.get(userSelectors.addButtonAssign).click()
  cy.clickButton(label.next)
  cy.clickButton(label.finish)
})

Cypress.Commands.add('editUser', (username, option) => {
  cy.contains(htmlTagSelectors.div, username).parents(userSelectors.parentCell)
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).click()
  cy.get(userSelectors.parentUsers).contains(option).click()
})

Cypress.Commands.add('setNewPassword', (password) => {
  cy.enterText(label.password, password)
  cy.enterText(label.confirmPassword, password)
  cy.clickButton(label.save)
  cy.wait(2000)
})

Cypress.Commands.add('removeAssignedGroup', (groupName) => {
  cy.contains(htmlTagSelectors.div, label.autoUserName).parents(userSelectors.parentCell)
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).click()
  cy.get(userSelectors.parentUsers).contains(label.editUserAssignedGroups).click()
  cy.clickButton(label.next)
  cy.checkTextVisibility(label.assignToGroups)
  cy.contains(htmlTagSelectors.div, groupName).parents(userSelectors.assignedGroupParent)
    .next(htmlTagSelectors.div).click()
})
