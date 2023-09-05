import htmlTagSelectors from '../../../selectors/htlm-tag-selectors.json'
import userSelectors from '../../../selectors/user/user-selectors.json'
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
Cypress.Commands.add('editUser', (username) => {
  cy.contains(htmlTagSelectors.div, username).parents('.MuiTableCell-root')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).should('exist')
    .next(htmlTagSelectors.div).click()
  cy.get('.MuiListItemText-root').contains('Edit User & Assigned Groups').click()
  cy.clickButton('Next')
  cy.checkTextVisibility('Assign to Groups')
  cy.get(userSelectors.addButtonAssign).click()
  cy.clickButton('Next')
  cy.clickButton('Finish')
})
