import loginSelectors from '../../selectors/login-selectors.json'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//! Login Function
Cypress.Commands.add('login', (baseUrl, username, password) => {
    const loginText = 'Login'
    const homeUrlText = '/Console'

    //? Visit the URL
    cy.visit(baseUrl)

    //? Find and fill in the username and password fields
    cy.get(loginSelectors.inputUsername).type(username)
    cy.get(loginSelectors.inputPassword).type(password)
    cy.get(loginSelectors.loginButton).contains(loginText).click()
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)

})
