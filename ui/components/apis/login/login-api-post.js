/**
 * postApiLogin
 *
 * When navigating to the dashboard page, it helps to wait for the request to the Login endpoint
 *
 * @example
 * cy.postApiLogin()
 * cy.waitForNetworkIdle('@postApiLogin', 200);
 */

Cypress.Commands.add('posApiLogin', (variable = 'posApiLogin') => {
  Cypress.log({
    name: 'posApiLogin'
  })

  cy.intercept('POST', '**WebApi/Login**').as(variable)
})
