/**
 * getApiLogin
 *
 * When navigating to the dashboard page, it helps to wait for the request to the Login endpoint
 *
 * @example
 * cy.getApiLogin()
 * cy.waitForNetworkIdle('@getApiLogin', 200);
 */

Cypress.Commands.add('getApiLogin', (variable = 'getApiLogin') => {
  Cypress.log({
    name: 'getApiLogin'
  })

  cy.intercept('POST', '**WebApi/Login**').as(variable)
})
