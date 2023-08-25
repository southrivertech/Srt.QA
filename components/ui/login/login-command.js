import loginSelectors from '../../../selectors/login-selectors.json'

/**
 * Login Command
 *
 * This command is used for login
 *
 * This command takes login URL and admin credentials as parameter
 *
 * @location
 * Login
 *
 * @params
 * @param {required} URL  // A variable containing url
 * @param {required} username  // A variable containing username
 * @param {required} password  // A variable containing password
 *
 * @example
 * cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
 */

Cypress.Commands.add('login', (baseUrl, username, password) => {
//   const baseUrl = Cypress.env('baseUrl')}
  cy.visit(Cypress.env('baseUrl'))
  let loginURL
  if (baseUrl.includes(':')) {
    loginURL = `${Cypress.env('baseUrl')}${baseUrl}`
  } else {
    loginURL = `${Cypress.env('baseUrl')}`
  }

  const loginText = 'Login'

  // Visit the URL
  cy.visit(loginURL)
  // Find and fill in the username and password fields
  cy.get(loginSelectors.inputUsername).type(username)
  cy.get(loginSelectors.inputPassword).type(password)
  cy.get(loginSelectors.loginButton).contains(loginText).click()
})
