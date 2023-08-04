import loginSelectors from '../../selectors/login-selectors.json'

describe('Login Functionality Test', () => {
  const adminData = Cypress.env('admin')
  // These should come from secrets, I need admin permissions for that
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const loginText = 'Login'
  const homeUrlText = '/Console'

  beforeEach(() => {
    cy.getApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'getApiLogin',
      log: false
    })
    cy.visit(adminData.adminBaseUrl)
  })

  it('verify that admin user can login successfully with correct credentials', () => {
    cy.get(loginSelectors.inputUsername).type(userInfo.username)
    cy.get(loginSelectors.inputPassword).type(userInfo.password)
    cy.get(loginSelectors.loginButton).contains(loginText).click()
    cy.waitForNetworkIdle('@getApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@getApiLogin', 200)
  })
})
